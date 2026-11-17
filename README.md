# Daily Ritual

A lightweight daily ritual app for structured reflection across five moments throughout the day.

---

## What it is

A small static web app (three files) — no framework, no backend, no dependencies beyond a Google Fonts import. It lives in a browser tab and prompts you through short, focused check-ins at the beginning, middle, and end of each day.

It is not a task manager, a productivity dashboard, or a habit tracker. It is a container for intention.

---

## Why it exists

Most daily planning systems fail at re-entry — not because the plan was wrong, but because there is no low-friction way back to it after an interruption. Ritual is built around the idea that a single held intention is more resilient than a list of tasks, and that a 60-second re-orientation is more useful than a missed to-do.

The structure was designed around a specific pattern: a hybrid work schedule with fragmented days, a hard boundary between work and family time, and a preference for reflection over logging.

---

## Key features

**Two modes, one app**

- **Work day** — five moments: Morning (orientation), Midday (re-entry), Work close (boundary), Inbox/Nightly clear (processing), Day close (reflection). The Inbox moment swaps to a Friday Purge variant at the end of the week.
- **Day off** — three moments: Morning (intention), Midday (presence), Evening (reflection)

The active mode is auto-detected from the day of the week and can be manually overridden with a toggle in the header — useful for holidays, PTOs, and office closures.

**Anchor sentence**

The morning work day prompt produces a single sentence: *Today is a success if \_\_\_.* This sentence carries forward automatically into every subsequent moment as a visible anchor, replacing the need to re-read a plan.

**Re-orientation mechanics**

- The midday reset surfaces the anchor sentence and asks for one word and a Now/Next pair — total friction under 60 seconds
- The work close asks for one word and one carry-over item, explicitly designed to survive the chaos of transitioning to family time
- The day off midday is presence-focused rather than productivity-focused

**Running log**

All entries across both modes are stored in a single chronological log. Each entry is colour-coded by moment type and badged as `work` or `off`. Entries can be expanded to show full responses, and individually deleted with confirmation. The full log can be cleared at once.

**Theme**

Follows system light/dark preference automatically. A manual toggle in the header overrides it per session, persisted to localStorage.

**Sync**

Optional cross-device sync via a self-hosted Gitea repository. A `⇅` button in the header opens the sync panel, where you enter your Gitea base URL, repository path (`owner/repo`), and a personal access token (repository read/write scope). Config is stored in localStorage and never sent anywhere except your own server.

- **Pull** — fetches `state.json` from the remote, merges entries with local state (deduplicates by timestamp, newer wins), and re-renders
- **Push** — writes current state to `state.json` on the remote; creates the file on first push
- **Auto-sync on load** — a checkbox in the sync panel; when enabled, the app pulls automatically every time it opens. Enable on each device once config is saved.
- **Export / Import** — backup and restore via a dated JSON file; import also merges rather than overwrites

Pull before you push when both devices have made entries offline, to avoid overwriting the remote with a partial state.

**What it does not do**

- No accounts, no login — sync is entirely via your own Gitea token, stored locally
- No AI or external API calls — fully self-contained, works offline (except during a sync), hostable anywhere as a static file
- No notifications — reminders are handled separately via the OS (e.g. Apple Reminders, set to fire at each anchor time)

---

## How it's built

Three files — `index.html`, `app.js`, `styles.css` — with vanilla HTML, CSS, and JavaScript. No build step, no bundler, no runtime dependencies.

**Fonts** — [Work Sans](https://fonts.google.com/specimen/Work+Sans) (UI chrome) and Georgia (prompts and responses) loaded via Google Fonts.

**Storage** — `localStorage` with two keys: `b_ritual` for app state (log, anchor sentence, tomorrow's seed, theme, day type) and `b_ritual_sync` for Gitea sync config (URL, repo, token, auto-sync preference).

**Theme** — CSS custom properties for the full token set, toggled via a `data-theme` attribute on the root element. System preference is read via `window.matchMedia('(prefers-color-scheme: dark)')` with a live event listener.

**Day type** — Auto-detected from `Date.getDay()` on load (weekdays → work, weekends → day off). Manual override is persisted and replaces the auto-detected value until changed.

**Card rendering** — Moment configs are defined as plain JS objects (fields, labels, placeholders, accent colours, success states). Cards and nav buttons are rendered from these configs, so adding or modifying a moment requires only a config change.

---

## Reminders

Ritual doesn't manage its own notifications. The intended setup is four recurring weekday reminders in the OS pointing to wherever the file is hosted or bookmarked:

| Time | Moment |
|---|---|
| 9:00am | Morning — open Ritual |
| 12:30pm | Midday — re-read your sentence |
| 5:15pm | Work close — park it in one word |
| 9:45pm | Day close — reflect and plant tomorrow's seed |

Weekend reminders (if used) follow the same pattern at 9:00am, 1:00pm, and 9:30pm.

---

## Gitea sync setup

To use sync, you need a Gitea instance and a private repository:

1. Create a new private repo (e.g. `yourname/ritual-sync`) **with an initial commit** — tick "Initialize repository" or add a `README.md`. The setup was only tested against a repo that already had a commit; a completely empty repo (no branch) is untested.
2. Go to **your user Settings → Applications → Generate New Token** (the *user* settings, not the repo's Settings page); grant **repository** read + write scope
3. Allow the app's origin through CORS (see below) — the browser calls the Gitea API directly, so this is required
4. In the app, open the `⇅` panel, fill in the base URL, repo path, and token, then click **Save config**
5. Click **↑ Push** to create `state.json`
6. On each additional device, repeat step 4, then click **↓ Pull**
7. Enable **Pull automatically when the app opens** on each device for hands-free sync

### CORS

The app runs on one origin (e.g. `https://ritual.example.com`) and calls Gitea on another (e.g. `https://git.example.com`), so Gitea's API responses must include CORS headers for the app's origin.

**Option A — Cloudflare response header rule (verified working).** If Gitea sits behind Cloudflare, add a Response Header Transform Rule (Rules → Transform Rules → Modify Response Header → "Add static header to response") matching `http.host eq "git.example.com"` that adds:

| Header | Value |
|---|---|
| `Access-Control-Allow-Origin` | `https://ritual.example.com` (the app's exact origin) |
| `Access-Control-Allow-Methods` | `GET, POST, PUT, OPTIONS` |
| `Access-Control-Allow-Headers` | `Authorization, Content-Type` |
| `Access-Control-Allow-Credentials` | `true` |

`POST` is needed for the first push (creating the file) and `PUT` for every later update — see Troubleshooting.

**Option B — Gitea's own `[cors]` setting.** In `app.ini`: `[cors]` → `ENABLED = true`, `ALLOW_DOMAIN = https://ritual.example.com`, then restart Gitea. In the original setup (Gitea 1.21 in Docker, behind a Cloudflare Tunnel) this alone did **not** result in the header being sent, so verify it with the `curl` check below. Use one source of headers, not both, to avoid duplicate `Access-Control-Allow-Origin` values, which browsers reject.

**Verify** from any terminal (the response should contain exactly one of each `access-control-*` header):

```bash
curl -sS -D - -o /dev/null -X OPTIONS \
  -H "Origin: https://ritual.example.com" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: authorization" \
  "https://git.example.com/api/v1/repos/yourname/ritual-sync/contents/state.json?ref=main" \
  | grep -i access-control
```

### Troubleshooting

| What you see | Cause and fix |
|---|---|
| `Failed to fetch` / `Load failed`, or a console error "Origin … is not allowed by Access-Control-Allow-Origin" | The browser isn't receiving CORS headers. Run the `curl` check above. If it passes from your server but a particular device still fails, see the managed-network note below. |
| Push fails with `422 {"message":"[SHA]: Required"}` | Gitea's Contents API uses **`POST` to create** a file and **`PUT` to update** one (`PUT` requires the file's current `sha`). Sending `PUT` for a file that doesn't exist yet produces this error. The app picks the method itself (`giteaPut` in `app.js`); keep that logic if you change it. |
| Pull says "No remote state found — push first to create it" | Normal before the first push: `state.json` doesn't exist yet. Push from the device that has your entries. |
| `401` / `403` | Token is wrong, expired, or lacks repository read + write scope. |
| A fix was deployed but the old behaviour persists | The browser is running a cached `app.js`. Empty caches and hard-reload (`Cmd+Shift+R`). Check the request URL in the console: the current script appends `&_=<number>` to the GET. |

**Managed work networks.** Corporate TLS-inspecting proxies (for example Palo Alto Prisma Access) can strip or rewrite response headers, including `Access-Control-*`. On such a network the headers never reach the browser even when the server sends them, and sync fails with the CORS error above. To confirm, run `curl -sv` against the Gitea URL from that machine and check whether the certificate issuer is a corporate CA and whether the `access-control-*` headers are missing. Sync from personal devices instead, or use **Export / Import JSON** on the managed machine.

---

## Hosting

Drop `index.html`, `app.js`, and `styles.css` anywhere that serves static files — GitHub Pages, Netlify, Coolify, or a local file path. No server-side configuration required.
