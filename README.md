# Daily Ritual

A lightweight daily ritual app for structured reflection at four moments throughout the day. Personalized for [Bumhan Yu](mailto:bumhan.yu@gmail.com), built with Claude which helped draft this README as well.

---

## What it is

A static HTML/CSS/JS build: no framework, no backend, no dependencies beyond a Google Fonts import. It lives in a browser tab and prompts you through short, focused check-ins at the beginning, middle, and end of each day.

It is not a task manager, a productivity dashboard, or a habit tracker. It is a container for intention.

---

## Why it exists

Most daily planning systems fail at re-entry; not because the plan was wrong, but because there is no low-friction way back to it after an interruption. Daily Ritual is built around the idea that a single held intention is more resilient than a list of tasks, and that a 60-second re-orientation is more useful than a missed to-do.

The structure was designed around a specific pattern: a hybrid work schedule with fragmented days, a hard boundary between work and family time, and a preference for reflection over logging.

---

## Key features

**Two modes, one file**

- **Work day** — four moments: Morning (orientation), Midday (re-entry), Work close (boundary), Day close (reflection)
- **Day off** — three moments: Morning (intention), Midday (presence), Evening (reflection)

The active mode is auto-detected from the day of the week and can be manually overridden with a toggle in the header, which is useful for holidays, PTOs, and office closures.

**Anchor sentence**

The morning work day prompt produces a single sentence: _Today is a success if \_\_\_._ This sentence carries forward automatically into every subsequent moment as a visible anchor, replacing the need to re-read a plan.

**Re-orientation mechanics**

- The midday reset surfaces the anchor sentence and asks for one word and a Now/Next pair — total friction under 60 seconds
- The work close asks for one word and one carry-over item, explicitly designed to survive the chaos of transitioning to family time
- The day off midday is presence-focused rather than productivity-focused

**Running log**

All entries across both modes are stored in a single chronological log. Each entry is colour-coded by moment type and badged as `work` or `off`. Entries can be expanded to show full responses, and individually deleted with confirmation. The full log can be cleared at once.

**Theme**

Follows system light/dark preference automatically. A manual toggle in the header overrides it per session, persisted to `localStorage`.

**What it does not do**

- No accounts, no sync, no cloud storage: data lives in the browser's localStorage on whichever device you use it on
- No AI or external API calls: fully self-contained, works offline, hostable anywhere as a static file
- No notifications: reminders are handled separately via the OS (e.g. Apple Reminders, set to fire at each anchor time)
- No cross-device persistence: pick one primary device

---

## How it's built

A single `.html` file with vanilla HTML, CSS, and JavaScript. No build step, no bundler, no runtime dependencies. Visual aesthetics follow Bumhan Yu's personal branding as exemplified in [bald.design](https://bald.design/).

**Fonts** — [Work Sans](https://fonts.google.com/specimen/Work+Sans) (sans serif, for prompts and UI chrome / loaded via Google Fonts) and [Georgia](<https://en.wikipedia.org/wiki/Georgia_(typeface)>) (serif, for responses and logs / loaded as system font).

**Storage** — `localStorage` with a single key (`b_ritual`). State is a JSON object holding the log array, today's anchor sentence, tomorrow's seed, theme preference, and day type override.

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

## Hosting

Drop the HTML/CSS/JS files in a single foldewr anywhere that serves static files: GitLab Pages, GitHub Pages, Netlify, or a local file path. No server-side configuration required.
