'use strict';

/* ============================================================
   Notenwerte-Definitionen
   Einheit: 1 "unit" = eine Achtelnote (gleiche Konvention wie im
   Rhythmus-Generator, damit beide Apps inhaltlich zueinander passen).
   ============================================================ */

// clickInterval: Grundschlag-Klick auf jeder Viertel (alle 2 units) - gleiche
// Konvention wie im Rhythmus-Generator.
const TIME_SIGNATURES = {
  '4/4': { top: 4, bottom: 4, units: 8, beatTicks: [0, 2, 4, 6, 8], labels: ['1', '+', '2', '+', '3', '+', '4', '+'], clickInterval: 2 },
  '3/4': { top: 3, bottom: 4, units: 6, beatTicks: [0, 2, 4, 6], labels: ['1', '+', '2', '+', '3', '+'], clickInterval: 2 },
};

// Gleiche echten Notationsformen (Wikimedia-Referenzglyphen) wie im
// Rhythmus-Generator, damit Kinder dieselben Symbole wiedererkennen.
const NOTE_TYPES = [
  {
    id: 'whole', name: 'Ganze Note', units: 8, isRest: false,
    icon: `<svg viewBox="0 0 40 48"><ellipse cx="16" cy="30" rx="13" ry="8" transform="rotate(-15 16 30)" fill="none" stroke="#1a1a1a" stroke-width="4"/></svg>`,
  },
  {
    id: 'half', name: 'Halbe Note', units: 4, isRest: false,
    icon: `<svg viewBox="0 0 40 56"><ellipse cx="16" cy="46" rx="11" ry="7.5" transform="rotate(-15 16 46)" fill="none" stroke="#1a1a1a" stroke-width="3.5"/><line x1="26" y1="43" x2="26" y2="3" stroke="#1a1a1a" stroke-width="3.5"/></svg>`,
  },
  {
    id: 'quarter', name: 'Viertel Note', units: 2, isRest: false,
    icon: `<svg viewBox="0 0 40 56"><ellipse cx="16" cy="46" rx="11" ry="7.5" transform="rotate(-15 16 46)" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="3.5"/><line x1="26" y1="43" x2="26" y2="3" stroke="#1a1a1a" stroke-width="3.5"/></svg>`,
  },
  {
    id: 'eighth', name: 'Achtel (einzeln)', units: 1, isRest: false,
    icon: `<svg viewBox="0 0 40 56"><ellipse cx="16" cy="46" rx="11" ry="7.5" transform="rotate(-15 16 46)" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="3.5"/><line x1="26" y1="43" x2="26" y2="3" stroke="#1a1a1a" stroke-width="3.5"/><path d="M26 3 C25.3 9.1 31.8 11.2 34.9 14 C37.9 16.7 39 19.7 38.9 22.5 C38.9 23.3 38.6 26.7 35.8 30 C39.6 21.6 36.1 18.3 32.6 15.6 C28.5 12.4 25.4 9.4 26 3 Z" fill="#1a1a1a"/></svg>`,
  },
  {
    id: 'wholeRest', name: 'Ganze Pause', units: 8, isRest: true,
    icon: `<svg viewBox="0 0 40 48"><line x1="4" y1="20" x2="30" y2="20" stroke="#1a1a1a" stroke-width="1.5" opacity="0.3"/><rect x="7" y="20" width="18" height="7" fill="#1a1a1a"/></svg>`,
  },
  {
    id: 'halfRest', name: 'Halbe Pause', units: 4, isRest: true,
    icon: `<svg viewBox="0 0 40 48"><line x1="4" y1="20" x2="30" y2="20" stroke="#1a1a1a" stroke-width="1.5" opacity="0.3"/><rect x="7" y="13" width="18" height="7" fill="#1a1a1a"/></svg>`,
  },
  {
    id: 'quarterRest', name: 'Viertelpause', units: 2, isRest: true,
    icon: `<svg viewBox="0 0 40 48"><path d="M 33.585446,59.378537 49.000347,80.448853 C 34.510389,96.966456 43.303241,103.77053 46.891412,113.31714 L 30.195758,89.013879 c 9.651793,-11.411594 5.787047,-20.20785 2.345326,-29.067873 -0.002,-0.0045 1.042493,-0.561506 1.044362,-0.567469 z" fill="#1a1a1a" transform="translate(10,4) scale(0.564) translate(-28.293569,-59.378536)"/><path d="m 45.566519,110.60468 c -17.76994,-15.91987 -24.592214,4.82994 -7.083379,19.74003 -2.252919,-3.86658 -8.756028,-22.85814 7.953256,-17.07143" fill="#1a1a1a" transform="translate(10,4) scale(0.564) translate(-28.293569,-59.378536)"/></svg>`,
  },
  {
    id: 'eighthRest', name: 'Achtelpause', units: 1, isRest: true,
    icon: `<svg viewBox="0 0 40 48"><path d="m 531.098,74.847 c -0.52,0.098 -0.918,0.457 -1.098,0.953 -0.039,0.16 -0.039,0.199 -0.039,0.418 0,0.301 0.019,0.461 0.16,0.699 0.199,0.399 0.617,0.719 1.094,0.836 0.5,0.141 1.336,0.02 2.293,-0.297 l 0.238,-0.082 -1.176,3.25 -1.156,3.246 c 0,0 0.039,0.02 0.102,0.063 0.117,0.078 0.316,0.137 0.457,0.137 0.238,0 0.539,-0.137 0.578,-0.258 0,-0.039 0.558,-1.934 1.234,-4.184 l 1.195,-4.125 -0.039,-0.058 c -0.097,-0.121 -0.296,-0.16 -0.418,-0.063 -0.039,0.039 -0.101,0.121 -0.14,0.18 -0.18,0.301 -0.637,0.836 -0.875,1.035 -0.219,0.18 -0.34,0.199 -0.539,0.121 -0.18,-0.098 -0.239,-0.199 -0.36,-0.738 -0.117,-0.535 -0.257,-0.778 -0.558,-0.977 -0.278,-0.179 -0.637,-0.238 -0.953,-0.156 z" fill="#1a1a1a" transform="translate(13,8) scale(2.8) translate(-529.96,-74.81)"/></svg>`,
  },
];

const noteType = (id) => NOTE_TYPES.find((t) => t.id === id);

/* ============================================================
   Level-Definitionen
   Jedes Level mischt von Anfang an mehrere Notenwerte (nie nur einen
   einzigen Wert wie in der ersten Fassung) - "leichter" heißt hier: größere,
   wenige Notenwerte ohne Pausen; "schwerer" heißt: mehr verschiedene
   Notenwerte, mehr Pausen-Anteil (restChance) und ein Übergewicht auf
   kürzeren Werten (unitWeights), wodurch spürbar mehr einzelne
   Klangereignisse pro Takt entstehen. Level 6 wechselt zusätzlich in den
   3/4-Takt. 6/8 bewusst weiterhin nicht enthalten (siehe README.md).
   ============================================================ */

const LEVELS = [
  {
    id: 1, title: 'Viertel & Halbe', timeSignature: '4/4',
    allowedTypeIds: ['quarter', 'half'],
    unitWeights: { 2: 5, 4: 3 }, restChance: 0,
  },
  {
    id: 2, title: 'Mit Achteln', timeSignature: '4/4',
    allowedTypeIds: ['quarter', 'half', 'eighth'],
    unitWeights: { 1: 3, 2: 5, 4: 2 }, restChance: 0,
  },
  {
    id: 3, title: 'Erste Pausen', timeSignature: '4/4',
    allowedTypeIds: ['half', 'quarter', 'eighth', 'quarterRest'],
    unitWeights: { 1: 4, 2: 5, 4: 2 }, restChance: 0.2,
  },
  {
    id: 4, title: 'Ganze Noten dazu', timeSignature: '4/4',
    allowedTypeIds: ['whole', 'half', 'quarter', 'eighth', 'halfRest', 'quarterRest', 'eighthRest'],
    unitWeights: { 1: 5, 2: 5, 4: 2, 8: 1 }, restChance: 0.25,
  },
  {
    id: 5, title: 'Alles gemischt', timeSignature: '4/4',
    allowedTypeIds: ['whole', 'wholeRest', 'half', 'halfRest', 'quarter', 'quarterRest', 'eighth', 'eighthRest'],
    unitWeights: { 1: 6, 2: 5, 4: 2, 8: 1 }, restChance: 0.3,
  },
  {
    // 3/4 fasst max. 6 Achtel-units - "whole"/"wholeRest" (8) passen nie
    // hinein und bleiben deshalb hier bewusst weg.
    id: 6, title: '3/4-Takt (Profi)', timeSignature: '3/4',
    allowedTypeIds: ['half', 'halfRest', 'quarter', 'quarterRest', 'eighth', 'eighthRest'],
    unitWeights: { 1: 6, 2: 5, 4: 2 }, restChance: 0.3,
  },
];

const ROUNDS_PER_LEVEL = 10;
const POINTS_PER_ROUND = 10;
const FIRST_TRY_BONUS = 5;

// Differenzierung: dasselbe Rätsel lässt sich langsam (zum Üben, ohne
// Nachteil), mittelschnell oder schnell anhören - für "mittel"/"schnell"
// gibt es beim Lösen einen Extra-Bonus, weil das schwerer zu hören ist.
const TEMPO_OPTIONS = [
  { id: 'langsam', label: '🐢 Langsam', bpm: 56, bonus: 0 },
  { id: 'mittel', label: '🚶 Mittel', bpm: 80, bonus: 5 },
  { id: 'schnell', label: '🐇 Schnell', bpm: 112, bonus: 10 },
];
const currentTempo = () => TEMPO_OPTIONS.find((t) => t.id === game.tempoId) || TEMPO_OPTIONS[1];

/* ============================================================
   State + Fortschritt (localStorage)
   Level-Auswahl ist jetzt frei (kein Freischalten mehr) - gespeichert wird
   deshalb nicht mehr "aktuelles Level", sondern welche Level schon einmal
   komplett (10/10) gelöst wurden (für das Häkchen in der Level-Übersicht),
   der Gesamtpunktestand, und die Metronom-/Einzähler-/Tempo-Einstellungen
   (kein Nutzerkonto/keine Cloud, siehe README.md).
   ============================================================ */

const STORAGE_KEY = 'rhythmusRaetselFortschritt';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { points: 0, completedLevelIds: [], metronome: true, countIn: true, tempoId: 'mittel' };
    const parsed = JSON.parse(raw);
    return {
      points: Math.max(0, Number(parsed.points) || 0),
      completedLevelIds: Array.isArray(parsed.completedLevelIds) ? parsed.completedLevelIds : [],
      metronome: parsed.metronome !== false,
      countIn: parsed.countIn !== false,
      tempoId: TEMPO_OPTIONS.some((t) => t.id === parsed.tempoId) ? parsed.tempoId : 'mittel',
    };
  } catch (err) {
    return { points: 0, completedLevelIds: [], metronome: true, countIn: true, tempoId: 'mittel' };
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      points: game.points,
      completedLevelIds: Array.from(game.completedLevelIds),
      metronome: game.metronome,
      countIn: game.countIn,
      tempoId: game.tempoId,
    }));
  } catch (err) {
    /* z.B. Privater Modus ohne Speicherzugriff - Fortschritt bleibt dann nur für diese Sitzung erhalten */
  }
}

let uidCounter = 1;
const uid = (prefix) => `${prefix}-${uidCounter++}`;

const game = {
  screen: 'select', // 'select' | 'play'
  currentLevelId: null,
  points: 0,
  completedLevelIds: new Set(),
  metronome: true,
  countIn: true,
  tempoId: 'mittel',
  roundInLevel: 0, // 0-basiert, wie viele Runden in diesem Level schon richtig gelöst sind
  attemptCount: 0, // Versuche in der AKTUELLEN Runde (für den Erstversuch-Bonus)
  target: [], // [{ id, typeId, startUnit }] - der vorgespielte Ziel-Rhythmus
  attempt: [], // dieselbe Form, vom Kind zusammengebaut
  noteVolume: 0.6,
};

function currentLevel() {
  return LEVELS.find((l) => l.id === game.currentLevelId);
}

/* ============================================================
   Ziel-Rhythmus generieren
   ============================================================ */

function pickWeighted(candidates) {
  const total = candidates.reduce((sum, c) => sum + c.weight, 0);
  let r = Math.random() * total;
  for (const c of candidates) {
    if (r < c.weight) return c;
    r -= c.weight;
  }
  return candidates[candidates.length - 1];
}

// Füllt den Takt lückenlos von Anfang bis Ende: pro Schritt wird zuerst eine
// Dauer gewürfelt (gewichtet nach level.unitWeights, nur unter den Dauern,
// die im Level erlaubt UND im Rest-Platz noch unterbringbar sind), danach -
// falls für diese Dauer sowohl eine Note als auch eine Pause erlaubt sind -
// per level.restChance entschieden, ob es eine Pause wird. Jedes Level
// enthält bewusst immer auch die kleinste erlaubte Dauer, damit die Schleife
// nie in einem Rest festhängt, der zu keiner erlaubten Dauer passt.
function generateTargetRhythm(level) {
  const capacity = TIME_SIGNATURES[level.timeSignature].units;
  const notes = [];
  let position = 0;
  while (position < capacity) {
    const remaining = capacity - position;
    const availableUnits = [...new Set(level.allowedTypeIds.map((id) => noteType(id).units))].filter((u) => u <= remaining);
    if (availableUnits.length === 0) break; // sollte laut Level-Definition nie eintreten
    const units = pickWeighted(availableUnits.map((u) => ({ units: u, weight: level.unitWeights[u] || 1 }))).units;

    const noteId = level.allowedTypeIds.find((id) => !noteType(id).isRest && noteType(id).units === units);
    const restId = level.allowedTypeIds.find((id) => noteType(id).isRest && noteType(id).units === units);
    let typeId;
    if (noteId && restId) typeId = Math.random() < level.restChance ? restId : noteId;
    else typeId = noteId || restId;

    notes.push({ id: uid('n'), typeId, startUnit: position });
    position += units;
  }
  return notes;
}

/* ============================================================
   Rendering: Bildschirm-Umschaltung (Level-Auswahl <-> Spiel)
   ============================================================ */

const levelSelectScreenEl = document.getElementById('levelSelectScreen');
const playScreenEl = document.getElementById('playScreen');
const backToSelectBtn = document.getElementById('backToSelectBtn');
const playBottomBar = document.getElementById('playBottomBar');
const levelLabelEl = document.getElementById('levelLabel');
const pointsLabel = document.getElementById('pointsLabel');

function renderApp() {
  const inLevel = game.screen === 'play';
  levelSelectScreenEl.hidden = inLevel;
  playScreenEl.hidden = !inLevel;
  backToSelectBtn.hidden = !inLevel;
  playBottomBar.hidden = !inLevel;
  levelLabelEl.hidden = !inLevel;
  pointsLabel.textContent = `⭐ ${game.points} Punkte`;

  if (inLevel) {
    levelLabelEl.textContent = `Level ${currentLevel().id}: ${currentLevel().title}`;
  } else {
    renderLevelSelect();
  }
}

/* ============================================================
   Rendering: Level-Auswahl
   ============================================================ */

const levelSelectGridEl = document.getElementById('levelSelectGrid');

function renderLevelSelect() {
  levelSelectGridEl.innerHTML = '';
  LEVELS.forEach((level) => {
    const ts = TIME_SIGNATURES[level.timeSignature];
    const done = game.completedLevelIds.has(level.id);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `level-card${done ? ' is-done' : ''}`;
    card.innerHTML = `
      <span class="level-card-top">
        <span class="level-card-number">Level ${level.id}</span>
        ${done ? '<span class="level-card-check">✓</span>' : ''}
      </span>
      <span class="level-card-title">${level.title}</span>
      <span class="level-card-icons">
        ${level.allowedTypeIds.map((id) => `<span class="level-card-icon">${noteType(id).icon}</span>`).join('')}
      </span>
      <span class="level-card-meter">${ts.top}/${ts.bottom}-Takt</span>
    `;
    card.addEventListener('click', () => startLevel(level.id));
    levelSelectGridEl.appendChild(card);
  });
}

function startLevel(levelId) {
  game.currentLevelId = levelId;
  game.screen = 'play';
  game.roundInLevel = 0;
  renderApp();
  startRound();
}

function backToLevelSelect() {
  roundToken += 1; // verwirft jeden noch ausstehenden "nächste Runde"-Timer
  game.screen = 'select';
  game.currentLevelId = null;
  renderApp();
}

/* ============================================================
   Rendering: Palette (Noten/Pausen getrennt, wie im Rhythmus-Generator -
   nur die für das aktuelle Level erlaubten Karten)
   ============================================================ */

const paletteCardsNotesEl = document.getElementById('paletteCardsNotes');
const paletteCardsRestsEl = document.getElementById('paletteCardsRests');

function renderPalette() {
  paletteCardsNotesEl.innerHTML = '';
  paletteCardsRestsEl.innerHTML = '';
  const level = currentLevel();
  level.allowedTypeIds.forEach((typeId) => {
    const type = noteType(typeId);
    const beatsLabel = formatBeats(type.units);
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
      <span class="icon">${type.icon}</span>
      <span class="label">
        <span class="name">${type.name}</span>
        <span class="beats">${beatsLabel} Zählzeit${beatsLabel === '1' ? '' : 'en'}</span>
      </span>
    `;
    card.addEventListener('pointerdown', (e) => startDragNew(e, type));
    (type.isRest ? paletteCardsRestsEl : paletteCardsNotesEl).appendChild(card);
  });
}

function formatBeats(units) {
  const beats = units / 2;
  return Number.isInteger(beats) ? String(beats) : beats.toFixed(1);
}

/* ============================================================
   Rendering: die eine Takt-Karte, in die das Kind seinen Versuch baut
   ============================================================ */

const unitsToPercent = (units, capacity) => (units / capacity) * 100;
const anchorPercent = (units) => 50 / units;

function measureExtent() {
  return game.attempt.reduce((max, n) => Math.max(max, n.startUnit + noteType(n.typeId).units), 0);
}

function measureUnits() {
  return game.attempt.reduce((sum, n) => sum + noteType(n.typeId).units, 0);
}

function measureStatus() {
  const capacity = TIME_SIGNATURES[currentLevel().timeSignature].units;
  const units = measureUnits();
  if (units === 0) return 'leer';
  const extent = measureExtent();
  if (extent > capacity) return 'uebervoll';
  if (units === capacity && extent === capacity) return 'voll';
  return 'offen';
}

function layoutNotes() {
  return game.attempt
    .slice()
    .sort((a, b) => a.startUnit - b.startUnit)
    .map((note) => ({ note, type: noteType(note.typeId), start: note.startUnit }));
}

const measuresEl = document.getElementById('measures');

function renderMeasure() {
  const level = currentLevel();
  const ts = TIME_SIGNATURES[level.timeSignature];
  const status = measureStatus();

  const wrap = document.createElement('div');
  wrap.className = `measure status-${status}`;

  const header = document.createElement('div');
  header.className = 'measure-header';
  header.innerHTML = `<span class="measure-title">Dein Rhythmus (${ts.top}/${ts.bottom})</span>`;

  const clearBtn = document.createElement('button');
  clearBtn.className = 'measure-clear';
  clearBtn.type = 'button';
  clearBtn.title = 'Alles wieder entfernen und neu anfangen';
  clearBtn.textContent = '🧹 Neu anfangen';
  clearBtn.addEventListener('click', () => {
    game.attempt = [];
    renderMeasure();
  });
  header.appendChild(clearBtn);

  const track = document.createElement('div');
  track.className = 'slot-track';

  ts.beatTicks.forEach((unitPos) => {
    const tick = document.createElement('div');
    tick.className = 'beat-tick';
    tick.style.left = `${unitsToPercent(unitPos, ts.units)}%`;
    tick.style.width = unitPos === ts.units ? '3px' : '1px';
    tick.style.background = unitPos === ts.units ? '#8a8a8a' : '#dedad0';
    track.appendChild(tick);
  });

  renderMeasureNotes(track);

  const warning = document.createElement('div');
  warning.className = 'measure-warning';
  warning.hidden = true;
  warning.innerHTML = '<span></span>';
  track.appendChild(warning);

  const beatLabels = document.createElement('div');
  beatLabels.className = 'beat-labels';
  beatLabels.style.gridTemplateColumns = `repeat(${ts.labels.length}, 1fr)`;
  beatLabels.innerHTML = ts.labels.map((l) => `<span>${l}</span>`).join('');

  const trackColumn = document.createElement('div');
  trackColumn.className = 'track-column';
  trackColumn.appendChild(track);
  trackColumn.appendChild(beatLabels);

  wrap.appendChild(header);
  wrap.appendChild(trackColumn);

  // Einzähler-Overlay sitzt auf der GANZEN Takt-Karte (wrap), nicht nur im
  // Raster (track) - so darf die Zahl so groß wie der komplette farbige
  // Rahmen werden, ohne an dessen overflow:hidden-Kante abgeschnitten zu
  // werden (gleiche Lösung wie im Rhythmus-Generator).
  const clickCount = ts.units / ts.clickInterval;
  const countInOverlay = document.createElement('div');
  countInOverlay.className = 'count-in-overlay';
  countInOverlay.hidden = true;
  countInOverlay.innerHTML = `
    <div class="count-in-number">1</div>
    <div class="count-in-dots">${'<span class="count-in-dot"></span>'.repeat(clickCount)}</div>
  `;
  wrap.appendChild(countInOverlay);

  measuresEl.innerHTML = '';
  measuresEl.appendChild(wrap);
}

// Zwei direkt aufeinanderfolgende einzelne Achtel als verbundenes Paar mit
// gemeinsamem Balken (gleiche Erkennung wie im Rhythmus-Generator).
function renderMeasureNotes(track) {
  const capacity = TIME_SIGNATURES[currentLevel().timeSignature].units;
  const layout = layoutNotes();
  let i = 0;
  while (i < layout.length) {
    const cur = layout[i];
    const next = layout[i + 1];
    const canPair = cur.type.id === 'eighth' && next && next.type.id === 'eighth' && next.start === cur.start + 1;
    if (canPair) {
      track.appendChild(renderEighthPair(cur.note, next.note, capacity, cur.start));
      i += 2;
    } else {
      track.appendChild(renderPlacedNote(cur.note, cur.type, capacity, cur.start));
      i += 1;
    }
  }
}

function attachNoteInteractions(el, noteId) {
  const deleteBtn = el.querySelector('.delete-btn');
  deleteBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    game.attempt = game.attempt.filter((n) => n.id !== noteId);
    renderMeasure();
  });
  el.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.delete-btn')) return;
    startDragMove(e, noteId);
  });
}

function renderPlacedNote(note, type, capacity, startUnit) {
  const el = document.createElement('div');
  el.className = 'placed-note';
  el.dataset.noteId = note.id;
  el.style.left = `${unitsToPercent(startUnit, capacity)}%`;
  el.style.width = `${unitsToPercent(type.units, capacity)}%`;
  el.style.setProperty('--anchor-pct', anchorPercent(type.units));
  el.innerHTML = `<span class="icon">${type.icon}</span><button class="delete-btn" title="Entfernen">×</button>`;
  attachNoteInteractions(el, note.id);
  return el;
}

function renderEighthPair(noteA, noteB, capacity, startUnit) {
  const beamedIcon = noteType('quarter').icon;
  const el = document.createElement('div');
  el.className = 'placed-note-pair';
  el.style.left = `${unitsToPercent(startUnit, capacity)}%`;
  el.style.width = `${unitsToPercent(2, capacity)}%`;
  el.innerHTML = `
    <div class="eighth-half" data-note-id="${noteA.id}"><span class="icon">${beamedIcon}</span><button class="delete-btn delete-btn-left" title="Entfernen">×</button></div>
    <div class="eighth-half" data-note-id="${noteB.id}"><span class="icon">${beamedIcon}</span><button class="delete-btn" title="Entfernen">×</button></div>
    <div class="beam-bar"></div>
  `;
  el.querySelectorAll('.eighth-half').forEach((half) => attachNoteInteractions(half, half.dataset.noteId));
  return el;
}

/* ============================================================
   Drag & Drop (Pointer Events - Maus, Touch & Stift) - gleiches
   Grundverfahren wie im Rhythmus-Generator, hier auf EINE einzige
   Takt-Karte vereinfacht.
   ============================================================ */

let drag = null;
const dragGhost = document.getElementById('dragGhost');

function currentUnitPx() {
  const track = document.querySelector('.slot-track');
  const capacity = TIME_SIGNATURES[currentLevel().timeSignature].units;
  if (!track) return 320 / capacity;
  return track.getBoundingClientRect().width / capacity;
}

function startDragNew(e, type) {
  e.preventDefault();
  drag = { kind: 'new', typeId: type.id, units: type.units };
  const innerHtml = singleInnerHtml(type.icon, anchorPercent(type.units));
  beginGhost(wrapHtml(innerHtml, type.units * currentUnitPx()), e.clientX, e.clientY, anchorPercent(type.units));
  document.addEventListener('pointermove', onDragMove);
  document.addEventListener('pointerup', onDragEnd);
}

function startDragMove(e, noteId) {
  e.preventDefault();
  const note = game.attempt.find((n) => n.id === noteId);
  if (!note) return;
  const type = noteType(note.typeId);
  drag = { kind: 'move', noteId, units: type.units };
  const innerHtml = singleInnerHtml(type.icon, anchorPercent(type.units));
  beginGhost(wrapHtml(innerHtml, type.units * currentUnitPx()), e.clientX, e.clientY, anchorPercent(type.units));
  document.querySelectorAll(`[data-note-id="${noteId}"]`).forEach((el) => el.classList.add('dragging-source'));
  document.addEventListener('pointermove', onDragMove);
  document.addEventListener('pointerup', onDragEnd);
}

function singleInnerHtml(iconSvg, anchorPct) {
  return `<span class="icon" style="--anchor-pct:${anchorPct}">${iconSvg}</span>`;
}

function wrapHtml(innerHtml, widthPx) {
  return `<div class="placed-note" style="width:${widthPx}px;">${innerHtml}</div>`;
}

function beginGhost(html, x, y, anchorPct) {
  dragGhost.innerHTML = html;
  dragGhost.style.left = `${x}px`;
  dragGhost.style.top = `${y}px`;
  dragGhost.style.setProperty('--ghost-anchor-x', `${anchorPct}%`);
  dragGhost.hidden = false;
}

function onDragMove(e) {
  if (!drag) return;
  dragGhost.style.left = `${e.clientX}px`;
  dragGhost.style.top = `${e.clientY}px`;
  updateDragVisuals(e.clientX, e.clientY);
}

function updateDragVisuals(clientX, clientY) {
  clearDragHighlights();
  const track = trackUnderPoint(clientX, clientY);
  if (!track) return;
  track.classList.add('drag-over');

  const capacity = TIME_SIGNATURES[currentLevel().timeSignature].units;
  const excludeNoteId = drag.kind === 'move' ? drag.noteId : null;
  const targetUnit = pushPastOverlaps(excludeNoteId, targetUnitFromX(track, clientX, capacity), drag.units);

  const dragTypeId = drag.typeId || game.attempt.find((n) => n.id === drag.noteId).typeId;
  const preview = document.createElement('div');
  preview.className = 'insert-preview';
  preview.innerHTML = singleInnerHtml(noteType(dragTypeId).icon, anchorPercent(drag.units));
  preview.style.left = `${unitsToPercent(targetUnit, capacity)}%`;
  preview.style.width = `${unitsToPercent(drag.units, capacity)}%`;
  track.appendChild(preview);

  const extent = Math.max(measureExtentExcluding(excludeNoteId), targetUnit + drag.units);
  track.closest('.measure').classList.toggle('preview-overfull', extent > capacity);
}

function measureExtentExcluding(excludeNoteId) {
  return game.attempt.reduce((max, n) => {
    if (n.id === excludeNoteId) return max;
    return Math.max(max, n.startUnit + noteType(n.typeId).units);
  }, 0);
}

function onDragEnd(e) {
  if (!drag) return;
  const track = trackUnderPoint(e.clientX, e.clientY);
  let showOverfullWarning = false;

  if (track) {
    const capacity = TIME_SIGNATURES[currentLevel().timeSignature].units;
    const excludeNoteId = drag.kind === 'move' ? drag.noteId : null;
    const targetUnit = pushPastOverlaps(excludeNoteId, targetUnitFromX(track, e.clientX, capacity), drag.units);

    if (targetUnit + drag.units > capacity) {
      showOverfullWarning = true;
    } else if (drag.kind === 'new') {
      game.attempt.push({ id: uid('n'), typeId: drag.typeId, startUnit: targetUnit });
    } else if (drag.kind === 'move') {
      const note = game.attempt.find((n) => n.id === drag.noteId);
      if (note) {
        game.attempt = game.attempt.filter((n) => n.id !== drag.noteId);
        note.startUnit = targetUnit;
        game.attempt.push(note);
      }
    }
  } else if (drag.kind === 'move') {
    game.attempt = game.attempt.filter((n) => n.id !== drag.noteId);
  }

  cleanupDrag();
  renderMeasure();
  if (showOverfullWarning) showMeasureWarning('Takt ist zu voll dafür');
}

function showMeasureWarning(text) {
  const warning = document.querySelector('.measure-warning');
  if (!warning) return;
  warning.querySelector('span').textContent = text;
  warning.hidden = false;
  clearTimeout(warning._hideTimeout);
  warning._hideTimeout = setTimeout(() => {
    warning.hidden = true;
  }, 1600);
}

function cleanupDrag() {
  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup', onDragEnd);
  dragGhost.hidden = true;
  dragGhost.innerHTML = '';
  clearDragHighlights();
  document.querySelectorAll('.dragging-source').forEach((el) => el.classList.remove('dragging-source'));
  drag = null;
}

function clearDragHighlights() {
  document.querySelectorAll('.slot-track.drag-over').forEach((t) => t.classList.remove('drag-over'));
  document.querySelectorAll('.insert-preview').forEach((p) => p.remove());
  document.querySelectorAll('.measure.preview-overfull').forEach((m) => m.classList.remove('preview-overfull'));
}

function trackUnderPoint(x, y) {
  const el = document.elementFromPoint(x, y);
  return el ? el.closest('.slot-track') : null;
}

function targetUnitFromX(track, clientX, capacity) {
  const rect = track.getBoundingClientRect();
  const relativeX = Math.max(0, Math.min(rect.width - 0.01, clientX - rect.left));
  return Math.max(0, Math.min(capacity, Math.floor((relativeX / rect.width) * capacity)));
}

function pushPastOverlaps(excludeNoteId, targetUnit, units) {
  const others = game.attempt
    .filter((n) => n.id !== excludeNoteId)
    .map((n) => ({ start: n.startUnit, end: n.startUnit + noteType(n.typeId).units }))
    .sort((a, b) => a.start - b.start);

  let start = targetUnit;
  let moved = true;
  while (moved) {
    moved = false;
    for (const o of others) {
      if (start < o.end && start + units > o.start) {
        start = o.end;
        moved = true;
      }
    }
  }
  return start;
}

/* ============================================================
   Audio (Web Audio API) - gleiche FM-Glocke + Klick wie im
   Rhythmus-Generator, damit beide Apps klanglich zusammengehören.
   ============================================================ */

let audioCtx = null;
let noteMasterGain = null;
let clickMasterGain = null;
let activeOscillators = [];
let activeTimeouts = [];

function ensureAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    noteMasterGain = audioCtx.createGain();
    noteMasterGain.gain.value = game.noteVolume;
    noteMasterGain.connect(audioCtx.destination);
    clickMasterGain = audioCtx.createGain();
    clickMasterGain.gain.value = game.noteVolume;
    clickMasterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function scheduleTone(startTime, duration) {
  const ctx = audioCtx;
  const carrier = ctx.createOscillator();
  const modulator = ctx.createOscillator();
  const modGain = ctx.createGain();
  const gain = ctx.createGain();

  carrier.type = 'sine';
  carrier.frequency.value = 523.25;
  modulator.type = 'sine';
  modulator.frequency.value = 523.25 * 5.5;

  modGain.gain.setValueAtTime(1500, startTime);
  modGain.gain.exponentialRampToValueAtTime(30, startTime + Math.min(duration, 1.5));
  modulator.connect(modGain).connect(carrier.frequency);

  const attack = 0.004;
  const release = Math.min(0.08, duration * 0.25);
  const peak = 0.44;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peak, startTime + attack);
  gain.gain.setValueAtTime(peak, startTime + Math.max(attack, duration - release));
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  carrier.connect(gain).connect(noteMasterGain);

  const stopTime = startTime + duration + 0.05;
  modulator.start(startTime);
  modulator.stop(stopTime);
  carrier.start(startTime);
  carrier.stop(stopTime);
  activeOscillators.push(modulator, carrier);
}

function scheduleClick(startTime) {
  const ctx = audioCtx;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.value = 1500;
  gain.gain.setValueAtTime(0.24, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);
  osc.connect(gain).connect(clickMasterGain);
  osc.start(startTime);
  osc.stop(startTime + 0.05);
  activeOscillators.push(osc);
}

// Freundliches, kurzes Dur-Arpeggio für "richtig" - bewusst KEIN klassischer
// harter "Buzzer"/Fehlerton für "falsch" (keine Bestrafung, keine
// Frustration), sondern ein einzelner, weicher, tiefer Ton.
function playSuccessSound() {
  ensureAudioContext();
  const now = audioCtx.currentTime + 0.02;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    const t = now + i * 0.09;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(gain).connect(noteMasterGain);
    osc.start(t);
    osc.stop(t + 0.4);
    activeOscillators.push(osc);
  });
}

function playTryAgainSound() {
  ensureAudioContext();
  const t = audioCtx.currentTime + 0.02;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 220;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.25, t + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
  osc.connect(gain).connect(noteMasterGain);
  osc.start(t);
  osc.stop(t + 0.5);
  activeOscillators.push(osc);
}

/* ============================================================
   Einzähler (Countdown-Overlay auf der Takt-Karte) + Grundschlag-Klick
   während der Ziel-Rhythmus-Wiedergabe - beide unabhängig voneinander
   in den Einstellungen abschaltbar. Anders als im Rhythmus-Generator reicht
   hier eine einmalige, feste Sequenz statt eines Live-Schedulers, weil der
   Ziel-Rhythmus während der Wiedergabe nicht bearbeitet werden kann.
   ============================================================ */

let countIn = null; // { startTime, clickCount, clickDuration, endTime, lastShownIdx }
let countInRAF = null;

function beginCountIn(startTime, ts, unitSeconds) {
  const clickCount = ts.units / ts.clickInterval;
  const clickDuration = ts.clickInterval * unitSeconds;
  for (let i = 0; i < clickCount; i++) scheduleClick(startTime + i * clickDuration);
  countIn = { startTime, clickCount, clickDuration, endTime: startTime + clickCount * clickDuration, lastShownIdx: -1 };
  countInRAF = requestAnimationFrame(tickCountIn);
  return countIn.endTime;
}

function tickCountIn() {
  if (!countIn) return;
  const overlay = document.querySelector('.count-in-overlay');
  if (overlay) {
    // Overlay kann zwischenzeitlich neu gerendert (und damit wieder
    // versteckt) worden sein, z.B. wenn während des Einzählens am Versuch
    // gebaut wird - deshalb jeden Frame neu absichern statt nur einmalig.
    overlay.hidden = false;
    const numberEl = overlay.querySelector('.count-in-number');
    if (!numberEl.style.fontSize) {
      const measureEl = overlay.closest('.measure');
      if (measureEl) numberEl.style.fontSize = `${measureEl.getBoundingClientRect().height * 0.78}px`;
    }
    const now = audioCtx.currentTime;
    const idx = Math.max(0, Math.min(countIn.clickCount - 1, Math.floor((now - countIn.startTime) / countIn.clickDuration)));
    overlay.querySelectorAll('.count-in-dot').forEach((dot, i) => dot.classList.toggle('active', i <= idx));
    if (idx !== countIn.lastShownIdx) {
      countIn.lastShownIdx = idx;
      numberEl.textContent = String(idx + 1);
      numberEl.classList.remove('bounce');
      void numberEl.offsetWidth;
      numberEl.classList.add('bounce');
    }
    if (now >= countIn.endTime) {
      endCountIn();
      return;
    }
  }
  countInRAF = requestAnimationFrame(tickCountIn);
}

function endCountIn() {
  countIn = null;
  if (countInRAF) cancelAnimationFrame(countInRAF);
  countInRAF = null;
  const overlay = document.querySelector('.count-in-overlay');
  if (!overlay) return;
  overlay.hidden = true;
  overlay.querySelector('.count-in-number').textContent = '1';
  overlay.querySelectorAll('.count-in-dot').forEach((dot) => dot.classList.remove('active'));
}

let isPlayingTarget = false;

function playTargetRhythm() {
  if (isPlayingTarget) return; // sanftes Debounce, keine Bestrafung - verhindert nur überlappende Wiedergaben
  ensureAudioContext();
  isPlayingTarget = true;
  listenBtn.disabled = true;

  const ts = TIME_SIGNATURES[currentLevel().timeSignature];
  const unitSeconds = 60 / currentTempo().bpm / 2;
  const now = audioCtx.currentTime + 0.1;
  const startAt = game.countIn ? beginCountIn(now, ts, unitSeconds) : now;

  let totalDuration = startAt - now;
  game.target.forEach((note) => {
    const type = noteType(note.typeId);
    const duration = type.units * unitSeconds;
    const t = startAt + note.startUnit * unitSeconds;
    if (!type.isRest) scheduleTone(t, duration * 0.92);
    totalDuration = Math.max(totalDuration, t - now + duration);
  });
  if (game.metronome) {
    for (let u = 0; u < ts.units; u += ts.clickInterval) scheduleClick(startAt + u * unitSeconds);
  }

  activeTimeouts.push(
    setTimeout(() => {
      isPlayingTarget = false;
      listenBtn.disabled = false;
    }, (totalDuration + 0.15) * 1000)
  );
}

/* ============================================================
   Spielablauf
   ============================================================ */

const roundDotsEl = document.getElementById('roundDots');
const feedbackEl = document.getElementById('feedback');
const listenBtn = document.getElementById('listenBtn');
const checkBtn = document.getElementById('checkBtn');
const tempoButtonsEl = document.getElementById('tempoButtons');

function renderProgressHeader() {
  pointsLabel.textContent = `⭐ ${game.points} Punkte`;
  roundDotsEl.innerHTML = Array.from({ length: ROUNDS_PER_LEVEL }, (_, i) => {
    const cls = i < game.roundInLevel ? 'round-dot is-done' : 'round-dot';
    return `<span class="${cls}"></span>`;
  }).join('');
}

function renderTempoButtons() {
  tempoButtonsEl.innerHTML = '';
  TEMPO_OPTIONS.forEach((tempo) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tempo-btn${tempo.id === game.tempoId ? ' is-selected' : ''}`;
    btn.textContent = tempo.bonus ? `${tempo.label} (+${tempo.bonus})` : tempo.label;
    btn.addEventListener('click', () => {
      game.tempoId = tempo.id;
      saveProgress();
      renderTempoButtons();
    });
    tempoButtonsEl.appendChild(btn);
  });
}

let roundToken = 0;

function scheduleNextStep(fn, delay) {
  const token = ++roundToken;
  activeTimeouts.push(
    setTimeout(() => {
      if (token === roundToken) fn();
    }, delay)
  );
}

function startRound() {
  roundToken += 1; // verwirft einen eventuell noch laufenden alten Timer
  game.attempt = [];
  game.attemptCount = 0;
  game.target = generateTargetRhythm(currentLevel());
  feedbackEl.hidden = true;
  renderProgressHeader();
  renderTempoButtons();
  renderPalette();
  renderMeasure();
  // Beim Rundenstart automatisch einmal vorspielen, damit sofort klar ist,
  // worum es geht - danach jederzeit per "Nochmal anhören" wiederholbar.
  ensureAudioContext();
  playTargetRhythm();
}

function checkAttempt(target, attempt) {
  if (attempt.length !== target.length) return false;
  const sortedTarget = target.slice().sort((a, b) => a.startUnit - b.startUnit);
  const sortedAttempt = attempt.slice().sort((a, b) => a.startUnit - b.startUnit);
  return sortedTarget.every((t, i) => t.typeId === sortedAttempt[i].typeId && t.startUnit === sortedAttempt[i].startUnit);
}

function showFeedback(kind, text) {
  feedbackEl.hidden = false;
  feedbackEl.className = `feedback feedback-${kind}`;
  feedbackEl.textContent = text;
}

function onCheck() {
  game.attemptCount += 1;
  const correct = checkAttempt(game.target, game.attempt);

  if (!correct) {
    playTryAgainSound();
    showFeedback('wrong', 'Das war noch nicht ganz richtig - hör nochmal genau hin!');
    return;
  }

  const tempo = currentTempo();
  const firstTryBonus = game.attemptCount === 1 ? FIRST_TRY_BONUS : 0;
  const earned = POINTS_PER_ROUND + firstTryBonus + tempo.bonus;
  game.points += earned;
  game.roundInLevel += 1;

  const parts = [`+${POINTS_PER_ROUND}`];
  if (firstTryBonus) parts.push(`+${firstTryBonus} (1. Versuch)`);
  if (tempo.bonus) parts.push(`+${tempo.bonus} (${tempo.label.replace(/^\S+\s/, '')}-Tempo)`);
  playSuccessSound();

  if (game.roundInLevel >= ROUNDS_PER_LEVEL) {
    game.completedLevelIds.add(currentLevel().id);
    saveProgress();
    showFeedback('correct', `Level geschafft! ${parts.join(' ')} Punkte 🎉`);
    scheduleNextStep(backToLevelSelect, 2400);
    return;
  }

  saveProgress();
  showFeedback('correct', `Richtig! ${parts.join(' ')} Punkte`);
  scheduleNextStep(startRound, 1800);
}

/* ============================================================
   Toolbar / Einstellungen
   ============================================================ */

listenBtn.addEventListener('click', playTargetRhythm);
checkBtn.addEventListener('click', onCheck);
backToSelectBtn.addEventListener('click', backToLevelSelect);

const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const noteVolumeSlider = document.getElementById('noteVolumeSlider');
const noteVolumeValue = document.getElementById('noteVolumeValue');
const metronomeToggle = document.getElementById('metronomeToggle');
const countInToggle = document.getElementById('countInToggle');
const resetProgressBtn = document.getElementById('resetProgressBtn');

settingsToggle.addEventListener('click', () => {
  const willOpen = settingsPanel.hidden;
  settingsPanel.hidden = !willOpen;
  settingsToggle.setAttribute('aria-expanded', String(willOpen));
});

document.addEventListener('pointerdown', (e) => {
  if (settingsPanel.hidden) return;
  if (settingsPanel.contains(e.target) || e.target === settingsToggle) return;
  settingsPanel.hidden = true;
  settingsToggle.setAttribute('aria-expanded', 'false');
});

noteVolumeSlider.addEventListener('input', () => {
  game.noteVolume = Number(noteVolumeSlider.value) / 100;
  noteVolumeValue.textContent = noteVolumeSlider.value;
  if (noteMasterGain) {
    noteMasterGain.gain.setTargetAtTime(game.noteVolume, audioCtx.currentTime, 0.01);
    clickMasterGain.gain.setTargetAtTime(game.noteVolume, audioCtx.currentTime, 0.01);
  }
});

metronomeToggle.addEventListener('change', () => {
  game.metronome = metronomeToggle.checked;
  saveProgress();
});

countInToggle.addEventListener('change', () => {
  game.countIn = countInToggle.checked;
  saveProgress();
});

// Escape-Hatch für den Fall, dass mehrere Kinder sich ein Tablet teilen und
// der gespeicherte Fortschritt nicht zum aktuellen Kind passt.
resetProgressBtn.addEventListener('click', () => {
  game.points = 0;
  game.completedLevelIds = new Set();
  saveProgress();
  settingsPanel.hidden = true;
  settingsToggle.setAttribute('aria-expanded', 'false');
  backToLevelSelect();
});

/* ============================================================
   Init
   ============================================================ */

const restored = loadProgress();
game.points = restored.points;
game.completedLevelIds = new Set(restored.completedLevelIds);
game.metronome = restored.metronome;
game.countIn = restored.countIn;
game.tempoId = restored.tempoId;
metronomeToggle.checked = game.metronome;
countInToggle.checked = game.countIn;
renderApp();
