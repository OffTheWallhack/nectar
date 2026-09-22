# Nectar — MVP wireframe (klikateľný webový prototyp)

## Produkt
Nectar je platená sociálna sieť bez reklám a bez algoritmu.
Primárne: 1:1 messenger (ľudia sem chodia kecávať).
Sekundárne: chronologický feed (fotky + krátky text) s kruhmi.
Okolo toho: spoločné priestory, denná kresba a odznaky za skutočné veci.
Predplatné ~1 € / mesiac. Žiadne stories, reels, hlasovky, skupinové chaty, boost, algoritmus.

## Dizajn
**Warm paper:** krémový papier, mäkký atrament, honey/amber akcent šetrne.
Inšpirácia: starý Instagram + starý Twitter (cca 2005–2015), nie neon / glass.
Dva motívy: **Denný papier** (predvolený) a **Večerný papier** (teplá tmavá varianta,
nie OLED čierna). Motív sa aplikuje pred vykreslením, aby neprebliskol.
Mobil-first web (max-width ~440px centered na desktope), funguje aj v prehliadači.
UI copy: slovenčina.

## Dizajnový systém
- **Tokeny** v `:root` (papier, atrament, linky, med, tiene, rádiusy, rytmus 4px, motion).
- **Elevácia** je vždy teplá a nízka — nikdy čistá čierna.
- **Pohyb**: fade prechody medzi stránkami, nabiehanie zoznamov, pružné mikro-interakcie
  na lajk / hlas / navigáciu. Všetko pod `prefers-reduced-motion`.
- **Fotky**: polaroid-lite rámik, prelínanie po načítaní, voliteľná ručne písaná poznámka.

## Spodná navigácia (5 položiek, na app obrazovkách)
Feed · Správy · Pridať (+) · Priestory · Profil

Kresba dňa má vstup z hornej lišty feedu a z karty výzvy vo feede.

---

### 1. index.html — Vstup / platba
- Logo Nectar, jedna veta: „Pokojný priestor na rozhovory a fotky. Bez reklám. Bez algoritmu.“
- Tri sľuby: chronologicky · bez reklám a plateného dosahu · malé kruhy
- Cena: 1 € / mesiac
- Tlačidlá: Vytvoriť účet, Prihlásiť sa
- Po „Vytvoriť účet“ → formulár (meno, email, heslo) → mock platba → feed
- Paywall vysvetľuje, že poplatok drží preč bot farmy a nekupuje dosah
- Žiadny backend; state v localStorage stačí na demo

### 2. feed.html — Chronologický feed
- Hore: „Nectar“ + kresba dňa + zvonček (→ aktivita)
- Riadok filtrov: Všetci · Rodina · Priatelia · Práca · **Blízki**
- Filter **Blízki** len zúži, koho vidíš — nikdy nepreraďuje (pod filtrom je to napísané)
- Karta dennej výzvy (→ draw.html) s tvárami a odpočtom do polnoci
- Zoznam kariet zhora nadol (najnovšie hore): avatar, meno + odznak, čas, fotka,
  text, lajk, počet lajkov, špendlík, jemné „Napísať“ (→ chat s autorom)
- **Jeden pripnutý príspevok** naraz sa drží na vrchu
- **Dvojklik na fotku** = lajk so srdiečkom
- **„Tu si skončil“** oddeľovač na mieste posledného čítania
- **Koniec feedu** je skutočný koniec — žiadny nekonečný scroll
- Spodná nav: Feed aktívny

### 3. messages.html — Zoznam konverzácií
- Hore: Správy + vyhľadávanie (meno aj text správy) + odkaz na priateľov
- Zoznam zoradený podľa poslednej správy: avatar, presence bodka, meno,
  posledná správa („Ty: …“ pri vlastnej), čas, neprečítaná bodka
- Klep → conversation.html?user=…
- Spodná nav: Správy aktívne, s počtom neprečítaných
- Žiadne skupinové chaty

### 4. conversation.html — 1:1 chat
- Hore: späť, avatar, meno + stav (→ profil)
- Denné oddeľovače, zoskupené bubliny, čas len na konci série, dvojitá fajka
- Odosielanie textu funguje (Enter odošle, Shift+Enter nový riadok)
- Po odoslaní sa krátko ukáže indikátor písania
- Tlačidlo na fotku je zatiaľ mock
- Žiadne hlasovky

### 5. activity.html — Zvonček / aktivita
- Zoskupené po dňoch (dnes / včera / deň v týždni)
- Typy: lajk, správa, odznak, priestor — každý s malou ikonkou pri avatare
- Klep vedie na feed / chat / profil / priestory
- Späť na feed

### 6. compose.html — Nový príspevok
- Prúžok priebehu hore, 3 kroky:
  1. fotka (file input alebo ukážková)
  2. text + voliteľná ručne písaná poznámka, so **živou ukážkou karty**
  3. komu (priatelia / rodina / práca / verejné / súkromné — každé s vysvetlivkou)
- Po zdieľaní → feed (príspevok pribudne lokálne)

### 7. draw.html — Kresba dňa
- Dnešná výzva veľkým písmom + odpočet do polnoci
- „Pridať svoju kresbu“ (odfotený papier cez file input)
- Mriežka kresieb na papierovom podklade, vedúca kresba má korunku a zlatý rámik
- **Jeden hlas na deň** — ďalší klik hlas presunie, klik na ten istý ho stiahne
- Víťaz dostane odznak „Kresba dňa“

### 8. spaces.html — Spoločné priestory
- Filtre: Všetky · Výlety · Projekty · Iniciatívy
- Karty: obálka, typ, odpočet, názov, termín, počet záznamov, tváre členov,
  ukazovateľ spoločného úložiska (250 MB)
- „+“ v hornej lište otvorí spodný panel na vytvorenie priestoru
- Spodná nav: Priestory aktívne

### 9. space.html — Časová os priestoru
- Hlavička: obálka, názov, typ + termín, živá poloha, štatistiky, úložisko, členovia
- Akcie: Pridať záznam · Zdieľať polohu
- Vertikálna časová os so zápismi: fotka s popiskom, poznámka, plán, poloha
- Každé zdieľanie polohy je vedomé a jednorazové

### 9b. care.html — Návyky (súkromné)
- Odznak „Len pre teba“ + vysvetlenie, že sa nič nezdieľa ani nepočíta
- Karty návykov: názov, typ (*nechávam* / *budujem*), počet dní, najlepší výsledok,
  pásik posledných 14 dní
- *budujem* má „Dnes sa podarilo“ (po klepnutí sa zamkne do ďalšieho dňa)
- „Začať odznova“ **zachová** najlepší výsledok — žiadne zahanbovanie
- „+“ v lište pridá nový návyk
- Pätička: Nectar nie je zdravotnícka služba

### 10. profile.html — Profil
- Obálka, profilová fotka (pri veľkom úspechu s medovým prstencom),
  meno + odznak, číselné ID (napr. #10482), status
- Štatistiky: fotiek · odznakov · **návštev profilu** (+ „dnes si ťa pozrelo N ľudí“)
- Vlastný: Upraviť profil, Priatelia, Priestory, QR pozvánka (pull-down)
- Cudzí: Napísať
- Záložky: **Fotky** (mriežka) a **Odznaky** (získané + nezískané)
- Spodná nav: Profil aktívny

### 11. friends.html — Priatelia / kruhy
- Počty priamo na filtroch (Rodina · 2, …)
- Zoznam ľudí so statusom a **viacerými tagmi naraz** (rodina / priatelia / práca)
- **Hviezdička = blízki.** Dáva vlastný filter vo feede, nie prednostné poradie
- Tlačidlo Pozvať (kopíruje mock invite link) + odkaz na QR gesto
- Dostupný z profilu, správ a nastavení

### 12. settings.html — Nastavenia
- **Vzhľad**: Denný papier / Večerný papier
- Účet, Predplatné (1 € / mesiac — aktívne)
- **Odmeny**: získané MB navyše a za čo presne (odznaky, záznamy, kresby)
- **Pokoj**: tiché hodiny, značka „Tu si skončil“, skryť počty lajkov
- Súkromie: priatelia a kruhy, priestory, kto môže písať, poloha na požiadanie
- Obnoviť ukážkové dáta, Odhlásiť sa

## Technické požiadavky prototypu
- Čistý HTML + CSS + malé JS (vanilla, žiadny framework)
- `boot.js` (motív pred vykreslením) + `styles.css` + `app.js` (dáta, helpery, navigácia)
- Klikateľné prechody medzi všetkými obrazovkami
- README s návodom: otvoriť index.html alebo spustiť jednoduchý static server
- Žiadny reálny backend, platby, auth API — len UI prototyp MVP
- Anglické názvy súborov; viditeľný text v slovenčine

## Success criteria
1. Wireframe vyššie je implementovaný ako klikateľný static web.
2. Dizajn pôsobí ako pokojný starý Instagram/Twitter, nie moderný doomscroll.
3. Messenger (messages + conversation) je rovnako prístupný ako feed.
4. Priestory, kresba dňa, odznaky, blízki a návyky sú použiteľné, nie len dekorácia.
   Nič z toho nezavádza algoritmus ani odmeňovanie za čas v aplikácii.
5. Prechody a mikro-interakcie sú plynulé a tiché; rešpektujú reduced-motion.
6. README vysvetlí, ako to spustiť lokálne.
