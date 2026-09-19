# Nectar — MVP prototyp

Pokojná platená sociálna sieť bez reklám a bez algoritmu.
Primárne **1:1 messenger**, sekundárne chronologický feed s kruhmi (Rodina / Priatelia / Práca).

Toto je **statický klikateľný prototyp** (HTML + CSS + JS). Žiadny backend, žiadne reálne platby.

## Živá verzia (GitHub Pages)

Live URL: **https://offthewallhack.github.io/nectar/**

GitHub Pages nasadzuje tento repozitár z vetvy `main`, priečinok `/` (koreň).

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

## Dizajn

Inšpirácia: starý Instagram + starý Twitter (cca 2005–2015). Mobil-first, max-width ~420 px.
Viditeľný text je v **slovenčine**. Wireframe: `WIREFRAME.md`.

## Čo nie je v MVP

Stories, reels, hlasovky, skupinové chaty, odznaky, lokalita/events, algoritmus, reklamy.
