/* ============================================================
   Nectar — shared demo data, storage helpers and UI plumbing.
   Static prototype: no backend, everything lives in localStorage.
   ============================================================ */
(function () {
  'use strict';

  var K = {
    session: 'nectar_session',
    posts: 'nectar_posts',
    likes: 'nectar_likes',
    msgs: 'nectar_msgs',
    profile: 'nectar_profile',
    theme: 'nectar_theme',
    pinned: 'nectar_pinned',
    seen: 'nectar_seen_ts',
    votes: 'nectar_draw_votes',
    drawings: 'nectar_drawings',
    views: 'nectar_profile_views',
    spaces: 'nectar_spaces',
    read: 'nectar_read_threads',
    close: 'nectar_close',
    habits: 'nectar_habits',
    me: 'nectar_me_person'
  };

  /* ---------------- Badges ---------------- */
  var BADGES = {
    champ24:  { glyph: '🏅', name: 'Majster ligy 2024', when: 'Futbal · 2024', major: true },
    artist:   { glyph: '🎨', name: 'Kresba dňa', when: 'Tento týždeň', major: false },
    helper:   { glyph: '🧤', name: 'Pomocník mesta', when: 'Bratislava 2025', major: false },
    founder:  { glyph: '🐝', name: 'Prvých 1000', when: 'Od začiatku', major: false },
    gardener: { glyph: '🌿', name: 'Susedská záhrada', when: 'Leto 2025', major: false },
    mentor:   { glyph: '📐', name: 'Mentor', when: '3 roky', major: false },
    trail:    { glyph: '⛰️', name: '100 km na nohách', when: 'Jar 2025', major: false }
  };

  /* ---------------- People ---------------- */
  var PEOPLE = [
    { id: 'maria', name: 'Mária Nováková', handle: 'maria', circle: 'rodina', circles: ['rodina'],
      avatar: 'https://picsum.photos/seed/nectar-maria/200', status: 'Káva a pokojné ráno ☕',
      numericId: '10231', place: 'Pezinok', badges: ['gardener'], online: true },
    { id: 'peter', name: 'Peter Horváth', handle: 'peter', circle: 'priatelia', circles: ['priatelia'],
      avatar: 'https://picsum.photos/seed/nectar-peter/200', status: 'Na túre po Malých Karpatoch',
      numericId: '10344', place: 'Bratislava', badges: ['trail', 'helper'], online: true },
    { id: 'jana', name: 'Jana Kováčová', handle: 'jana', circle: 'praca', circles: ['praca', 'priatelia'],
      avatar: 'https://picsum.photos/seed/nectar-jana/200', status: 'Dizajnérka · Bratislava',
      numericId: '10512', place: 'Bratislava', badges: ['artist', 'mentor'], online: false },
    { id: 'tomas', name: 'Tomáš Belko', handle: 'tomas', circle: 'priatelia', circles: ['priatelia'],
      avatar: 'https://picsum.photos/seed/nectar-tomas/200', status: 'Fotím mesto po nociach',
      numericId: '10678', place: 'Košice', badges: ['champ24'], online: false },
    { id: 'eva', name: 'Eva Szabová', handle: 'eva', circle: 'rodina', circles: ['rodina'],
      avatar: 'https://picsum.photos/seed/nectar-eva/200', status: 'V záhrade je najlepšie',
      numericId: '10701', place: 'Senec', badges: ['gardener', 'founder'], online: false },
    { id: 'martin', name: 'Martin Čierny', handle: 'martin', circle: 'praca', circles: ['praca'],
      avatar: 'https://picsum.photos/seed/nectar-martin/200', status: 'Frontend · remote',
      numericId: '10820', place: 'Žilina', badges: ['founder'], online: true }
  ];

  var HOUR = 3600000;
  var DAY = 86400000;
  var now = Date.now();

  /* ---------------- Posts ---------------- */
  var DEFAULT_POSTS = [
    { id: 'p1', authorId: 'maria', image: 'https://picsum.photos/seed/nectar-post1/800',
      caption: 'Nedeľný obed u babičky. Nič lepšie neexistuje.', note: 'babkina kuchyňa',
      circle: 'rodina', likes: 12, ts: now - 20 * 60000 },
    { id: 'p2', authorId: 'peter', image: 'https://picsum.photos/seed/nectar-post2/800',
      caption: 'Ráno na Devíne. Hmla ešte nespadla.', circle: 'priatelia', likes: 28, ts: now - HOUR },
    { id: 'p3', authorId: 'jana', image: 'https://picsum.photos/seed/nectar-post3/800',
      caption: 'Nový projekt na stole. Držte palce.', circle: 'praca', likes: 9, ts: now - 3 * HOUR },
    { id: 'p4', authorId: 'tomas', image: 'https://picsum.photos/seed/nectar-post4/800',
      caption: 'Bratislava v noci — snáď posledné teplé večery.', note: 'o pol jednej ráno',
      circle: 'priatelia', likes: 45, ts: now - 26 * HOUR },
    { id: 'p5', authorId: 'eva', image: 'https://picsum.photos/seed/nectar-post5/800',
      caption: 'Prvé jablká zo záhrady 🍎', circle: 'rodina', likes: 33, ts: now - 30 * HOUR },
    { id: 'p6', authorId: 'martin', image: 'https://picsum.photos/seed/nectar-post6/800',
      caption: 'Standup hotový. Poďme na kávu.', circle: 'praca', likes: 7, ts: now - 2 * DAY }
  ];

  /* ---------------- Conversations ---------------- */
  var DEFAULT_CONVERSATIONS = {
    maria: [
      { from: 'maria', text: 'Ahoj! Ideš v nedeľu k nám na obed?', ts: now - 3 * DAY },
      { from: 'me', text: 'Jasné, s radosťou. Mám niečo priniesť?', ts: now - 3 * DAY + 3 * 60000 },
      { from: 'maria', text: 'Len seba 😊 Koláč už pečieme.', ts: now - 3 * DAY + 4 * 60000 },
      { from: 'me', text: 'Super, teším sa!', ts: now - 2 * HOUR }
    ],
    peter: [
      { from: 'peter', text: 'Bol si niekedy na tom chodníku za Devínom?', ts: now - DAY - 2 * HOUR },
      { from: 'me', text: 'Áno, pred pár rokmi. Stále krásny?', ts: now - DAY - HOUR },
      { from: 'peter', text: 'Ešte krajší.', ts: now - DAY },
      { from: 'peter', text: 'Poďme nabudúce spolu.', ts: now - DAY + 60000 }
    ],
    jana: [
      { from: 'jana', text: 'Máš chvíľu pozrieť ten wireframe?', ts: now - 5 * HOUR },
      { from: 'me', text: 'Poďme o 15:00, OK?', ts: now - 5 * HOUR + 180000 },
      { from: 'jana', text: 'Perfektné, pošlem link.', ts: now - 5 * HOUR + 240000 }
    ],
    tomas: [
      { from: 'tomas', text: 'Pozri tú fotku z včera — nechám ju vo feede.', ts: now - 4 * DAY },
      { from: 'me', text: 'Krásna! Lajkol som.', ts: now - 4 * DAY + 120000 }
    ],
    eva: [
      { from: 'eva', text: 'Mamička sa pýta, či prídete na víkend.', ts: now - 2 * DAY }
    ],
    martin: [
      { from: 'martin', text: 'PR je ready na review.', ts: now - 7 * HOUR },
      { from: 'me', text: 'Pozerám to teraz.', ts: now - 7 * HOUR + 300000 }
    ]
  };

  var UNREAD = { peter: true, eva: true };

  /* ---------------- Activity ---------------- */
  var DEFAULT_ACTIVITY = [
    { id: 'a1', type: 'like', from: 'maria', text: 'lajkla tvoju fotku', ts: now - 5 * 60000,
      postId: 'p4', thumb: 'https://picsum.photos/seed/nectar-post4/100' },
    { id: 'a2', type: 'message', from: 'peter', text: 'ti napísal', ts: now - 20 * 60000 },
    { id: 'a7', type: 'badge', from: 'jana', text: 'získala odznak Kresba dňa', ts: now - 2 * HOUR },
    { id: 'a3', type: 'like', from: 'jana', text: 'lajkla tvoju fotku', ts: now - 3 * HOUR,
      postId: 'p4', thumb: 'https://picsum.photos/seed/nectar-post4/100' },
    { id: 'a4', type: 'message', from: 'eva', text: 'ti napísala', ts: now - DAY },
    { id: 'a8', type: 'space', from: 'peter', text: 'pridal fotku do priestoru Chata Donovaly', ts: now - DAY - 3 * HOUR },
    { id: 'a5', type: 'like', from: 'tomas', text: 'lajkol tvoju fotku', ts: now - DAY - 6 * HOUR,
      postId: 'p5', thumb: 'https://picsum.photos/seed/nectar-post5/100' },
    { id: 'a6', type: 'message', from: 'martin', text: 'ti napísal', ts: now - 2 * DAY }
  ];

  /* ---------------- Shared spaces ---------------- */
  var DEFAULT_SPACES = [
    {
      id: 'donovaly', name: 'Chata Donovaly', kind: 'výlet', when: '15. – 18. jún',
      cover: 'https://picsum.photos/seed/nectar-space-donovaly/700/400',
      members: ['peter', 'tomas', 'jana', 'martin'], storageUsed: 148, storageTotal: 250,
      daysLeft: 3, live: true,
      entries: [
        { id: 'd1', who: 'peter', kind: 'loc', when: 'Dnes · 09:12', text: 'Parkujem pri lanovke, čakám pri bufete.', loc: 'Donovaly — dolná stanica' },
        { id: 'd2', who: 'jana', kind: 'photo', when: 'Dnes · 08:40', text: 'Ráno z okna.',
          photo: 'https://picsum.photos/seed/nectar-tl-1/600/450', note: 'ešte nikto nevstal' },
        { id: 'd3', who: 'tomas', kind: 'note', when: 'Včera · 21:30', text: 'Zajtra ráno raňajky o 8:00, potom hrebeňovka. Kto varí kávu?' },
        { id: 'd4', who: 'martin', kind: 'plan', when: 'Včera · 18:05', text: 'Príchod · Chata č. 4, kľúče u správcu' },
        { id: 'd5', who: 'peter', kind: 'photo', when: 'Včera · 17:20', text: 'Cesta hore.',
          photo: 'https://picsum.photos/seed/nectar-tl-2/600/450', note: 'posledný kopec' }
      ]
    },
    {
      id: 'zahrada', name: 'Susedská záhrada', kind: 'iniciatíva', when: 'Celú sezónu',
      cover: 'https://picsum.photos/seed/nectar-space-zahrada/700/400',
      members: ['eva', 'maria', 'jana'], storageUsed: 62, storageTotal: 250,
      daysLeft: null, live: false,
      entries: [
        { id: 'z1', who: 'eva', kind: 'photo', when: 'Pondelok', text: 'Prvá úroda z vyvýšeného záhona.',
          photo: 'https://picsum.photos/seed/nectar-tl-3/600/450', note: 'reďkovky!' },
        { id: 'z2', who: 'maria', kind: 'note', when: 'Nedeľa', text: 'V sobotu o 10:00 sadíme bylinky. Prineste si rukavice.' },
        { id: 'z3', who: 'jana', kind: 'plan', when: 'Minulý týždeň', text: 'Rozpis polievania · júl' }
      ]
    },
    {
      id: 'redesign', name: 'Redesign webu', kind: 'projekt', when: 'do 30. septembra',
      cover: 'https://picsum.photos/seed/nectar-space-projekt/700/400',
      members: ['jana', 'martin'], storageUsed: 201, storageTotal: 250,
      daysLeft: 9, live: false,
      entries: [
        { id: 'r1', who: 'jana', kind: 'photo', when: 'Dnes · 11:02', text: 'Skice pre hlavnú stránku.',
          photo: 'https://picsum.photos/seed/nectar-tl-4/600/450', note: 'verzia 3' },
        { id: 'r2', who: 'martin', kind: 'note', when: 'Včera', text: 'Komponenty sú hotové, ostáva typografia.' },
        { id: 'r3', who: 'jana', kind: 'plan', when: 'Pondelok', text: 'Odovzdanie · 30. 9.' }
      ]
    }
  ];

  /* ---------------- Daily drawing ---------------- */
  var DRAW_PROMPT = 'Nakresli miesto, kde si bol naposledy naozaj pokojný.';

  var DEFAULT_DRAWINGS = [
    { id: 'dr1', author: 'jana', image: 'https://picsum.photos/seed/nectar-draw-1/500', votes: 24 },
    { id: 'dr2', author: 'eva', image: 'https://picsum.photos/seed/nectar-draw-2/500', votes: 18 },
    { id: 'dr3', author: 'peter', image: 'https://picsum.photos/seed/nectar-draw-3/500', votes: 15 },
    { id: 'dr4', author: 'tomas', image: 'https://picsum.photos/seed/nectar-draw-4/500', votes: 11 },
    { id: 'dr5', author: 'maria', image: 'https://picsum.photos/seed/nectar-draw-5/500', votes: 7 },
    { id: 'dr6', author: 'martin', image: 'https://picsum.photos/seed/nectar-draw-6/500', votes: 4 }
  ];

  /* ---------------- Storage plumbing ---------------- */
  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }

  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function getSession() { return read(K.session, null); }
  function setSession(s) { write(K.session, s); }
  function clearSession() { try { localStorage.removeItem(K.session); } catch (e) {} }

  function requireAuth() {
    var s = getSession();
    if (!s || !s.paid) { window.location.href = 'index.html'; return null; }
    return s;
  }

  function getPosts() { return read(K.posts, null) || DEFAULT_POSTS.slice(); }
  function savePosts(p) { write(K.posts, p); }

  function getLikes() { return read(K.likes, {}) || {}; }
  function toggleLike(id) {
    var likes = getLikes();
    likes[id] = !likes[id];
    write(K.likes, likes);
    return likes[id];
  }

  function getPinnedId() { return read(K.pinned, null); }
  function setPinnedId(id) { write(K.pinned, id); }

  function getMessages(userId) {
    var all = read(K.msgs, null);
    if (all && all[userId]) return all[userId];
    return (DEFAULT_CONVERSATIONS[userId] || []).slice();
  }

  function saveMessage(userId, msg) {
    var all = read(K.msgs, null) || {};
    if (!all[userId]) all[userId] = (DEFAULT_CONVERSATIONS[userId] || []).slice();
    all[userId].push(msg);
    write(K.msgs, all);
    return all[userId];
  }

  function lastMessage(userId) {
    var msgs = getMessages(userId);
    return msgs.length ? msgs[msgs.length - 1] : null;
  }

  function getReadThreads() { return read(K.read, {}) || {}; }
  function markThreadRead(userId) {
    var r = getReadThreads();
    r[userId] = Date.now();
    write(K.read, r);
  }
  function isUnread(userId) {
    if (getReadThreads()[userId]) return false;
    return !!UNREAD[userId];
  }
  function unreadCount() {
    return PEOPLE.filter(function (p) { return isUnread(p.id); }).length;
  }

  function getProfile() {
    var saved = read(K.profile, null);
    if (saved) return saved;
    var s = getSession() || {};
    return {
      name: s.name || 'Ty',
      email: s.email || '',
      status: 'Tu som kvôli pokojným rozhovorom.',
      numericId: '10482',
      avatar: 'https://picsum.photos/seed/nectar-me/200',
      cover: 'https://picsum.photos/seed/nectar-me-cover/800/300',
      place: 'Bratislava',
      badges: ['founder', 'helper'],
      joined: 'marec 2025'
    };
  }
  function saveProfile(p) { write(K.profile, p); }

  /* profile views — the calm alternative to a follower count */
  function getViews() {
    var v = read(K.views, null);
    if (v && v.day === todayKey()) return v;
    v = { day: todayKey(), total: 412 + Math.floor(Math.random() * 40), today: 6 + Math.floor(Math.random() * 12) };
    write(K.views, v);
    return v;
  }

  function getSpaces() { return read(K.spaces, null) || DEFAULT_SPACES.slice(); }
  function saveSpaces(s) { write(K.spaces, s); }
  function findSpace(id) {
    var all = getSpaces();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function getDrawings() { return read(K.drawings, null) || DEFAULT_DRAWINGS.slice(); }
  function saveDrawings(d) { write(K.drawings, d); }
  function getVotes() {
    var v = read(K.votes, null);
    if (v && v.day === todayKey()) return v;
    return { day: todayKey(), id: null };
  }
  /* One vote per day — nudges a choice instead of endless tapping. */
  function castVote(drawingId) {
    var v = getVotes();
    v.day = todayKey();
    v.id = v.id === drawingId ? null : drawingId;
    write(K.votes, v);
    return v.id;
  }

  function getSeenTs() { return read(K.seen, 0) || 0; }
  function setSeenTs(ts) { write(K.seen, ts); }

  /* ---------------- Close circle ----------------
     "Blízki" is an explicit view you choose, never a reordering of the feed.
     Prioritising people algorithmically is exactly what Nectar refuses to do. */
  function getClose() { return read(K.close, null) || ['maria', 'eva']; }

  function isClose(id) { return getClose().indexOf(id) !== -1; }

  function toggleClose(id) {
    var list = getClose();
    var i = list.indexOf(id);
    if (i === -1) list.push(id); else list.splice(i, 1);
    write(K.close, list);
    return i === -1;
  }

  /* ---------------- Rewards ----------------
     Earned by contributing something real — never by time spent in the app.
     Every number below is computed from state the person actually created. */
  function myDrawingCount() {
    return getDrawings().filter(function (d) { return d.author === 'me'; }).length;
  }

  function myEntryCount() {
    return getSpaces().reduce(function (n, sp) {
      return n + sp.entries.filter(function (e) { return e.who === 'me'; }).length;
    }, 0);
  }

  function getRewards() {
    var badges = (getProfile().badges || []).length;
    var entries = myEntryCount();
    var draws = myDrawingCount();
    return [
      { id: 'badges', label: 'Odznaky za skutočné veci',
        note: badges + (badges === 1 ? ' získaný' : ' získané'),
        mb: badges * 25, done: badges > 0 },
      { id: 'spaces', label: 'Záznamy v spoločných priestoroch',
        note: entries + (entries === 1 ? ' záznam' : ' záznamov'),
        mb: Math.min(entries, 10) * 10, done: entries > 0 },
      { id: 'draw', label: 'Odoslané kresby dňa',
        note: draws + (draws === 1 ? ' kresba' : ' kresieb'),
        mb: draws * 15, done: draws > 0 }
    ];
  }

  function bonusMb() {
    return getRewards().reduce(function (n, r) { return n + r.mb; }, 0);
  }

  /* Every space gets the same earned bonus on top of its base allowance. */
  function spaceCapacity(space) { return (space.storageTotal || 250) + bonusMb(); }

  /* ---------------- Habits ----------------
     Private by default, gentle by design: a restart keeps your best run
     instead of wiping it, and nothing here is ever shared or counted publicly. */
  var DEFAULT_HABITS = [
    { id: 'h1', name: 'Bez cigariet', kind: 'quit', startTs: now - 12 * DAY, best: 12, days: {} },
    { id: 'h2', name: 'Prechádzka každý deň', kind: 'build', startTs: now - 6 * DAY, best: 4, days: {} }
  ];

  function dayKey(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function getHabits() {
    var saved = read(K.habits, null);
    if (saved) return saved;
    /* seed the "build" example with a few recent check-ins so the strip reads */
    var seeded = JSON.parse(JSON.stringify(DEFAULT_HABITS));
    [1, 2, 3].forEach(function (back) { seeded[1].days[dayKey(now - back * DAY)] = true; });
    return seeded;
  }

  function saveHabits(h) { write(K.habits, h); }

  /* quit: days since the start. build: consecutive days checked in, today optional. */
  function habitCount(h) {
    if (h.kind === 'quit') return Math.max(0, Math.floor((Date.now() - h.startTs) / DAY));
    var n = 0;
    var cursor = Date.now();
    if (!h.days[dayKey(cursor)]) cursor -= DAY;
    while (h.days[dayKey(cursor)]) { n++; cursor -= DAY; }
    return n;
  }

  function habitCheckedToday(h) { return !!h.days[dayKey(Date.now())]; }

  function habitStrip(h, len) {
    var out = [];
    for (var i = len - 1; i >= 0; i--) {
      var ts = Date.now() - i * DAY;
      out.push(h.kind === 'quit' ? ts >= h.startTs : !!h.days[dayKey(ts)]);
    }
    return out;
  }

  /* ---------------- People helpers ---------------- */
  function findPerson(id) {
    if (id === 'me') {
      var prof = getProfile();
      var stored = read(K.me, null) || {};
      return {
        id: 'me',
        name: stored.name || prof.name,
        avatar: stored.avatar || prof.avatar,
        circle: 'priatelia',
        circles: ['priatelia'],
        status: prof.status,
        numericId: prof.numericId,
        place: prof.place,
        badges: prof.badges || []
      };
    }
    for (var i = 0; i < PEOPLE.length; i++) {
      if (PEOPLE[i].id === id || PEOPLE[i].handle === id) return PEOPLE[i];
    }
    return null;
  }

  function firstName(name) { return String(name || '').split(' ')[0]; }

  function circleLabel(c) {
    var map = {
      rodina: 'Rodina', priatelia: 'Priatelia', praca: 'Práca', vsetci: 'Všetci',
      verejne: 'Verejné', sukromne: 'Súkromné'
    };
    return map[c] || c;
  }

  function badge(id) { return BADGES[id] || null; }

  function topBadge(person) {
    if (!person || !person.badges || !person.badges.length) return null;
    for (var i = 0; i < person.badges.length; i++) {
      var b = BADGES[person.badges[i]];
      if (b && b.major) return b;
    }
    return BADGES[person.badges[0]] || null;
  }

  function badgeChip(person) {
    var b = topBadge(person);
    if (!b) return '';
    return '<span class="badge-chip" title="' + escapeHtml(b.name) + '">' +
      '<span class="glyph">' + b.glyph + '</span>' + escapeHtml(b.name) + '</span>';
  }

  /* ---------------- Time ---------------- */
  function todayKey() { return dayKey(Date.now()); }

  function clock(ts) {
    var d = new Date(ts);
    return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  /* "pred 20 min" / "pred 3 hod" / "včera" / "pred 4 dňami" */
  function relTime(ts) {
    var diff = Date.now() - ts;
    if (diff < 60000) return 'práve teraz';
    var mins = Math.floor(diff / 60000);
    if (mins < 60) return 'pred ' + mins + ' min';
    var hours = Math.floor(diff / HOUR);
    if (hours < 24) return 'pred ' + hours + (hours === 1 ? ' hodinou' : hours < 5 ? ' hodinami' : ' hodinami');
    var days = Math.floor(diff / DAY);
    if (days === 1) return 'včera';
    if (days < 7) return 'pred ' + days + ' dňami';
    var d = new Date(ts);
    return d.getDate() + '. ' + (d.getMonth() + 1) + '.';
  }

  /* short form for lists: 10:18 today, "včera", else 4. 9. */
  function shortTime(ts) {
    var d = new Date(ts);
    var t = new Date();
    if (d.toDateString() === t.toDateString()) return clock(ts);
    var y = new Date(Date.now() - DAY);
    if (d.toDateString() === y.toDateString()) return 'včera';
    return d.getDate() + '. ' + (d.getMonth() + 1) + '.';
  }

  var DAY_NAMES = ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'];

  function dayLabel(ts) {
    var d = new Date(ts);
    var t = new Date();
    if (d.toDateString() === t.toDateString()) return 'dnes';
    var y = new Date(Date.now() - DAY);
    if (d.toDateString() === y.toDateString()) return 'včera';
    if (Date.now() - ts < 6 * DAY) return DAY_NAMES[d.getDay()];
    return d.getDate() + '. ' + (d.getMonth() + 1) + '.';
  }

  /* time until local midnight — the daily prompt's deadline */
  function untilMidnight() {
    var d = new Date();
    var end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0);
    var ms = end - d;
    var h = Math.floor(ms / HOUR);
    var m = Math.floor((ms % HOUR) / 60000);
    return h + ' h ' + String(m).padStart(2, '0') + ' min';
  }

  /* ---------------- Text ---------------- */
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------------- Theme ---------------- */
  function getTheme() {
    var t = read(K.theme, null);
    if (t === 'day' || t === 'dusk') return t;
    return document.documentElement.getAttribute('data-theme') || 'day';
  }

  function setTheme(t) {
    write(K.theme, t);
    document.documentElement.setAttribute('data-theme', t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dusk' ? '#221c16' : '#f4ebdd');
  }

  /* ---------------- Icons ---------------- */
  var ICONS = {
    feed: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 10h18M9 10v10"/></svg>',
    messages: '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z"/></svg>',
    compose: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
    spaces: '<svg viewBox="0 0 24 24"><path d="M3 9l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 21v-7h6v7"/></svg>',
    profile: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    bell: '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
    heartFull: '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
    chevron: '<svg class="chev" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9c.3.6.9 1 1.6 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M21 3L3 10.5l7 3 3 7z"/><path d="M21 3l-11 11"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 17v5"/><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3z"/></svg>',
    pen: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>',
    checkDouble: '<svg viewBox="0 0 24 24"><path d="M1 12l5 5L17 6"/><path d="M11 15l2 2L23 7"/></svg>',
    pinMap: '<svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    thumb: '<svg viewBox="0 0 24 24"><path d="M7 22V11l5-9a2.5 2.5 0 012.5 3L13 11h5.5a2.5 2.5 0 012.4 3.2l-1.7 6A2.5 2.5 0 0116.8 22z"/></svg>',
    users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3.1-6 7-6s7 2.5 7 6"/><path d="M17 5.2a3.5 3.5 0 010 6.6M19 20c0-2.6-1-4.6-2.6-5.6"/></svg>',
    note: '<svg viewBox="0 0 24 24"><path d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>',
    slash: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24"><path d="M4 20c0-8 5-14 16-15 0 11-6 16-13 15"/><path d="M4 20c3-4 6-6 10-7.5"/></svg>',
    gift: '<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12"/><path d="M12 9S10.5 4 8 4a2.2 2.2 0 000 5zM12 9s1.5-5 4-5a2.2 2.2 0 010 5z"/></svg>'
  };

  /* ---------------- Bottom nav ---------------- */
  function renderBottomNav(active) {
    var nav = document.getElementById('bottom-nav');
    if (!nav) return;
    var unread = unreadCount();
    var items = [
      { key: 'feed', href: 'feed.html', icon: ICONS.feed, label: 'Feed' },
      { key: 'messages', href: 'messages.html', icon: ICONS.messages, label: 'Správy', badge: unread },
      { key: 'compose', href: 'compose.html', icon: ICONS.compose, label: 'Pridať' },
      { key: 'spaces', href: 'spaces.html', icon: ICONS.spaces, label: 'Priestory' },
      { key: 'profile', href: 'profile.html', icon: ICONS.profile, label: 'Profil' }
    ];
    nav.innerHTML = items.map(function (it) {
      var badgeHtml = it.badge ? '<span class="nav-badge">' + it.badge + '</span>' : '';
      return '<a href="' + it.href + '" data-nav="' + it.key + '"' +
        (active === it.key ? ' class="active" aria-current="page"' : '') + '>' +
        it.icon + badgeHtml + '<span>' + it.label + '</span></a>';
    }).join('');
  }

  /* ---------------- Toast ---------------- */
  function showToast(text, icon) {
    var el = document.getElementById('nectar-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'nectar-toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.innerHTML = (icon ? '<span aria-hidden="true">' + icon + '</span>' : '') +
      '<span>' + escapeHtml(text) + '</span>';
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('show'); }, 2400);
  }

  /* ---------------- Shell behaviours ---------------- */

  /* Top bar gains a hairline + shadow only once the page has scrolled. */
  function initTopbar() {
    var bar = document.querySelector('.topbar');
    if (!bar) return;
    var scroller = document.querySelector('.app-shell.own-profile') || window;
    function onScroll() {
      var y = scroller === window ? window.scrollY : scroller.scrollTop;
      bar.classList.toggle('is-scrolled', y > 4);
    }
    scroller.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Fade the shell out before following an internal link, so pages hand over
     instead of snapping. Falls back to a plain navigation everywhere it can't. */
  function initPageTransitions() {
    var shell = document.querySelector('.app-shell');
    if (shell) shell.classList.add('page-in');

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^[a-z]+:/i.test(href)) return;
      e.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(function () { window.location.href = href; }, 120);
    });
  }

  /* Images fade in once decoded instead of popping row by row. */
  function initImageFade(root) {
    var imgs = (root || document).querySelectorAll('img[data-fade]');
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.complete && img.naturalWidth) { img.classList.add('loaded'); return; }
      img.addEventListener('load', function () { img.classList.add('loaded'); }, { once: true });
      img.addEventListener('error', function () { img.classList.add('loaded'); }, { once: true });
    });
  }

  function initShell() {
    initTopbar();
    initPageTransitions();
    initImageFade();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShell);
  } else {
    initShell();
  }

  /* ---------------- Public API ---------------- */
  window.Nectar = {
    PEOPLE: PEOPLE,
    BADGES: BADGES,
    DEFAULT_ACTIVITY: DEFAULT_ACTIVITY,
    DRAW_PROMPT: DRAW_PROMPT,
    ICONS: ICONS,

    getSession: getSession, setSession: setSession, clearSession: clearSession, requireAuth: requireAuth,
    getPosts: getPosts, savePosts: savePosts,
    getLikes: getLikes, toggleLike: toggleLike,
    getPinnedId: getPinnedId, setPinnedId: setPinnedId,
    getMessages: getMessages, saveMessage: saveMessage, lastMessage: lastMessage,
    isUnread: isUnread, markThreadRead: markThreadRead, unreadCount: unreadCount,
    getProfile: getProfile, saveProfile: saveProfile, getViews: getViews,
    getSpaces: getSpaces, saveSpaces: saveSpaces, findSpace: findSpace,
    getDrawings: getDrawings, saveDrawings: saveDrawings, getVotes: getVotes, castVote: castVote,
    getSeenTs: getSeenTs, setSeenTs: setSeenTs,
    getTheme: getTheme, setTheme: setTheme,
    getClose: getClose, isClose: isClose, toggleClose: toggleClose,
    getRewards: getRewards, bonusMb: bonusMb, spaceCapacity: spaceCapacity,
    getHabits: getHabits, saveHabits: saveHabits, habitCount: habitCount,
    habitCheckedToday: habitCheckedToday, habitStrip: habitStrip, dayKey: dayKey,

    findPerson: findPerson, firstName: firstName, circleLabel: circleLabel,
    badge: badge, topBadge: topBadge, badgeChip: badgeChip,

    clock: clock, relTime: relTime, shortTime: shortTime, dayLabel: dayLabel, untilMidnight: untilMidnight,
    escapeHtml: escapeHtml,

    showToast: showToast, renderBottomNav: renderBottomNav, initImageFade: initImageFade
  };
})();
