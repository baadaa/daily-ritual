/* ─────────────────────────────────────────────
  CONFIG — identical logic, accent vars updated
───────────────────────────────────────────── */
const STORAGE_KEY = "b_ritual";

const WORKDAY_MOMENTS = [
  {
    id: "wd-morning",
    label: "Morning",
    time: "~9am",
    title: "Good morning",
    cost: "5 min · orientation",
    glyph: "✦",
    successSub: "Your anchor is set.",
    accent: "var(--wd-morning)",
    fields: [
      {
        id: "daytype",
        type: "text",
        label: "What kind of day is today?",
        placeholder: "e.g. office day, back-to-backs all morning…",
      },
      {
        id: "sentence",
        type: "text",
        highlight: true,
        label: "What would make today a success?",
        placeholder: "Today is a success if…",
        required: true,
      },
      {
        id: "aside",
        type: "textarea",
        label: "Anything to park before you begin?",
        placeholder: "Optional — a worry, a distraction. Leave it here.",
      },
    ],
    snippetField: "sentence",
    successField: "sentence",
  },
  {
    id: "wd-midday",
    label: "Midday",
    time: "12–1pm",
    title: "Midday reset",
    cost: "2 min · re-entry",
    glyph: "◈",
    successSub: "Re-oriented.",
    accent: "var(--wd-midday)",
    showAnchor: true,
    fields: [
      {
        id: "word",
        type: "text",
        word: true,
        label: "One word — where are you right now?",
        placeholder: "scattered / focused / tired…",
      },
      {
        id: "now",
        type: "text",
        label: "Now: what are you doing this block?",
        placeholder: "e.g. finishing the deck review",
      },
      {
        id: "next",
        type: "text",
        label: "Next: what comes after?",
        placeholder: "e.g. 1:1, then deep work",
      },
    ],
    snippetField: "word",
    successField: "word",
  },
  {
    id: "wd-workclose",
    label: "Work close",
    time: "~5pm",
    title: "Work close",
    cost: "60 sec · boundary",
    glyph: "▣",
    successSub: "Work is suspended.",
    accent: "var(--wd-workclose)",
    showAnchor: true,
    fields: [
      {
        id: "word",
        type: "text",
        word: true,
        label: "One word to park work right now.",
        placeholder: "done / unfinished / okay…",
      },
      {
        id: "carryover",
        type: "text",
        label: "One thing to carry over — so you don't hold it tonight.",
        placeholder: "e.g. reply to Maria tomorrow AM",
      },
    ],
    snippetField: "word",
    successField: "word",
    successExtra: "carryover",
    successExtraPrefix: "Carried: ",
  },
  {
    id: "wd-dayclose",
    label: "Day close",
    time: "~10pm",
    title: "Day close",
    cost: "5 min · reflection",
    glyph: "◇",
    successSub: "Day closed.",
    accent: "var(--wd-dayclose)",
    showAnchor: true,
    fields: [
      {
        id: "held",
        type: "textarea",
        label: "Did today's sentence hold? What happened?",
        placeholder: "Briefly — yes/no and why. No judgment.",
      },
      {
        id: "keep",
        type: "text",
        label: "One moment worth keeping from today.",
        placeholder:
          "Something that worked, felt good, or surprised you.",
      },
      {
        id: "seed",
        type: "text",
        highlight: true,
        label: "A seed for tomorrow.",
        placeholder: "e.g. slow down, finish the proposal, be present",
      },
    ],
    snippetField: "seed",
    successField: "seed",
    successPrefix: "Tomorrow: ",
  },
];

const NONWORK_MOMENTS = [
  {
    id: "nw-morning",
    label: "Morning",
    time: "~9am",
    title: "Good morning",
    cost: "5 min · intention",
    glyph: "✦",
    successSub: "Intention set. Enjoy the day.",
    accent: "var(--nw-morning)",
    fields: [
      {
        id: "meaningful",
        type: "text",
        highlight: true,
        label: "What would make today feel satisfying or meaningful?",
        placeholder: "Not a to-do — a feeling or quality…",
        required: true,
      },
      {
        id: "intentions",
        type: "textarea",
        label: "A few things you intend to do today.",
        placeholder:
          "Loose, not a list — e.g. slow breakfast, take a walk…",
      },
      {
        id: "love",
        type: "text",
        label:
          "How will you show love or gratitude to your family today?",
        placeholder: "One small, concrete thing…",
      },
      {
        id: "self",
        type: "text",
        label: "What's one thing just for you today?",
        placeholder:
          "e.g. read for an hour, make something, go for a run…",
      },
    ],
    snippetField: "meaningful",
    successField: "meaningful",
  },
  {
    id: "nw-midday",
    label: "Midday",
    time: "~1pm",
    title: "Midday check-in",
    cost: "2 min · presence",
    glyph: "◈",
    successSub: "Present. Back to it.",
    accent: "var(--nw-midday)",
    fields: [
      {
        id: "happy",
        type: "text",
        highlight: true,
        label: "What's one thing you're happy about right now?",
        placeholder: "Small is fine. Notice it.",
      },
      {
        id: "making",
        type: "text",
        label: "Are you making anything today?",
        placeholder:
          "Cooking, building, writing, drawing — or what could you make?",
      },
      {
        id: "adjust",
        type: "text",
        label:
          "How's the morning's intention holding? Anything to adjust?",
        placeholder: "Optional — one word or phrase is enough.",
      },
    ],
    snippetField: "happy",
    successField: "happy",
  },
  {
    id: "nw-evening",
    label: "Evening",
    time: "~9:30pm",
    title: "Evening close",
    cost: "5 min · reflection",
    glyph: "◇",
    successSub: "Day closed. Work can wait.",
    accent: "var(--nw-evening)",
    fields: [
      {
        id: "keep",
        type: "text",
        highlight: true,
        label: "One moment worth keeping from today.",
        placeholder: "Something that felt good, real, or alive.",
      },
      {
        id: "self",
        type: "text",
        label: "Did you get that one thing just for yourself?",
        placeholder: "Yes / no / sort of — and why.",
      },
      {
        id: "work",
        type: "textarea",
        label:
          "What's quietly stressing you about work? Name it, then set it down.",
        placeholder:
          "It lives here tonight, not in your head. You don't need to solve it now.",
      },
      {
        id: "word",
        type: "text",
        word: true,
        label: "One word for how today felt.",
        placeholder: "full / scattered / good / slow…",
      },
    ],
    snippetField: "word",
    successField: "word",
    successPrefix: "Today felt ",
  },
];

/* ── STATE ── */
let appState = loadState();
let currentMoment = null;

function loadState() {
  try {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState()
    );
  } catch {
    return defaultState();
  }
}
function defaultState() {
  return {
    log: [],
    todaySentence: "",
    tomorrowSeed: "",
    theme: "auto",
    dayType: "auto",
  };
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

/* ── THEME ── */
function applyTheme() {
  const t = appState.theme;
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const isDark = t === "dark" || (t === "auto" && prefersDark);
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light",
  );
  document.getElementById("themeBtn").textContent = isDark ? "☀" : "☾";
}
function toggleTheme() {
  const t = appState.theme;
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const currentlyDark = t === "dark" || (t === "auto" && prefersDark);
  appState.theme = currentlyDark ? "light" : "dark";
  saveState();
  applyTheme();
}
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (appState.theme === "auto") applyTheme();
  });

/* ── DAY TYPE ── */
function detectDayType() {
  if (appState.dayType !== "auto") return appState.dayType;
  const day = new Date().getDay();
  return day === 0 || day === 6 ? "nonwork" : "workday";
}
function setDayType(type) {
  appState.dayType = type;
  saveState();
  updateDayTypeUI();
  const moments = type === "workday" ? WORKDAY_MOMENTS : NONWORK_MOMENTS;
  document.getElementById("cardContainer").innerHTML = moments
    .map((m) => renderCard(m))
    .join("");
  renderNav(moments);
  switchMoment(detectCurrentMoment(moments), moments);
}
function updateDayTypeUI() {
  const effective = detectDayType();
  document
    .getElementById("btn-workday")
    .classList.toggle("active", effective === "workday");
  document
    .getElementById("btn-nonwork")
    .classList.toggle("active", effective === "nonwork");
}
function detectCurrentMoment(moments) {
  const h = new Date().getHours();
  if (moments.length === 4) {
    if (h >= 5 && h < 11) return moments[0].id;
    if (h >= 11 && h < 14) return moments[1].id;
    if (h >= 14 && h < 20) return moments[2].id;
    return moments[3].id;
  } else {
    if (h >= 5 && h < 12) return moments[0].id;
    if (h >= 12 && h < 19) return moments[1].id;
    return moments[2].id;
  }
}

/* ── RENDER NAV ── */
function renderNav(moments) {
  document.getElementById("momentNav").innerHTML = moments
    .map(
      (m) => `
<button class="moment-btn" id="navbtn-${m.id}" data-id="${m.id}"
onclick="switchMoment('${m.id}', null)"
style="--m-accent: ${m.accent}">
${m.label}<br>${m.time}
</button>
`,
    )
    .join("");
}

/* ── RENDER CARD ── */
function renderCard(m) {
  const anchor = appState.todaySentence || appState.tomorrowSeed || "";
  const anchorHTML =
    m.showAnchor && anchor
      ? `<div class="seed-bar">
  <span class="seed-label">Anchor</span>
  <span class="seed-text">${esc(anchor)}</span>
  </div>`
      : "";
  const fieldsHTML = m.fields
    .map((f) => {
      const cls = f.highlight
        ? " highlight-input"
        : f.word
          ? " word-input"
          : "";
      const el =
        f.type === "textarea"
          ? `<textarea id="f-${f.id}" placeholder="${esc(f.placeholder)}"></textarea>`
          : `<input type="text" id="f-${f.id}" class="${cls.trim()}" placeholder="${esc(f.placeholder)}" />`;
      return `<div class="prompt-block"><div class="prompt-q">${f.label}</div>${el}</div>`;
    })
    .join("");

  return `
<div class="card" id="card-${m.id}" style="display:none">
<div class="card-header">
  <div>
    <div class="card-title">${m.title}</div>
    <div class="card-cost">${m.cost}</div>
  </div>
  <div class="accent-pip" style="background:${m.accent}"></div>
</div>
${anchorHTML}
<div class="prompts" id="prompts-${m.id}">${fieldsHTML}</div>
<div class="success-state" id="success-${m.id}">
  <div class="success-glyph" style="color:${m.accent}">${m.glyph}</div>
  <div class="success-text" id="success-text-${m.id}"></div>
  <div class="success-sub">${m.successSub}</div>
  <button class="btn-redo" onclick="resetCard('${m.id}')">edit</button>
</div>
<div class="card-footer" id="footer-${m.id}">
  <button class="btn-primary" style="background:${m.accent}"
    onclick="submitMoment('${m.id}')">
    ${m.title === "Good morning" ? "Begin" : m.title === "Midday reset" || m.title === "Midday check-in" ? "Check in" : "Close"}
  </button>
</div>
</div>`;
}

/* ── SWITCH MOMENT ── */
function switchMoment(id, moments) {
  if (!moments)
    moments =
      detectDayType() === "workday" ? WORKDAY_MOMENTS : NONWORK_MOMENTS;
  currentMoment = id;
  moments.forEach((m) => {
    const c = document.getElementById("card-" + m.id);
    if (c) c.style.display = m.id === id ? "block" : "none";
    const btn = document.getElementById("navbtn-" + m.id);
    if (btn) {
      btn.classList.toggle("active", m.id === id);
      btn.style.background = m.id === id ? m.accent : "";
    }
  });
  const m = moments.find((x) => x.id === id);
  if (m) {
    const sub = document.getElementById("momentSubtitle");
    sub.textContent = m.label + " · " + m.title;
    sub.style.color = m.accent;
  }
}

/* ── SUBMIT ── */
function submitMoment(id) {
  const moments =
    detectDayType() === "workday" ? WORKDAY_MOMENTS : NONWORK_MOMENTS;
  const m = moments.find((x) => x.id === id);
  if (!m) return;
  const data = {};
  let valid = true;
  m.fields.forEach((f) => {
    const el = document.getElementById("f-" + f.id);
    if (el) {
      data[f.id] = el.value.trim();
      if (f.required && !data[f.id]) {
        el.focus();
        valid = false;
      }
    }
  });
  if (!valid) return;
  if (id === "wd-morning" && data.sentence)
    appState.todaySentence = data.sentence;
  if (id === "wd-dayclose" && data.seed)
    appState.tomorrowSeed = data.seed;
  appState.log.unshift({
    id,
    dayType: detectDayType(),
    timestamp: new Date().toISOString(),
    data,
  });
  saveState();
  renderLog();
  let successText = data[m.successField] || "";
  if (m.successPrefix) successText = m.successPrefix + successText;
  if (m.successExtra && data[m.successExtra])
    successText += "\n" + m.successExtraPrefix + data[m.successExtra];
  document.getElementById("success-text-" + id).textContent = successText;
  document.getElementById("prompts-" + id).style.display = "none";
  document.getElementById("footer-" + id).style.display = "none";
  document.getElementById("success-" + id).classList.add("visible");
}

function resetCard(id) {
  document.getElementById("success-" + id).classList.remove("visible");
  document.getElementById("prompts-" + id).style.display = "flex";
  document.getElementById("footer-" + id).style.display = "block";
}

/* ── LOG ── */
function renderLog() {
  const list = document.getElementById("logList");
  if (!appState.log.length) {
    list.innerHTML =
      '<div class="log-empty">No entries yet. Complete a ritual to begin.</div>';
    return;
  }
  const allMoments = [...WORKDAY_MOMENTS, ...NONWORK_MOMENTS];
  list.innerHTML = appState.log
    .map((e, i) => {
      const m = allMoments.find((x) => x.id === e.id);
      if (!m) return "";
      const ts = new Date(e.timestamp);
      const dateStr = ts.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      const snippet = e.data[m.snippetField] || "—";
      const badge = e.dayType === "workday" ? "work" : "off";
      let bodyHTML = m.fields
        .map((f) => {
          const val = e.data[f.id];
          if (!val) return "";
          return `<div class="log-field"><div class="log-field-label">${f.label.replace("?", "").replace(":", "").trim()}</div><div class="log-field-value">${esc(val)}</div></div>`;
        })
        .join("");
      return `<div class="log-entry" data-moment="${e.id}">
<div class="log-entry-header" onclick="toggleLog(${i})">
  <div class="log-pip" style="background:${m.accent}"></div>
  <span class="log-type-badge">${badge}</span>
  <span class="log-meta">${dateStr} · ${m.label}</span>
  <span class="log-snippet">${esc(snippet)}</span>
  <button class="log-delete" onclick="event.stopPropagation(); deleteLog(${i})" title="Delete entry">×</button>
</div>
<div class="log-entry-body" id="log-body-${i}">
  <div class="log-field"><div class="log-field-label">${ts.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</div></div>
  ${bodyHTML}
</div>
</div>`;
    })
    .join("");
}
function toggleLog(i) {
  document.getElementById("log-body-" + i).classList.toggle("open");
}
function deleteLog(i) {
  if (confirm("Delete this entry? It cannot be undone.")) {
    appState.log.splice(i, 1);
    saveState();
    renderLog();
  }
}
function clearLog() {
  if (confirm("Clear all log entries?")) {
    appState.log = [];
    appState.todaySentence = "";
    appState.tomorrowSeed = "";
    saveState();
    renderLog();
  }
}
function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ── INIT ── */
function init() {
  document.getElementById("dateLine").textContent =
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  applyTheme();
  if (appState.dayType === "auto") {
    const autoType =
      new Date().getDay() === 0 || new Date().getDay() === 6
        ? "nonwork"
        : "workday";
    const moments =
      autoType === "workday" ? WORKDAY_MOMENTS : NONWORK_MOMENTS;
    document
      .getElementById("btn-workday")
      .classList.toggle("active", autoType === "workday");
    document
      .getElementById("btn-nonwork")
      .classList.toggle("active", autoType === "nonwork");
    document.getElementById("cardContainer").innerHTML = moments
      .map((m) => renderCard(m))
      .join("");
    renderNav(moments);
    switchMoment(detectCurrentMoment(moments), moments);
  } else {
    updateDayTypeUI();
    const moments =
      detectDayType() === "workday" ? WORKDAY_MOMENTS : NONWORK_MOMENTS;
    document.getElementById("cardContainer").innerHTML = moments
      .map((m) => renderCard(m))
      .join("");
    renderNav(moments);
    switchMoment(detectCurrentMoment(moments), moments);
  }
  renderLog();
}