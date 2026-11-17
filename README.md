# Daily Ritual

A lightweight daily ritual app for structured reflection across five moments throughout the day.

---

## What it is

A single HTML file — no framework, no backend, no dependencies beyond a Google Fonts import. It lives in a browser tab and prompts you through short, focused check-ins at the beginning, middle, and end of each day.

It is not a task manager, a productivity dashboard, or a habit tracker. It is a container for intention.

---

## Why it exists

Most daily planning systems fail at re-entry — not because the plan was wrong, but because there is no low-friction way back to it after an interruption. Daily Ritual is built around the idea that a single held intention is more resilient than a list of tasks, and that a 60-second re-orientation is more useful than a missed to-do.

The structure was designed around a specific pattern: a hybrid work schedule with fragmented days, a hard boundary between work and family time, and a preference for reflection over logging.

---

## Key features

**Two modes, one file**

- **Work day** — five moments: Morning (orientation), Midday (re-entry), Work close (boundary), Inbox/Nightly clear (processing), Day close (reflection). The Inbox moment swaps to a Friday Purge variant at the end of the week.
- **Day off** — three moments: Morning (intention), Midday (presence), Evening (reflection)

The active mode is auto-detected from the day of the week and can be manually overridden with a toggle in the header — useful for holidays, PTOs, and office closures.

**Anchor sentence**

The morning work day prompt produces a single sentence: _Today is a success if \_\_\_._ This sentence carries forward automatically into every subsequent moment as a visible anchor, replacing the need to re-read a plan.

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

| Time    | Moment                                        |
| ------- | --------------------------------------------- |
| 9:00am  | Morning — open Ritual                         |
| 12:30pm | Midday — re-read your sentence                |
| 5:15pm  | Work close — park it in one word              |
| 9:45pm  | Day close — reflect and plant tomorrow's seed |

Weekend reminders (if used) follow the same pattern at 9:00am, 1:00pm, and 9:30pm.

---

## Reminders (Gitea sync setup)

To use sync, you need a Gitea instance and a private repository:

1. Create a new private repo (e.g. `yourname/ritual-sync`) — it can be empty
2. Go to **your user Settings → Applications → Generate New Token**; grant **repository** (read + write) scope
3. In the app, open the `⇅` panel, fill in the base URL, repo path, and token, then click **Save config**
4. Click **↑ Push** to create the initial `state.json`
5. On each additional device, repeat steps 3–4 (Save config, then **↓ Pull**)
6. Enable **Pull automatically when the app opens** on each device for hands-free sync

---

## Hosting

Drop `index.html`, `app.js`, and `styles.css` anywhere that serves static files — GitHub Pages, Netlify, Coolify, or a local file path. No server-side configuration required.
