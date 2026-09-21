# Nectar — MVP prototyp

Pokojná platená sociálna sieť bez reklám a bez algoritmu.
Primárne **1:1 messenger**, sekundárne chronologický feed s kruhmi (Rodina / Priatelia / Práca),
plus **spoločné priestory**, **kresba dňa** a **odznaky** za skutočné veci.

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
| `feed.html` | Chronologický feed, filtre kruhov, pripnutý príspevok, značka „Tu si skončil“ |
| `messages.html` | Zoznam 1:1 konverzácií (najnovšie hore) |
| `conversation.html` | Chat — denné oddeľovače, zoskupené bubliny, indikátor písania |
| `activity.html` | Aktivita zoskupená po dňoch (lajky, správy, odznaky, priestory) |
| `compose.html` | Nový príspevok v 3 krokoch so živou ukážkou |
| `draw.html` | **Kresba dňa** — denná výzva, galéria, 1 hlas na deň |
| `spaces.html` | **Spoločné priestory** — výlety, projekty, iniciatívy |
| `space.html` | Časová os priestoru — fotky, poznámky, plány, poloha |
| `profile.html` | Profil s obálkou, odznakmi, počtom návštev a QR pozvánkou |
| `friends.html` | Ľudia s tagmi kruhov (človek môže byť vo viacerých) |
| `settings.html` | Účet, predplatné, pokoj, súkromie, motív, odhlásenie |

Spodná navigácia: **Feed · Správy · Pridať · Priestory · Profil**.
Kresba dňa je dostupná z horného panela vo feede a z kariet vo feede.

## Demo prihlásenie

Na landing stránke klikni **Prihlásiť sa** — predvyplnené údaje stačí potvrdiť.
Alebo **Vytvoriť účet** → mock platba → vstup do aplikácie.

Stav (session, lajky, nové príspevky, správy, priestory, hlasy, motív) sa ukladá
do `localStorage` prehliadača. V **Nastaveniach → Obnoviť ukážkové dáta** sa dá všetko vrátiť späť.

## Funkcie

### Feed
- Prísne chronologicky — žiadny algoritmus, žiadny platený dosah.
- **Jeden pripnutý príspevok** naraz (ikona špendlíka na karte).
- **Dvojklik / dvojité klepnutie na fotku** = lajk so srdiečkom.
- **„Tu si skončil“** — jemná čiara tam, kde si minule prestal čítať.
- **Koniec feedu** je skutočný koniec: žiadny nekonečný scroll.
- Fotky majú polaroid rámik a voliteľnú **ručne písanú poznámku**.

### Spoločné priestory
Súkromné zdieľané časové osi pre výlety, projekty a iniciatívy:
fotky s popiskami, poznámky, plány, **zdieľaná poloha na jedno klepnutie**
a spoločné úložisko **250 MB** na priestor.

### Kresba dňa
Denná výzva (napr. *„Nakresli miesto, kde si bol naposledy naozaj pokojný.“*),
galéria odfotených papierových kresieb a **jeden hlas na deň**.
Víťaz dostáva odznak **Kresba dňa**.

### Odznaky
Za skutočné veci — nie za čas v aplikácii. Napr. *Majster ligy 2024*,
*Pomocník mesta*, *Susedská záhrada*. Najväčší odznak sa zobrazuje pri mene,
pri veľkom úspechu aj ako **medový prstenec okolo profilovej fotky**.
Na profile je záložka **Odznaky** (získané aj nezískané).

### Pozvánka QR (vlastný profil)
Na **vlastnom** profile potiahni obrazovku dole (overscroll) — spodok hornej lišty sa rozvinie
a ukáže dočasný QR kód na pozvanie priateľa. Kód platí **2 minúty** a pri každom potiahnutí
vznikne nový token. Keď pustíš, panel sa pružne schová.

Na desktope potiahni za úchytku pod lištou („Potiahni dole pre QR“) alebo na ňu klepni.
Na cudzích profiloch sa gesto nezobrazuje.

## Dizajn

**Warm paper** — krémový papier, mäkký atrament, med / amber len na tlačidlách,
aktívnej navigácii, QR a odkazoch.

- Pozadie: teplý papier (`#f4ebdd`), nie čistá biela
- Text: teplá takmer-čierna (`#2b2419`)
- Akcent: nectar gold (`#c48932`) — šetrne
- Fotky: polaroid-lite okraj a jemný tieň
- Karty (feed, priestory, QR pozvánka) ako papier na stole
- Typografia: *Fraunces* (značka, nadpisy) + Source Sans 3 (UI) cez Google Fonts CDN

### Dva motívy
- **Denný papier** — predvolený krémový.
- **Večerný papier** — teplá, pri sviečke vyzerajúca tmavá varianta. Žiadna OLED čierna,
  žiadne studené modré tóny.

Motív sa prepína v **Nastaveniach → Vzhľad**, ukladá sa do `localStorage` a aplikuje sa
ešte pred vykreslením (`boot.js`), takže pri prechode medzi stránkami neprebliskne.
Pri prvom spustení sa riadi systémovým nastavením.

### Pohyb
Prechody medzi stránkami sú tlmené (fade), karty a zoznamy nabiehajú zhora,
obrázky sa prelínajú až po načítaní, lajk a hlas majú pružnú odozvu.
Všetko rešpektuje `prefers-reduced-motion: reduce`.

Nálada: pokojný starý Instagram / Twitter, nie neon, nie glassmorphism, nie fialové AI.

Viditeľný text je v **slovenčine**. Wireframe: `WIREFRAME.md`.

## Súbory

| Súbor | Účel |
|-------|------|
| `boot.js` | Nastaví motív ešte pred vykreslením (žiadny flash) |
| `app.js` | Ukážkové dáta, `localStorage` helpery, ikony, navigácia, prechody |
| `styles.css` | Celý dizajnový systém (tokeny, komponenty, oba motívy) |
| `invite-qr.js` | Gesto potiahnutia a generovanie dočasného QR kódu |
| `vendor/qrcode.js` | Knižnica na vykreslenie QR |

## Čo nie je v MVP

Stories, reels, hlasovky, skupinové chaty, algoritmus, reklamy, platený dosah.
Reálny backend, reálne platby a reálne zdieľanie polohy tiež nie — je to UI prototyp.
