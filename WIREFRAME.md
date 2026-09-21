# Nectar — MVP wireframe (klikateľný webový prototyp)

## Produkt
Nectar je platená sociálna sieť bez reklám a bez algoritmu.
Primárne: 1:1 messenger (ľudia sem chodia kecávať).
Sekundárne: chronologický feed (fotky + krátky text) s kruhmi.
Predplatné ~1 € / mesiac. Žiadne stories, reels, hlasovky, skupinové chaty, odznaky, boost, algoritmus.

## Dizajn
**Warm paper:** krémový papier, mäkký atrament, honey/amber akcent šetrne.
Inšpirácia: starý Instagram + starý Twitter (cca 2005–2015), nie neon / glass / dark mode.
Mobil-first web (max-width ~420px centered na desktope), funguje aj v prehliadači.
UI copy: slovenčina.

## Spodná navigácia (4 položky, na app obrazovkách)
Feed · Správy · Pridať (+) · Profil

---

### 1. index.html — Vstup / platba
- Logo Nectar, jedna veta: „Pokojný priestor na rozhovory a fotky. Bez reklám. Bez algoritmu.“
- Cena: 1 € / mesiac
- Tlačidlá: Vytvoriť účet, Prihlásiť sa
- Po „Vytvoriť účet“ → jednoduchý formulár (meno, email, heslo) → mock platba → vstup do feedu
- Po „Prihlásiť sa“ → mock login → feed
- Žiadny backend; state v localStorage stačí na demo

### 2. feed.html — Chronologický feed
- Hore: „Nectar“ + zvonček (→ aktivita)
- Riadok filtrov: Všetci · Rodina · Priatelia · Práca
- Zoznam kariet zhora nadol (najnovšie hore): avatar, meno, čas, fotka (placeholder), text, like, počet lajkov, jemné „Napísať“ (→ chat s autorom)
- Demo dáta: 4–6 fiktívnych príspevkov
- Spodná nav: Feed aktívny

### 3. messages.html — Zoznam konverzácií
- Hore: Správy + vyhľadávanie (UI only)
- Zoznam: avatar, meno, posledná správa, čas, neprečítaná bodka
- Klep → conversation.html?user=...
- Spodná nav: Správy aktívne
- Žiadne skupinové chaty

### 4. conversation.html — 1:1 chat
- Hore: späť, meno, malá fotka (→ profil)
- Bubliny textu (demo histórie), možnosť poslať text (append do UI)
- Tlačidlo na „fotku“ môže byť mock (placeholder)
- Žiadne hlasovky

### 5. activity.html — Zvonček / aktivita
- Zoznam od ľudí: „Mária lajkla tvoju fotku“, „Peter ti napísal“
- Like → feed/príspevok; správa → conversation
- Späť na feed

### 6. compose.html — Nový príspevok
- Kroky: vybrať fotku (file input alebo placeholder) → text → komu (súkromné / kruh / priatelia / verejné) → Zdieľať
- Po zdieľaní → feed (príspevok môže pribudnúť lokálne)

### 7. profile.html — Profil
- Fotka, meno, krátky status, číselné ID (napr. #10482)
- Mriežka fotiek (demo) alebo zoznam
- Vlastný: Upraviť profil (jednoduchý modal/stránka)
- Cudzí: Napísať
- Jedno pripnuté miesto (voliteľné demo)
- Spodná nav: Profil aktívny

### 8. friends.html — Priatelia / kruhy
- Zoznam ľudí s tagom: rodina / priatelia / práca
- Tlačidlo Pozvať (kopíruje mock invite link)
- Dostupný z profilu / nastavení

### 9. settings.html — Nastavenia
- Účet, Predplatné (1 € / mesiac — aktívne), Súkromie, Odhlásiť sa
- Minimálne

## Technické požiadavky prototypu
- Čistý HTML + CSS + malé JS (žiadny ťažký framework nutný; vanilla OK, alebo veľmi ľahký setup)
- Zdieľané styles.css + app.js pre nav a demo dáta
- Klikateľné prechody medzi všetkými obrazovkami
- README s návodom: otvoriť index.html alebo spustiť jednoduchý static server
- Žiadny reálny backend, platby, auth API — len UI prototyp MVP
- Anglické názvy súborov; viditeľný text v slovenčine

## Success criteria
1. Wireframe vyššie je implementovaný ako klikateľný static web.
2. Dizajn pôsobí ako pokojný starý Instagram/Twitter, nie moderný doomscroll.
3. Messenger (messages + conversation) je rovnako prístupný ako feed.
4. README vysvetlí, ako to spustiť lokálne.
