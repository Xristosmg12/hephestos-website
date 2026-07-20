from fastapi import FastAPI, APIRouter, Request, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import time
import logging
from collections import defaultdict
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
# Local dev convenience: set USE_MOCK_DB=true to run with an in-memory Mongo
# (no MongoDB install required). Falls back to real motor client otherwise.
if os.environ.get('USE_MOCK_DB', '').lower() in ('1', 'true', 'yes'):
    from mongomock_motor import AsyncMongoMockClient
    client = AsyncMongoMockClient()
else:
    client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ---------- Rate limiting (in-memory, per IP sliding window) ----------
RATE_LIMIT_WINDOW = 600      # seconds (10 minutes)
RATE_LIMIT_MAX = 3           # max contact submissions per window per IP
_hits = defaultdict(list)


def client_ip(request: Request) -> str:
    xff = request.headers.get('x-forwarded-for')
    if xff:
        return xff.split(',')[0].strip()
    return request.client.host if request.client else 'unknown'


def allow_request(ip: str) -> bool:
    now = time.time()
    recent = [t for t in _hits[ip] if now - t < RATE_LIMIT_WINDOW]
    if len(recent) >= RATE_LIMIT_MAX:
        _hits[ip] = recent
        return False
    recent.append(now)
    _hits[ip] = recent
    return True


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactSubmissionCreate(BaseModel):
    full_name: str = Field(min_length=1, max_length=100)
    company_name: str = Field(min_length=1, max_length=150)
    industry: str = Field(min_length=1, max_length=100)
    email: EmailStr
    automate: str = Field(min_length=1, max_length=2000)
    consent: bool = False
    website: Optional[str] = ""  # honeypot (should stay empty)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    company_name: str
    industry: str
    email: EmailStr
    automate: str
    consent: bool
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact")
async def create_contact(payload: ContactSubmissionCreate, request: Request):
    # Rate limit per IP first (throttles bots even if they trip the honeypot)
    if not allow_request(client_ip(request)):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again in a few minutes.")

    # Honeypot: silently accept without storing (defeats naive bots)
    if payload.website:
        logger.info("Honeypot triggered on contact form; ignoring submission.")
        return {"status": "success"}

    # GDPR: explicit consent required
    if not payload.consent:
        raise HTTPException(status_code=422, detail="Consent is required to submit this form.")

    submission = ContactSubmission(
        full_name=payload.full_name.strip(),
        company_name=payload.company_name.strip(),
        industry=payload.industry.strip(),
        email=payload.email,
        automate=payload.automate.strip(),
        consent=payload.consent,
    )
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)
    logger.info(f"New contact submission from {submission.email}")
    return {"status": "success", "id": submission.id}


@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contacts():
    contacts = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for c in contacts:
        c.setdefault('consent', True)
        if isinstance(c['created_at'], str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return contacts


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
