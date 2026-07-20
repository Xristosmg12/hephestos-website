# Hephestos website — hosting & deployment

**Live site:** https://xristosmg12.github.io/hephestos-website/
**Hosted on:** GitHub Pages (free, always-on, HTTPS). No server or database needed.
**Contact form:** submissions are emailed to `hephestos.solutions@gmail.com` via [FormSubmit](https://formsubmit.co) — no backend.

---

## How it's set up
- **Source code:** GitHub repo `Xristosmg12/hephestos-website` (public — required for free GitHub Pages).
- **The website:** a static React build published to the `gh-pages` branch. GitHub Pages serves it.
- **Routing:** uses `HashRouter`, so page URLs look like `.../hephestos-website/#/privacy`. (Clean URLs come once a custom domain is added.)
- **Contact form:** `frontend/src/components/site/Contact.jsx` posts to FormSubmit. Change the email in the
  `FORM_ENDPOINT` constant there if you ever want inquiries sent elsewhere (then redeploy).

## To update the live site after making changes
From the `frontend` folder:
```powershell
cd "$env:USERPROFILE\Desktop\website-hephestos\frontend"
npm run deploy
```
That rebuilds the site and pushes it live. Changes appear in ~1-2 minutes.
(Optional: also `git push` from the project root to keep the source history on GitHub up to date.)

## To run it locally (for editing/previewing before deploying)
See `RUN_LOCAL.md`, or just double-click **`Open Hephestos Website.bat`** on the Desktop.

## Later: custom domain
1. Buy a domain (~€10/yr at Cloudflare or Namecheap) and paste it to your assistant.
2. It gets added under **repo Settings -> Pages -> Custom domain** + a DNS record at your registrar.
3. At that point we can switch back to clean URLs (BrowserRouter) since the site lives at the domain root.

---

### Notes
- The repo is **public** because free GitHub Pages requires it. No secrets are in the repo (the `.env`
  files and the Python `.venv` are git-ignored and stay only on your machine).
- The old `backend/` FastAPI service, `render.yaml`, and MongoDB setup are **not used** by this deployment.
  They remain in the repo in case you ever want a full database-backed backend instead of emailed leads.
