# Publishing the Hephestos website 24/7 (free stack)

**Stack:** Vercel (website) + Render (contact-form API) + MongoDB Atlas (database), all deploying from GitHub.
Everything below has a free tier. Do the steps in order — each one feeds the next.

---

## Step 0 — Put the code on GitHub
Vercel and Render both deploy *from* a GitHub repo, so this comes first.

1. Create a free account at https://github.com and a **new empty repo** (e.g. `hephestos-website`). Don't add a README/gitignore — the project already has them.
2. In a terminal, from the project folder, push it up (I can do this part for you once you're logged in):
   ```powershell
   cd "$env:USERPROFILE\Desktop\website-hephestos"
   git remote add origin https://github.com/<your-username>/hephestos-website.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 1 — Database: MongoDB Atlas (free)
1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create a **free M0 cluster** (pick a region near Cyprus, e.g. Frankfurt).
3. **Database Access** -> Add a database user (username + password). Save these.
4. **Network Access** -> Add IP -> **Allow access from anywhere** (`0.0.0.0/0`). (Render's IPs aren't fixed on free tier.)
5. **Connect -> Drivers** -> copy the connection string. Looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`
   Replace `<user>` / `<password>` with the ones from step 3. **Keep this — it's your `MONGO_URL`.**

---

## Step 2 — Backend API: Render (free)
1. Sign up at https://render.com with your GitHub account.
2. **New + -> Blueprint** -> pick your repo. Render reads `render.yaml` and creates the service.
3. When prompted (or in the service's **Environment** tab), set the two secret values:
   - `MONGO_URL` = the Atlas string from Step 1.5
   - `CORS_ORIGINS` = your Vercel URL (you'll get it in Step 3 — you can set a placeholder now and update after).
4. Deploy. When it's live you'll get a URL like `https://hephestos-backend.onrender.com`.
5. Test it: open `https://hephestos-backend.onrender.com/api/` — it should show `{"message":"Hello World"}`. **Keep this URL — it's your `REACT_APP_BACKEND_URL`.**

> Note: Render's free tier sleeps after ~15 min idle, so the *first* contact submission after a quiet period takes ~30-50s to wake up. Fine for a brochure site; upgrade to the $7/mo plan later if you want it always warm.

---

## Step 3 — Website: Vercel (free)
1. Sign up at https://vercel.com with your GitHub account.
2. **Add New -> Project** -> import your repo.
3. Set **Root Directory** to `frontend`.
4. Framework preset: **Create React App** (auto-detected). Build command `npm run build`, output `build` (defaults are fine).
5. **Environment Variables** -> add:
   - `REACT_APP_BACKEND_URL` = your Render URL from Step 2.4 (no trailing slash)
6. Deploy. You'll get a URL like `https://hephestos.vercel.app`. **This is your live website.**

---

## Step 4 — Connect the two (CORS)
1. Back in **Render -> your service -> Environment**, set `CORS_ORIGINS` to your exact Vercel URL, e.g.
   `https://hephestos.vercel.app` (add more, comma-separated, if you get a custom domain later).
2. Save -> Render redeploys. Done.

---

## Step 5 — Verify it's really working
1. Open your Vercel URL. The site loads.
2. Submit the contact form. You should see a success message.
3. Confirm it saved: in MongoDB Atlas -> **Browse Collections** -> `hephestos` database -> `contact_submissions`. Your entry is there.

---

## Later: custom domain
When you're ready, buy a domain (~€10/yr at Namecheap/Cloudflare) and add it in **Vercel -> Project -> Domains**.
Then add that domain to `CORS_ORIGINS` on Render too.

## Redeploying after changes
Both hosts auto-deploy on every `git push` to `main`. Just push and they rebuild.
