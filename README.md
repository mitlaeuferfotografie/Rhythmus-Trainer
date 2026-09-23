# Rhythmus-Rätsel

Interaktives Hör-Übungsspiel für die digitale Tafel/Tablets: Die App spielt
einen Rhythmus vor, das Kind baut ihn per Drag & Drop nach und bekommt sofort
Rückmeldung, ob es stimmt.

Eigenständiges Gegenstück zum [Rhythmus-Generator](../Rhythmus-Generator-App):
Der Generator ist ein offenes, freies Werkzeug zum Bauen eigener Rhythmen
ohne Bewertung. Das Rhythmus-Rätsel trainiert gezielt die andere Seite -
genaues Hinhören und das Gehörte korrekt in Notenwerte übersetzen - mit
Punkten und Levels als Motivation.

## Spielprinzip

- Die App spielt einen Ziel-Rhythmus als Klick-Ton vor (🔊 Rhythmus anhören).
  Beliebig oft wiederholbar (🔁), ohne dass das negativ zählt - genaues,
  wiederholtes Hinhören ist gewünschtes Lernverhalten, keine Schwäche.
- Das Kind zieht Noten-/Pausenkarten aus der Palette in das Taktraster, bis
  es meint, den Rhythmus getroffen zu haben. Ein Takt kann nicht "übervoll"
  gezogen werden (gleiches Verhalten wie im Rhythmus-Generator).
- "✓ Fertig / Prüfen" vergleicht die Lösung exakt mit dem Ziel-Rhythmus.
  Richtig: Punkte + freundliches Feedback, automatisch weiter zur nächsten
  Runde. Falsch: freundlicher Hinweis, beliebig viele neue Versuche möglich -
  keine Bestrafung, kein Abbruch.
- Nach 4 richtig gelösten Runden schaltet das nächste Level frei (Fortschritt
  wird als Punkte-Reihe oben im Level angezeigt).

## Level

1. Nur Viertelnoten (4/4)
2. Viertel + Achtelpaar (4/4)
3. + Halbe Note (4/4)
4. + Pausen (4/4)
5. Alle Notenwerte/Pausen gemischt (4/4)
6. Wie Level 5, aber im 3/4-Takt

6/8-Takt ist (wie in der Konzeptnotiz als optionale spätere Erweiterung
markiert) noch nicht enthalten.

## Bewusste Entscheidungen zu offenen Punkten der Konzeptnotiz

- **Punktestand/Level-Fortschritt**: wird per `localStorage` gesichert (Level
  + Gesamtpunkte, kein Nutzerkonto, keine Cloud) - sonst würde jedes Kind bei
  jedem Tabletwechsel wieder bei Level 1 starten. Ein "Fortschritt
  zurücksetzen"-Knopf in den Einstellungen dient als Escape-Hatch, falls sich
  mehrere Kinder ein Tablet teilen.
- **Punktesystem**: 10 Punkte pro richtiger Runde, +5 Bonus bei Lösung im
  ersten Versuch. Bewusst KEIN Punktabzug für falsche Versuche oder
  wiederholtes Anhören, um die "keine Bestrafung"-Linie der Notiz konsequent
  durchzuhalten.
- **Sound-Design**: "richtig" = kurzes, aufsteigendes Dur-Arpeggio; "falsch" =
  ein einzelner, weicher, tiefer Ton statt eines harten Fehler-Buzzers.
- **Optik**: gleiche visuelle Sprache wie der Rhythmus-Generator (Farben,
  Kartenform, Schrift) für Wiedererkennung, bewusst ohne Maskottchen.

## Lokal starten

Kein Build-Schritt nötig, reines HTML/CSS/JS.

```bash
node serve.js
```

und dann `http://localhost:5179` öffnen - oder `index.html` direkt per
Doppelklick im Browser öffnen.

## Hosting über GitHub Pages

Wie beim Rhythmus-Generator: eigenständiges Repository, GitHub Pages
"Deploy from a branch", Branch `main`, Ordner `/ (root)`. Folgt später,
sobald der erste Stand geprüft ist.
