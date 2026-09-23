# Übergabe: Rhythmus-Trainer (Web-App)

Dieses Dokument fasst den aktuellen Stand, die Architektur und alle
verbindlichen Konventionen der App zusammen, damit auch außerhalb von
Claude Code (z. B. in Cowork) nahtlos weitergearbeitet werden kann. Wird bei
jeder inhaltlichen Änderung aktuell gehalten (siehe CLAUDE.md).

## Kontext

Grundschullehrer (NRW), Musikschwerpunkt. Der Rhythmus-Trainer ist ein
Hör-Übungsspiel für den eigenen Musikunterricht (Klasse 3/4): Die App spielt
einen Rhythmus vor, das Kind baut ihn per Drag & Drop nach und bekommt
Feedback/Punkte. Eigenständiges Gegenstück zum
[Rhythmus-Generator](https://github.com/mitlaeuferfotografie/Rhythmus-Generator)
(freies Bau-Werkzeug ohne Bewertung, gleicher Autor/gleiche Zielgruppe).
Ursprüngliche Konzeptnotiz lag in
`C:\Users\BrandschP\Documents\ClaudeArbeitsordner\Musikunterricht\Konzeptnotiz_Rhythmus-Spiel_fuer_Code.md`.

## Stand: 2026-09-23

- Vollständig funktionsfähig, lokal mehrfach getestet, auf GitHub Pages
  veröffentlicht (siehe unten).
- Alle 6 Level, Level-Auswahl, Tempo-Bonus, Metronom/Einzähler,
  Teil-Feedback + Lösungsanzeige nach 5 Fehlversuchen, kindgerechtes
  Design: siehe README.md für die vollständige, aktuelle Funktionsliste.

## Repository / Deployment

- GitHub: `https://github.com/mitlaeuferfotografie/Rhythmus-Trainer`
  (Branch `main`, GitHub Pages "Deploy from a branch", Ordner `/ (root)`).
- Live-URL: `https://mitlaeuferfotografie.github.io/Rhythmus-Trainer/`
- Lokal: `node serve.js`, dann `http://localhost:5179`.

## Technik / Architektur

- Reines Vanilla HTML/CSS/JS, kein Build-Schritt, kein Framework, kein
  Backend - bewusst wie beim Rhythmus-Generator, für einfaches gemeinsames
  Hosting und Wartung ohne Tooling.
- Notenwerte-Modell: 1 "unit" = eine Achtelnote (gleiche Konvention wie im
  Rhythmus-Generator). Noten/Pausen als `{ id, typeId, startUnit }`.
- Vergleich Ziel- vs. Kind-Rhythmus läuft über ein Achtel-Einheiten-Profil
  (`buildTargetProfile`/`noteMatchesProfile` in script.js): klingende Noten
  müssen exakt (Wert + Position) stimmen, Pausen nur in der Gesamtlänge -
  die genaue Aufteilung (z. B. 2 Achtelpausen statt 1 Viertelpause) ist
  bewusst egal.
- Web Audio API: gleiche FM-Glocke + Klick-Synthese wie im
  Rhythmus-Generator (`scheduleTone`/`scheduleClick`). Da der Ziel-Rhythmus
  während der Wiedergabe nicht live bearbeitet wird, reicht hier eine
  einmalige feste Zeitplanung statt eines Live-Schedulers.
- `stopTargetPlayback()` beendet Wiedergabe/Einzähler/Cursor hart, bevor
  automatisch neu gestartet wird (Rundenwechsel, Fehlversuch-Nachspielen,
  Lösungsanzeige) - wichtig, um stumme/überlappende Wiedergabe bei schnellen
  Rundenübergängen zu vermeiden (siehe Audit-Commit in der Git-Historie).
- `localStorage` (Key `rhythmusTrainerFortschritt`) sichert Gesamtpunkte und
  welche Level komplett gelöst wurden - kein Nutzerkonto, keine Cloud.

## Verbindliche Konventionen

- Level/Spielprinzip-Beschreibung in README.md bei jeder Funktionsänderung
  aktuell halten (siehe CLAUDE.md) - ebenso dieses Übergabe-Dokument.
- Bewusste Design-Entscheidungen zu ursprünglich offenen Punkten der
  Konzeptnotiz stehen in README.md unter "Bewusste Entscheidungen..." -
  dort nachschauen statt Annahmen zu treffen, bevor neue Level-/Punkte-
  Mechaniken geändert werden.
- Visuelles Design ist bewusst eigenständig verspielt-kindgerecht (nicht
  identisch zum schlichteren Rhythmus-Generator) - Farbpalette/Schrift
  ("Baloo 2") in style.css als `:root`-Variablen, nicht hart codiert.

## Offene / mögliche nächste Schritte (nicht beauftragt, nur vorgemerkt)

- Kein QR-Code in den Einstellungen (anders als beim Rhythmus-Generator) -
  könnte bei Bedarf ergänzt werden, sobald die Live-URL feststeht.
- 6/8-Takt ist wie beim Rhythmus-Generator bewusst noch nicht enthalten.
