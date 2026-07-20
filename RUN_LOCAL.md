# Running Hephestos website locally

Two parts: a **backend** (FastAPI, handles the contact form) and a **frontend** (React site).
Everything was set up to run with **no MongoDB / Docker / yarn** required.

## What was fixed for local dev
- Added `frontend/.env` → points the site at the local backend (`http://localhost:8001`).
- Added `backend/.env` → sets `USE_MOCK_DB=true` so the contact form uses an in-memory
  database (no MongoDB install needed). Set it to `false` and fill `MONGO_URL` to use a real DB.
- Added `backend/requirements-local.txt` → a slim, public-PyPI dependency set
  (the original `requirements.txt` needs Emergent's private `emergentintegrations` package).
- Pinned `pymongo==4.6.3` (newer versions break `motor 3.3.1`).
- Installed `ajv@8` in the frontend (fixes a react-scripts 5 module-resolution error).

## Start it (two terminals)

### 1) Backend
```powershell
cd "$env:USERPROFILE\Desktop\website-hephestos\backend"
.\.venv\Scripts\python.exe -m uvicorn server:app --host 127.0.0.1 --port 8001
```
API docs: http://localhost:8001/docs

### 2) Frontend
```powershell
cd "$env:USERPROFILE\Desktop\website-hephestos\frontend"
npm start
```
Site: http://localhost:3000

## Notes
- With the mock DB, contact submissions are stored in memory and cleared when the backend restarts.
- First-time setup (already done): `npm install --legacy-peer-deps` in `frontend/`,
  and a Python venv in `backend/` with `pip install -r requirements-local.txt`.
