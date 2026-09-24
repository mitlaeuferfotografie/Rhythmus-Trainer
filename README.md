# Rhythmus-Trainer

Interaktives Hör-Übungsspiel für die digitale Tafel/Tablets: Die App spielt
einen Rhythmus vor, das Kind baut ihn per Drag & Drop nach und bekommt sofort
Rückmeldung, ob es stimmt.

Eigenständiges Gegenstück zum [Rhythmus-Generator](../Rhythmus-Generator-App):
Der Generator ist ein offenes, freies Werkzeug zum Bauen eigener Rhythmen
ohne Bewertung. Der Rhythmus-Trainer trainiert gezielt die andere Seite -
genaues Hinhören und das Gehörte korrekt in Notenwerte übersetzen - mit
Punkten und Levels als Motivation.

## Spielprinzip

- Eine Level-Übersicht (einfach bis richtig knifflig) lässt Kinder selbst
  wählen, welches Level sie üben wollen - kein Freischalten, keine feste
  Reihenfolge. Ein grüner Haken markiert Level, die schon einmal komplett
  (10/10 Runden) gelöst wurden.
- Die App spielt einen Ziel-Rhythmus vor (🔊 Rhythmus anhören) - wahlweise
  🐢 Langsam, 🚶 Mittel oder 🐇 Schnell (Differenzierung). Beliebig oft
  wiederholbar, ohne dass das negativ zählt - genaues, wiederholtes Hinhören
  ist gewünschtes Lernverhalten, keine Schwäche. Ein Einzähler und ein
  Grundschlag-Klick (beide in den Einstellungen einzeln abschaltbar) helfen,
  ins Tempo zu kommen.
- Das Kind zieht Noten-/Pausenkarten (getrennt nach Noten/Pausen, wie im
  Rhythmus-Generator) aus der Palette in das Taktraster, bis es meint, den
  Rhythmus getroffen zu haben. Ein Takt kann nicht "übervoll" gezogen werden.
  Während des Vorspielens läuft ein Zeigebalken über den Takt (nach einem
  etwaigen Einzähler) - zusätzliches visuelles Feedback dazu, wo man sich
  gerade befindet.
- "✓ Fertig / Prüfen" vergleicht jede Note/Pause EINZELN mit dem Ziel:
  richtig platzierte bleiben stehen (grüner Rahmen), falsche fliegen animiert
  aus dem Raster - man baut nur den Rest weiter, statt neu anzufangen. Bei
  Pausen zählt nur die Gesamtlänge, nicht die genaue Aufteilung (z.B. zwei
  Achtelpausen statt einer Viertelpause sind auch richtig); klingende Noten
  müssen exakt stimmen. Nach jedem Fehlversuch wird der Rhythmus automatisch
  (inkl. Einzähler) noch einmal vorgespielt. Punkte gibt es als kurzes,
  animiertes Overlay statt einer langen Text-Erklärung. Nach 5 Fehlversuchen
  in einer Runde wird die Lösung automatisch angezeigt und vorgespielt, damit
  niemand frustriert hängen bleibt (diese Runde zählt dann nicht als gelöst).
  Ist die Runde dagegen richtig, wird der jetzt korrekt im Raster stehende
  Rhythmus zur Bestätigung noch einmal abgespielt ("so klingt er richtig!")
  - bewusst OHNE Einzähler, da es hier nur um die kurze auditive
  Bestätigung geht, nicht um erneutes Vorspielen/Merken.
- Nach 10 richtig gelösten Runden ist das Level geschafft, und es geht
  zurück zur Level-Übersicht.

## Level

Jedes Level mischt von Anfang an mehrere Notenwerte (nie nur einen
einzigen) - je schwerer, desto mehr verschiedene Notenwerte/Pausen und desto
mehr kürzere Notenwerte (mehr einzelne Klangereignisse pro Takt):

1. Viertel & Halbe (4/4)
2. Mit Achteln (4/4)
3. Erste Pausen (4/4)
4. Ganze Noten dazu (4/4)
5. Alles gemischt (4/4)
6. Zwei Takte (Profi) - wie Level 5, aber ZWEI aufeinanderfolgende 4/4-Takte
   (16 statt 8 Achtel-Einheiten) statt eines einzelnen Takts - Kinder müssen
   sich eine längere Phrase merken und richtig heraushören/nachbauen, statt
   nur eine ungewohnte Taktart zu üben. Jeder der beiden Takte wird bei der
   Erzeugung unabhängig lückenlos gefüllt (siehe `fillMeasure` in
   `script.js`), keine Note reicht über die Taktgrenze (den dick markierten
   Strich in der Mitte) hinweg.

6/8-Takt ist (wie in der Konzeptnotiz als optionale spätere Erweiterung
markiert) noch nicht enthalten.

## Tempo-Bonus

Richtige Lösung bei 🚶 Mittel: +5 Bonus. Bei 🐇 Schnell: +10 Bonus. 🐢 Langsam
gibt keinen Tempo-Bonus (dafür aber auch keinen Nachteil) - so bleibt Langsam
eine echte, unbestrafte Übungsoption für Kinder, die mehr Zeit brauchen.

## Bewusste Entscheidungen zu offenen Punkten der Konzeptnotiz

- **Punktestand/Level-Fortschritt**: wird per `localStorage` gesichert
  (Gesamtpunkte + welche Level schon komplett gelöst wurden, kein
  Nutzerkonto, keine Cloud) - sonst würde jedes Kind bei jedem Tabletwechsel
  wieder von null anfangen. Ein "Fortschritt zurücksetzen"-Knopf in den
  Einstellungen dient als Escape-Hatch, falls sich mehrere Kinder ein Tablet
  teilen.
- **Anzahl Schwierigkeitsstufen**: 6 Level (in der Konzeptnotiz explizit als
  offen markiert). Damit lässt sich die Progression fein genug abstufen
  (Notenwert für Notenwert, dann Pausen, dann eine zweitaktige Phrase), ohne
  dass einzelne Level zu ähnlich wirken.
- **Punktesystem**: 10 Punkte pro richtiger Runde, +5 Bonus bei Lösung im
  ersten Versuch. Bewusst KEIN Punktabzug für falsche Versuche oder
  wiederholtes Anhören, um die "keine Bestrafung"-Linie der Notiz konsequent
  durchzuhalten.
- **Sound-Design**: "richtig" = kurzes, aufsteigendes Dur-Arpeggio; "falsch" =
  ein einzelner, weicher, tiefer Ton statt eines harten Fehler-Buzzers.
- **Optik**: seit dem Redesign vom 2026-09-24 dieselbe helle Slate-/Amber-
  Palette mit royalblauer Toolbar wie Rhythmus-Generator, Noten-Rätsel und
  die Musik-Apps-Übersicht (identische `:root`-Variablen, Systemschrift statt
  der ursprünglichen "Baloo 2") - bewusst NICHT mehr eigenständig gestaltet,
  damit der Übergang zwischen den Apps nahtlos wirkt. Sterne statt Punkten
  für den Rundenfortschritt sind das einzige noch app-spezifische Detail.
  Drag & Drop, Notenwerte-Icons und Grundlayout bleiben eng am
  Rhythmus-Generator angelehnt, damit sich beide Apps für Kinder vertraut
  anfühlen.
- **Header-Icon**: 👂 vor dem Titel (Ohr = Hör-Übung), oben rechts ein
  Zurück-Link zur Musik-Apps-Übersicht (`.toolbar-home-link`), Impressum
  als Menüpunkt in den Einstellungen (`.settings-legal-link`) - siehe
  [Musik-Apps/README.md](../Musik-Apps/README.md) für die verbindlichen
  Konventionen.

## Lokal starten

Kein Build-Schritt nötig, reines HTML/CSS/JS.

```bash
node serve.js
```

und dann `http://localhost:5179` öffnen - oder `index.html` direkt per
Doppelklick im Browser öffnen.

## Hosting über GitHub Pages

Wie beim Rhythmus-Generator: eigenständiges Repository, GitHub Pages
"Deploy from a branch", Branch `main`, Ordner `/ (root)`.

- Repository: https://github.com/mitlaeuferfotografie/Rhythmus-Trainer
- Live-URL: https://mitlaeuferfotografie.github.io/Rhythmus-Trainer/
- Kurzlink: https://kurzlinks.de/rhythmustrainer
