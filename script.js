'use strict';

/* ============================================================
   Notenwerte-Definitionen
   Einheit: 1 "unit" = eine Achtelnote (gleiche Konvention wie im
   Rhythmus-Generator, damit beide Apps inhaltlich zueinander passen).
   ============================================================ */

// clickInterval: Grundschlag-Klick auf jeder Viertel (alle 2 units) - gleiche
// Konvention wie im Rhythmus-Generator.
const TIME_SIGNATURES = {
  '4/4': { top: 4, bottom: 4, units: 8, labels: ['1', '+', '2', '+', '3', '+', '4', '+'], clickInterval: 2 },
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
   Klangereignisse pro Takt entstehen. Level 6 verlangt zusätzlich ZWEI
   aufeinanderfolgende 4/4-Takte statt nur einem (measureCount: 2) - jeder
   Takt wird bei der Erzeugung unabhängig lückenlos gefüllt, keine Note
   reicht über die Taktgrenze hinweg (siehe generateTargetRhythm). 6/8
   bewusst weiterhin nicht enthalten (siehe README.md).
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
    // Zwei 4/4-Takte statt eines ungewohnten 3/4-Takts (auf Nutzerwunsch) -
    // dieselben Notenwerte/Gewichte wie Level 5, aber als doppelt so lange
    // Phrase: Kinder müssen sich jetzt über zwei Takte hinweg merken und
    // richtig heraushören/nachbauen, statt nur eine andere Taktart zu üben.
    id: 6, title: 'Zwei Takte (Profi)', timeSignature: '4/4', measureCount: 2,
    allowedTypeIds: ['whole', 'wholeRest', 'half', 'halfRest', 'quarter', 'quarterRest', 'eighth', 'eighthRest'],
    unitWeights: { 1: 6, 2: 5, 4: 2, 8: 1 }, restChance: 0.3,
  },
];

const ROUNDS_PER_LEVEL = 10;
const POINTS_PER_ROUND = 10;
const FIRST_TRY_BONUS = 5;

// Nach 5 Fehlversuchen in derselben Runde wird die Lösung automatisch
// eingeblendet, damit Kinder nicht endlos frustriert weiterprobieren müssen -
// diese Runde zählt dann bewusst nicht als gelöst (keine Punkte, kein
// Fortschritt), es geht einfach mit einer neuen Höraufgabe weiter.
const MAX_WRONG_ATTEMPTS = 5;
const WRONG_NOTE_REMOVE_MS = 550; // muss zur CSS-Animationsdauer von .note-wrong-removing passen
const REVEAL_DISPLAY_MS = 3200;

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

const STORAGE_KEY = 'rhythmusTrainerFortschritt';

// Das Tempo wird bewusst NICHT gespeichert: Standard ist und bleibt immer
// "Mittel", jedes Mal wenn ein Level (neu) gestartet wird - unabhängig davon,
// was zuletzt gewählt war.
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { points: 0, completedLevelIds: [], metronome: true, countIn: true };
    const parsed = JSON.parse(raw);
    return {
      points: Math.max(0, Number(parsed.points) || 0),
      completedLevelIds: Array.isArray(parsed.completedLevelIds) ? parsed.completedLevelIds : [],
      metronome: parsed.metronome !== false,
      countIn: parsed.countIn !== false,
    };
  } catch (err) {
    return { points: 0, completedLevelIds: [], metronome: true, countIn: true };
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      points: game.points,
      completedLevelIds: Array.from(game.completedLevelIds),
      metronome: game.metronome,
      countIn: game.countIn,
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
  wrongAttempts: 0, // falsche Prüfungen in der AKTUELLEN Runde (löst nach MAX_WRONG_ATTEMPTS die Lösungsanzeige aus)
  target: [], // [{ id, typeId, startUnit }] - der vorgespielte Ziel-Rhythmus
  attempt: [], // dieselbe Form, vom Kind zusammengebaut
  lastTargetSignature: null, // verhindert, dass zwei Runden hintereinander zufällig identisch ausfallen
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

// Füllt EINEN Takt (units-Kapazität übergeben, nicht die des ganzen
// Levels) lückenlos von Anfang bis Ende: pro Schritt wird zuerst eine Dauer
// gewürfelt (gewichtet nach level.unitWeights, nur unter den Dauern, die im
// Level erlaubt UND im Rest-Platz noch unterbringbar sind), danach - falls
// für diese Dauer sowohl eine Note als auch eine Pause erlaubt sind - per
// level.restChance entschieden, ob es eine Pause wird. Jedes Level enthält
// bewusst immer auch die kleinste erlaubte Dauer, damit die Schleife nie in
// einem Rest festhängt, der zu keiner erlaubten Dauer passt.
function fillMeasure(level, capacity, offset) {
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

    notes.push({ id: uid('n'), typeId, startUnit: offset + position });
    position += units;
  }
  return notes;
}

// Bei measureCount > 1 (siehe Level 6) wird JEDER Takt für sich unabhängig
// lückenlos gefüllt (fillMeasure), statt einfach über die gesamte Länge
// hinweg zu füllen - sonst könnte eine Note über eine Taktgrenze hinweg
// reichen, was es in echter Notenschrift nicht gibt.
function generateTargetRhythm(level) {
  const perMeasureUnits = TIME_SIGNATURES[level.timeSignature].units;
  const measureCount = level.measureCount || 1;
  const notes = [];
  for (let m = 0; m < measureCount; m++) {
    notes.push(...fillMeasure(level, perMeasureUnits, m * perMeasureUnits));
  }
  return notes;
}

const targetSignature = (notes) => notes.map((n) => `${n.typeId}@${n.startUnit}`).join(',');

// Jede Höraufgabe ist per Zufall erzeugt (siehe generateTargetRhythm) - bei
// wenigen erlaubten Notenwerten (z.B. Level 1) ist der Ergebnisraum aber klein
// genug, dass zwei Runden hintereinander per Zufall gleich ausfallen könnten,
// was sich für Kinder wie "das ist ja gar nicht zufällig" anfühlt. Deshalb
// wird bei einem Treffer mit der UNMITTELBAR vorherigen Runde bis zu 8x neu
// gewürfelt (kein Blockieren bei winzigem Ergebnisraum: danach wird die letzte
// Ziehung einfach akzeptiert).
function generateFreshTargetRhythm(level) {
  let notes = generateTargetRhythm(level);
  let attempts = 0;
  while (targetSignature(notes) === game.lastTargetSignature && attempts < 8) {
    notes = generateTargetRhythm(level);
    attempts += 1;
  }
  game.lastTargetSignature = targetSignature(notes);
  return notes;
}

/* ============================================================
   Rendering: Bildschirm-Umschaltung (Level-Auswahl <-> Spiel)
   ============================================================ */

const levelSelectScreenEl = document.getElementById('levelSelectScreen');
const playScreenEl = document.getElementById('playScreen');
const backToSelectBtn = document.getElementById('backToSelectBtn');
const levelLabelEl = document.getElementById('levelLabel');
const pointsLabel = document.getElementById('pointsLabel');

function renderApp() {
  const inLevel = game.screen === 'play';
  levelSelectScreenEl.hidden = inLevel;
  playScreenEl.hidden = !inLevel;
  backToSelectBtn.hidden = !inLevel;
  checkBtn.hidden = !inLevel; // Einstellungen bleibt auf beiden Bildschirmen sichtbar, nur "Fertig/Prüfen" ist Level-spezifisch
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
      <span class="level-card-meter">${ts.top}/${ts.bottom}-Takt${level.measureCount > 1 ? ` × ${level.measureCount}` : ''}</span>
    `;
    card.addEventListener('click', () => startLevel(level.id));
    levelSelectGridEl.appendChild(card);
  });
}

function startLevel(levelId) {
  game.currentLevelId = levelId;
  game.screen = 'play';
  game.roundInLevel = 0;
  game.tempoId = 'mittel'; // Standard ist immer Mittel, unabhängig davon, was zuletzt gewählt war
  game.lastTargetSignature = null;
  renderApp();
  startRound();
}

function backToLevelSelect() {
  roundToken += 1; // verwirft jeden noch ausstehenden "nächste Runde"-Timer
  stopTargetPlayback(); // Audio/Einzähler/Cursor nicht in die Level-Auswahl hinüberlaufen lassen
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

// Gesamt-Kapazität der aktuellen Runde in units - bei measureCount > 1
// (Level 6) die Summe ALLER Takte, nicht nur eines einzelnen. Ersetzt die
// früheren direkten TIME_SIGNATURES[...].units-Aufrufe überall dort, wo es
// um die Platzierungs-/Prüf-/Render-Grenzen der gesamten Höraufgabe geht.
function currentCapacity() {
  const level = currentLevel();
  return TIME_SIGNATURES[level.timeSignature].units * (level.measureCount || 1);
}

function measureExtent() {
  return game.attempt.reduce((max, n) => Math.max(max, n.startUnit + noteType(n.typeId).units), 0);
}

function measureUnits() {
  return game.attempt.reduce((sum, n) => sum + noteType(n.typeId).units, 0);
}

function measureStatus() {
  const capacity = currentCapacity();
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
  const measureCount = level.measureCount || 1;
  const capacity = currentCapacity();
  const status = measureStatus();

  const wrap = document.createElement('div');
  wrap.className = `measure status-${status}`;

  const header = document.createElement('div');
  header.className = 'measure-header';
  const titleSuffix = measureCount > 1 ? ` × ${measureCount} Takte` : '';
  header.innerHTML = `<span class="measure-title">Dein Rhythmus (${ts.top}/${ts.bottom}${titleSuffix})</span>`;

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

  // Striche in jedem clickInterval-Abstand über die GESAMTE Kapazität
  // (nicht nur einen Takt) - an jeder Taktgrenze (Vielfaches von ts.units,
  // außer bei 0) dick/dunkel wie eine echte Taktstrich-Linie, dazwischen
  // die üblichen dünnen Zählzeiten-Striche.
  for (let unitPos = 0; unitPos <= capacity; unitPos += ts.clickInterval) {
    const isBarline = unitPos > 0 && unitPos % ts.units === 0;
    const tick = document.createElement('div');
    tick.className = 'beat-tick';
    tick.style.left = `${unitsToPercent(unitPos, capacity)}%`;
    tick.style.width = isBarline ? '3px' : '1px';
    tick.style.background = isBarline ? '#8a8a8a' : '#dedad0';
    track.appendChild(tick);
  }

  renderMeasureNotes(track);

  // Laufender Zeigebalken, der beim Vorspielen des Ziel-Rhythmus über den
  // Takt wandert - gleiche Idee wie im Rhythmus-Generator, hier aber nur
  // während der eigentlichen (Nach-Einzähler-)Wiedergabe aktiv, siehe
  // startCursorLoop/tickCursor.
  const playhead = document.createElement('div');
  playhead.className = 'playhead';
  track.appendChild(playhead);

  const warning = document.createElement('div');
  warning.className = 'measure-warning';
  warning.hidden = true;
  warning.innerHTML = '<span></span>';
  track.appendChild(warning);

  // Bei mehreren Takten wiederholt sich das Zählmuster (1 + 2 + 3 + 4 +)
  // je Takt von neuem, statt einmal lang bis zum Ende hochzuzählen.
  const allLabels = Array.from({ length: measureCount }, () => ts.labels).flat();
  const beatLabels = document.createElement('div');
  beatLabels.className = 'beat-labels';
  beatLabels.style.gridTemplateColumns = `repeat(${allLabels.length}, 1fr)`;
  beatLabels.innerHTML = allLabels.map((l) => `<span>${l}</span>`).join('');

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
  const capacity = currentCapacity();
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

// "confirmed" (nach einer Prüfung als richtig erkannt) bzw. "revealed" (nach
// 5 Fehlversuchen automatisch eingeblendet) werden direkt auf dem Noten-
// Objekt in game.attempt gespeichert (siehe onCheck) - dadurch bleibt die
// grüne/blaue Markierung auch über weitere Renders hinweg erhalten, bis die
// Runde neu startet.
function noteStatusClass(note) {
  if (note.confirmed) return ' note-correct';
  if (note.revealed) return ' note-revealed';
  return '';
}

function renderPlacedNote(note, type, capacity, startUnit) {
  const el = document.createElement('div');
  el.className = `placed-note${noteStatusClass(note)}`;
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
    <div class="eighth-half${noteStatusClass(noteA)}" data-note-id="${noteA.id}"><span class="icon">${beamedIcon}</span><button class="delete-btn delete-btn-left" title="Entfernen">×</button></div>
    <div class="eighth-half${noteStatusClass(noteB)}" data-note-id="${noteB.id}"><span class="icon">${beamedIcon}</span><button class="delete-btn" title="Entfernen">×</button></div>
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
  const capacity = currentCapacity();
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

  const capacity = currentCapacity();
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
    const capacity = currentCapacity();
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
        // Eine "richtig"/"aufgedeckt"-Markierung gilt nur für die Stelle, an
        // der sie vergeben wurde - wird die Note woandershin verschoben,
        // muss sie erst wieder neu geprüft werden, sonst zeigt sie
        // fälschlich einen grünen/blauen Rahmen an einer ungeprüften Stelle.
        if (note.startUnit !== targetUnit) {
          delete note.confirmed;
          delete note.revealed;
        }
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
      startCursorLoop();
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

// Laufender Zeigebalken während der eigentlichen Rhythmus-Wiedergabe (NACH
// einem etwaigen Einzähler) - zusätzliches visuelles Feedback dazu, WANN im
// Takt man sich gerade befindet, analog zum Playhead im Rhythmus-Generator.
// Bewusst eine eigene, einfache einmalige Sequenz statt eines Live-
// Schedulers wie dort, weil der Ziel-Rhythmus hier fix ist und nicht
// während des Abspielens bearbeitet werden kann.
let cursor = null; // { rhythmStartTime, rhythmEndTime }
let cursorRAF = null;

function startCursorLoop() {
  if (!cursor) return;
  cursorRAF = requestAnimationFrame(tickCursor);
}

function tickCursor() {
  if (!cursor) return;
  const now = audioCtx.currentTime;
  if (now >= cursor.rhythmEndTime) {
    stopCursorLoop();
    return;
  }
  // Jeden Frame frisch abfragen statt eine Referenz zu behalten - das
  // Raster kann währenddessen neu gerendert worden sein (z.B. durch
  // Ziehen einer Note oder nach einem Prüfen-Versuch).
  const playhead = document.querySelector('.playhead');
  if (playhead) {
    const pct = ((now - cursor.rhythmStartTime) / (cursor.rhythmEndTime - cursor.rhythmStartTime)) * 100;
    playhead.style.left = `${Math.max(0, Math.min(100, pct))}%`;
    playhead.classList.add('active');
  }
  cursorRAF = requestAnimationFrame(tickCursor);
}

function stopCursorLoop() {
  if (cursorRAF) cancelAnimationFrame(cursorRAF);
  cursorRAF = null;
  document.querySelectorAll('.playhead.active').forEach((p) => p.classList.remove('active'));
  cursor = null;
}

let isPlayingTarget = false;
let playbackResetTimeout = null; // der EINE Timer, der isPlayingTarget zurücksetzt - siehe stopTargetPlayback

// Beendet eine noch laufende Wiedergabe sofort und hart (Oszillatoren, Klick-
// Timer, Einzähler, Cursor, Debounce-Flag). Wird vor jedem AUTOMATISCHEN
// Neustart der Wiedergabe aufgerufen (neue Runde, erneutes Vorspielen nach
// einem Fehlversuch) - ohne das könnte z.B. ein schneller Kind, das die
// Aufgabe löst, bevor die ursprüngliche Vorspiel-Wiedergabe fertig ist, dazu
// führen, dass isPlayingTarget noch "true" ist und die nächste Runde
// dadurch stumm bleibt (die Debounce-Prüfung in playTargetRhythm würde den
// Aufruf sonst einfach verwerfen). Die manuelle "Rhythmus anhören"-Taste
// bleibt bewusst über die normale Debounce-Prüfung geschützt (kein hartes
// Stoppen bei jedem Klick), damit Doppelklicks nicht zwei überlappende
// Wiedergaben gleichzeitig starten.
function stopTargetPlayback() {
  if (playbackResetTimeout) {
    clearTimeout(playbackResetTimeout);
    playbackResetTimeout = null;
  }
  activeOscillators.forEach((osc) => {
    try {
      osc.stop();
    } catch (err) {
      /* bereits gestoppt */
    }
  });
  activeOscillators = [];
  endCountIn();
  stopCursorLoop();
  isPlayingTarget = false;
  listenBtn.disabled = false;
}

// `skipCountIn`: für die auditive Bestätigung nach einem RICHTIG gelösten
// Rhythmus (siehe onCheck) - dort geht es nicht mehr um Vorspielen/Merken,
// sondern nur noch darum, kurz zu hören, dass das gerade Gebaute richtig
// klingt. Ein erneuter Einzähler wäre dafür nur eine unnötige Verzögerung.
function playTargetRhythm(skipCountIn = false) {
  if (isPlayingTarget) return; // sanftes Debounce, keine Bestrafung - verhindert nur überlappende Wiedergaben
  ensureAudioContext();
  isPlayingTarget = true;
  listenBtn.disabled = true;

  const ts = TIME_SIGNATURES[currentLevel().timeSignature];
  const unitSeconds = 60 / currentTempo().bpm / 2;
  const now = audioCtx.currentTime + 0.1;
  const useCountIn = game.countIn && !skipCountIn;
  const startAt = useCountIn ? beginCountIn(now, ts, unitSeconds) : now;

  // Der Ziel-Rhythmus füllt die gesamte Runde (bei measureCount > 1 also
  // ALLE Takte zusammen) immer lückenlos bis zum Ende (siehe
  // generateTargetRhythm) - der Zeigebalken darf deshalb einfach über die
  // volle Kapazität laufen, ohne die einzelnen Notenlängen aufsummieren zu
  // müssen.
  const capacity = currentCapacity();
  const rhythmEndTime = startAt + capacity * unitSeconds;
  cursor = { rhythmStartTime: startAt, rhythmEndTime };
  if (!useCountIn) startCursorLoop(); // mit Einzähler startet der Cursor erst, wenn der in tickCountIn zu Ende ist

  game.target.forEach((note) => {
    const type = noteType(note.typeId);
    const duration = type.units * unitSeconds;
    const t = startAt + note.startUnit * unitSeconds;
    if (!type.isRest) scheduleTone(t, duration * 0.92);
  });
  if (game.metronome) {
    for (let u = 0; u < capacity; u += ts.clickInterval) scheduleClick(startAt + u * unitSeconds);
  }

  const totalDuration = rhythmEndTime - now;
  playbackResetTimeout = setTimeout(() => {
    playbackResetTimeout = null;
    isPlayingTarget = false;
    listenBtn.disabled = false;
  }, (totalDuration + 0.15) * 1000);
  activeTimeouts.push(playbackResetTimeout);

  return totalDuration; // in Sekunden - z.B. für die Lösungsanzeige genutzt, um lange genug zu warten (siehe onCheck)
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
    return `<span class="${cls}">${i < game.roundInLevel ? '★' : '☆'}</span>`;
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
  stopTargetPlayback(); // falls die vorherige Runde beim Übergang noch nicht fertig abgespielt war
  game.attempt = [];
  game.attemptCount = 0;
  game.wrongAttempts = 0;
  game.target = generateFreshTargetRhythm(currentLevel());
  feedbackEl.hidden = true;
  checkBtn.disabled = false; // Gegenstück zur Sperre in onCheck() nach einer richtig gelösten Runde
  renderProgressHeader();
  renderTempoButtons();
  renderPalette();
  renderMeasure();
  // Beim Rundenstart automatisch einmal vorspielen, damit sofort klar ist,
  // worum es geht - danach jederzeit per "Nochmal anhören" wiederholbar.
  ensureAudioContext();
  playTargetRhythm();
}

// Baut ein Achtel-"unit"-Profil des Ziel-Rhythmus: jede Einheit trägt
// entweder die Kennung der klingenden Note, die sie überdeckt ("typeId@
// startUnit" - Notenwert UND Position müssen exakt stimmen), oder 'rest'.
// WICHTIG: Für Pausen wird bewusst NICHT zwischen Viertelpause/Achtelpause/…
// unterschieden, nur ob überhaupt Stille erwartet wird - dadurch ist es
// egal, ob eine Pausenlänge als eine große oder mehrere kleine Pausen
// notiert wird (z.B. 2 Achtelpausen statt 1 Viertelpause), solange die
// GESAMTE stille Fläche am Ende abgedeckt ist. Bei klingenden Noten bleibt
// es exakt, weil ein anderes Aufteilen dort den tatsächlichen Klang
// verändern würde (neuer Anschlag statt einer gehaltenen Note).
function buildTargetProfile(target, capacity) {
  const profile = new Array(capacity).fill('rest'); // der Ziel-Rhythmus ist immer lückenlos (siehe generateTargetRhythm)
  target.forEach((note) => {
    const type = noteType(note.typeId);
    if (type.isRest) return;
    for (let u = note.startUnit; u < note.startUnit + type.units; u++) profile[u] = `${note.typeId}@${note.startUnit}`;
  });
  return profile;
}

// Prüft, ob EINE Note/Pause des Versuchs an ihrer Stelle zum Ziel passt:
// bei einer Pause reicht es, dass jede ihrer Einheiten im Ziel-Profil
// ebenfalls "rest" ist (unabhängig von der genauen Pausenlänge dort); bei
// einer klingenden Note müssen alle ihre Einheiten exakt zu IHRER EIGENEN
// Kennung im Profil passen (Notenwert und Position identisch).
function noteMatchesProfile(note, profile, capacity) {
  const type = noteType(note.typeId);
  const ownTag = `${note.typeId}@${note.startUnit}`;
  for (let u = note.startUnit; u < note.startUnit + type.units; u++) {
    if (u >= capacity) return false;
    const wanted = profile[u];
    if (type.isRest ? wanted !== 'rest' : wanted !== ownTag) return false;
  }
  return true;
}

function checkAttempt(target, attempt) {
  const capacity = currentCapacity();
  const profile = buildTargetProfile(target, capacity);
  // Muss den Takt komplett (lückenlos) ausfüllen - sonst könnten unausgefüllte
  // Lücken, die zufällig auf eine Pausen-Stelle des Ziels fallen, fälschlich
  // als "schon richtig" durchgehen, obwohl dort gar keine Pause liegt.
  const attemptUnits = attempt.reduce((sum, n) => sum + noteType(n.typeId).units, 0);
  if (attemptUnits !== capacity) return false;
  return attempt.every((note) => noteMatchesProfile(note, profile, capacity));
}

// Baut die fehlenden Noten für die automatische Lösungsanzeige (nach 5
// Fehlversuchen) - NICHT einfach "alle Ziel-Noten, deren startUnit nicht
// unter den bestätigten liegt", denn seit Pausen flexibel aufgeteilt werden
// dürfen (siehe buildTargetProfile) kann eine bestätigte Pause im Versuch
// nur einen TEIL einer einzelnen Ziel-Pause abdecken - ihre startUnit würde
// dann fälschlich die GANZE Ziel-Pause als "schon da" ausschließen und eine
// Lücke im Takt hinterlassen. Stattdessen wird pro Achtel-Einheit geprüft,
// ob sie bereits abgedeckt ist, und der Rest lückenlos aufgefüllt.
function buildRevealNotes(correctNotes) {
  const capacity = currentCapacity();
  const covered = new Array(capacity).fill(false);
  correctNotes.forEach((note) => {
    const type = noteType(note.typeId);
    for (let u = note.startUnit; u < note.startUnit + type.units; u++) covered[u] = true;
  });

  const revealedNotes = [];
  // Klingende Ziel-Noten sind laut noteMatchesProfile entweder komplett
  // bestätigt oder gar nicht (eine andere Aufteilung würde dort nie als
  // richtig durchgehen) - unbestätigte werden 1:1 übernommen.
  game.target.forEach((note) => {
    const type = noteType(note.typeId);
    if (type.isRest || covered[note.startUnit]) return;
    revealedNotes.push({ ...note, revealed: true });
    for (let u = note.startUnit; u < note.startUnit + type.units; u++) covered[u] = true;
  });

  // Restliche (noch unbedeckte) Einheiten müssen laut obiger Schleife
  // Pausen sein - lückenlos mit der jeweils größten passenden Pausenkarte
  // auffüllen (die genaue Aufteilung ist bei Pausen ja ohnehin egal). Die
  // Größe muss sich am Ende der AKTUELLEN Lücke (runEnd) orientieren, nicht
  // am Taktende - sonst könnte eine zu große Pausenkarte über eine bereits
  // abgedeckte Einheit hinausragen und sie überlappen.
  const restTypesDesc = [8, 4, 2, 1].map((units) => NOTE_TYPES.find((t) => t.isRest && t.units === units));
  let u = 0;
  while (u < capacity) {
    if (covered[u]) { u += 1; continue; }
    let runEnd = u;
    while (runEnd < capacity && !covered[runEnd]) runEnd += 1;
    let pos = u;
    while (pos < runEnd) {
      const remaining = runEnd - pos;
      const restType = restTypesDesc.find((t) => t.units <= remaining);
      revealedNotes.push({ id: uid('n'), typeId: restType.id, startUnit: pos, revealed: true });
      pos += restType.units;
    }
    u = runEnd;
  }
  return revealedNotes;
}

// Vergleicht jede Note/Pause EINZELN mit dem Ziel-Profil (statt nur "ganz
// richtig oder ganz falsch") - was an seiner Stelle passt, gilt als
// "richtig" (bleibt stehen), der Rest gilt als "falsch" (wird entfernt).
function partitionAttempt(target, attempt) {
  const capacity = currentCapacity();
  const profile = buildTargetProfile(target, capacity);
  const correctNotes = [];
  const wrongNotes = [];
  attempt.forEach((note) => {
    (noteMatchesProfile(note, profile, capacity) ? correctNotes : wrongNotes).push(note);
  });
  return { correctNotes, wrongNotes };
}

function showFeedback(kind, text) {
  feedbackEl.hidden = false;
  feedbackEl.className = `feedback feedback-${kind}`;
  feedbackEl.textContent = text;
}

// Kurze, abwechslungsreiche Lob-Sätze statt einer langen Punkte-Aufschlüsselung
// im Text - die Punkte selbst zeigt stattdessen das kurze Overlay (siehe
// showPointsPopup), das ist deutlich schneller erfassbar für Kinder.
const CORRECT_PHRASES = ['Richtig! 🎉', 'Super gemacht! 🌟', 'Klasse gehört! 🎵', 'Genau getroffen! 👏'];

const pointsPopupEl = document.getElementById('pointsPopup');
let pointsPopupTimeout = null;

function showPointsPopup(points) {
  pointsPopupEl.querySelector('.points-popup-value').textContent = `+${points}`;
  pointsPopupEl.hidden = false;
  pointsPopupEl.classList.remove('is-animating');
  void pointsPopupEl.offsetWidth; // Reflow erzwingen, damit die Animation bei jedem Aufruf neu startet
  pointsPopupEl.classList.add('is-animating');
  clearTimeout(pointsPopupTimeout);
  pointsPopupTimeout = setTimeout(() => {
    pointsPopupEl.hidden = true;
  }, 1400);
}

// Markiert die im DOM bereits vorhandenen Elemente der übergebenen Noten mit
// einer CSS-Klasse - für die "richtig"-Markierung (grüner Rahmen) und die
// "wird entfernt"-Animation, BEVOR game.attempt verändert und neu gerendert
// wird (sonst gäbe es nichts, das man noch animieren könnte).
function markNoteElements(notes, className) {
  notes.forEach((note) => {
    document.querySelectorAll(`[data-note-id="${note.id}"]`).forEach((el) => el.classList.add(className));
  });
}

function onCheck() {
  game.attemptCount += 1;
  const correct = checkAttempt(game.target, game.attempt);

  if (!correct) {
    game.wrongAttempts += 1;
    playTryAgainSound();

    const { correctNotes, wrongNotes } = partitionAttempt(game.target, game.attempt);
    const revealSolution = game.wrongAttempts >= MAX_WRONG_ATTEMPTS;

    correctNotes.forEach((n) => { n.confirmed = true; });
    markNoteElements(correctNotes, 'note-correct');
    markNoteElements(wrongNotes, 'note-wrong-removing');

    if (revealSolution) {
      showFeedback('wrong', 'Kein Problem! So sieht und klingt der richtige Rhythmus - genau hinschauen und -hören. 🎵');
    } else if (wrongNotes.length > 0 && correctNotes.length > 0) {
      showFeedback('wrong', 'Fast! Die grün umrahmten Noten stimmen schon - der Rest ist weg, mach damit weiter.');
    } else if (wrongNotes.length > 0) {
      showFeedback('wrong', 'Das war noch nicht ganz richtig - hör nochmal genau hin!');
    } else {
      showFeedback('wrong', 'Die grün umrahmten Noten stimmen schon - da fehlt aber noch etwas!');
    }

    // Erst nach der kurzen "Hinausflug"-Animation wirklich aus dem Zustand
    // entfernen und neu rendern - sonst wäre die Note beim Rendern schon weg,
    // bevor die Animation überhaupt zu sehen war.
    scheduleNextStep(() => {
      if (revealSolution) {
        game.attempt = [...correctNotes, ...buildRevealNotes(correctNotes)];
        renderMeasure();
        stopTargetPlayback(); // vorherige Wiedergabe/Einzähler/Cursor hart beenden, bevor neu gestartet wird
        const audioSeconds = playTargetRhythm();
        // Ohne Punkte/Fortschritt zu einer neuen Höraufgabe weiter, damit
        // niemand an einer Aufgabe hängen bleibt - aber mindestens so lange
        // warten, wie die Wiedergabe (Einzähler + Rhythmus) tatsächlich
        // dauert, sonst würde sie bei langsamem Tempo/aktivem Einzähler
        // mitten im Vorspielen abgeschnitten.
        scheduleNextStep(startRound, Math.max(REVEAL_DISPLAY_MS, audioSeconds * 1000 + 500));
      } else {
        // Über die IDs herausfiltern statt game.attempt hart auf correctNotes
        // zu setzen - falls in der kurzen Animationszeit schon weitergebaut
        // wurde, bleibt eine neu hinzugefügte Note dadurch erhalten, statt
        // durch diese ältere Momentaufnahme überschrieben zu werden.
        const wrongIds = new Set(wrongNotes.map((n) => n.id));
        game.attempt = game.attempt.filter((n) => !wrongIds.has(n.id));
        renderMeasure();
        // Bei jedem Fehlversuch automatisch (inkl. Einzähler, falls aktiv)
        // noch einmal vorspielen - so hört man den Rhythmus nochmal, bevor
        // man mit dem Rest weitermacht, statt erst manuell auf "Rhythmus
        // anhören" tippen zu müssen.
        stopTargetPlayback();
        playTargetRhythm();
      }
    }, WRONG_NOTE_REMOVE_MS);
    return;
  }

  // "Prüfen" sofort sperren: game.attempt bleibt bis zum Rundenwechsel
  // unverändert stehen (nur die Anzeige spielt noch die Bestätigung ab) -
  // ohne diese Sperre würde ein erneuter Klick in dieser Wartezeit denselben,
  // weiterhin richtigen Versuch nochmal als neue Runde werten (Punkte +
  // Rundenfortschritt mehrfach für ein und denselben gebauten Rhythmus,
  // per schnellem Mehrfachklick ausnutzbar - in echten Klassen beobachtet).
  // Wird in startRound() für die jeweils nächste Runde wieder freigegeben.
  checkBtn.disabled = true;

  const tempo = currentTempo();
  const firstTryBonus = game.attemptCount === 1 ? FIRST_TRY_BONUS : 0;
  const earned = POINTS_PER_ROUND + firstTryBonus + tempo.bonus;
  game.points += earned;
  game.roundInLevel += 1;
  playSuccessSound();
  showPointsPopup(earned);

  // Zur Bestätigung: der jetzt richtig im Raster stehende Rhythmus wird
  // noch einmal abgespielt, bevor es weitergeht - "so klingt er richtig!".
  // Ohne Einzähler (skipCountIn), da es hier nur noch um die kurze
  // auditive Bestätigung geht, nicht um erneutes Vorspielen/Merken.
  // Gleiches Wartemuster wie bei der automatisch aufgedeckten Lösung oben:
  // erst hart stoppen (falls noch etwas läuft), dann mindestens so lange
  // warten, wie die Wiedergabe tatsächlich dauert.
  stopTargetPlayback();
  const audioSeconds = playTargetRhythm(true);

  if (game.roundInLevel >= ROUNDS_PER_LEVEL) {
    game.completedLevelIds.add(currentLevel().id);
    saveProgress();
    showFeedback('correct', 'Level geschafft! 🎉');
    scheduleNextStep(backToLevelSelect, Math.max(2400, audioSeconds * 1000 + 500));
    return;
  }

  saveProgress();
  showFeedback('correct', CORRECT_PHRASES[Math.floor(Math.random() * CORRECT_PHRASES.length)]);
  scheduleNextStep(startRound, Math.max(1800, audioSeconds * 1000 + 500));
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
metronomeToggle.checked = game.metronome;
countInToggle.checked = game.countIn;
renderApp();
