# Nectar — MVP prototyp

Pokojná platená sociálna sieť bez reklám a bez algoritmu.
Primárne **1:1 messenger**, sekundárne chronologický feed s kruhmi (Rodina / Priatelia / Práca).

Toto je **statický klikateľný prototyp** (HTML + CSS + JS). Žiadny backend, žiadne reálne platby.

## Živá verzia (GitHub Pages)

Live URL: **https://offthewallhack.github.io/nectar/**

GitHub Pages nasadzuje tento repozitár z vetvy `main`, priečinok `/` (koreň).

Ak adresa ešte vracia 404, v GitHub stačí jeden klik:

**Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)` → Save**

## Ako otvoriť lokálne

### Možnosť A — priamo v prehliadači

Otvor súbor `index.html` v koreni tohto repozitára dvojklikom alebo pretiahnutím do prehliadača.

> Tip: niektoré funkcie (napr. `localStorage`, obrázky) fungujú spoľahlivejšie cez lokálny server — pozri možnosť B.

### Možnosť B — jednoduchý server (odporúčané)

```bash
python3 -m http.server 8080
```

Potom otvor v prehliadači: [http://localhost:8080](http://localhost:8080)

(Alebo akýkoľvek iný static server, napr. `npx serve`.)

## Obrazovky

| Súbor | Popis |
|-------|--------|
| `index.html` | Landing, registrácia / login, mock paywall (1 €) |
| `feed.html` | Chronologický feed + filtre kruhov |
| `messages.html` | Zoznam 1:1 konverzácií |
| `conversation.html` | Chat (odosielanie textu funguje v UI) |
| `activity.html` | Lajky a správy (zvonček) |
| `compose.html` | Nový príspevok |
| `profile.html` | Vlastný / cudzí profil |
| `friends.html` | Ľudia s tagmi kruhov + pozvánka |
| `settings.html` | Účet, predplatné, odhlásenie |

## Demo prihlásenie

Na landing stránke klikni **Prihlásiť sa** — predvyplnené údaje stačí potvrdiť.
Alebo **Vytvoriť účet** → mock platba → vstup do aplikácie.

Stav (session, lajky, nové príspevky, správy) sa ukladá do `localStorage` prehliadača.

## Pozvánka QR (vlastný profil)

Na **vlastnom** profile potiahni obrazovku dole (overscroll) — spodok hornej lišty sa rozvinie a ukáže dočasný QR kód na pozvanie priateľa. Kód platí **2 minúty** a pri každom potiahnutí vznikne nový token. Keď pustíš, panel sa pružne schová.

Na desktope potiahni za úchytku pod lištou („Potiahni dole pre QR“) alebo na ňu klepni. Na cudzích profiloch sa gesto nezobrazuje.

## Dizajn

**Warm paper** — krémový papier, mäkký atrament, med / amber len na tlačidlách, aktívnej navigácii, QR a odkazoch.

- Pozadie: teplý papier (`#f3eadc`), nie čistá biela
- Text: teplá takmer-čierna (`#2a241c`)
- Akcent: nectar gold (`#c48932`) — šetrne
- Fotky: polaroid-lite okraj a jemný tieň
- Karty (feed, QR pozvánka) ako papier na stole
- Typografia: *Fraunces* (značka „Nectar“) + Source Sans 3 (UI) cez Google Fonts CDN
- `color-scheme: light` — žiadny harsh dark mode

Nálada: pokojný starý Instagram / Twitter, nie neon, nie glassmorphism, nie fialové AI.

Viditeľný text je v **slovenčine**. Wireframe: `WIREFRAME.md`.

## Čo nie je v MVP

Stories, reels, hlasovky, skupinové chaty, odznaky, lokalita/events, algoritmus, reklamy.
