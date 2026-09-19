/* Nectar — shared demo data + helpers */
(function () {
  'use strict';

  const STORAGE_KEY = 'nectar_session';
  const POSTS_KEY = 'nectar_posts';
  const LIKES_KEY = 'nectar_likes';
  const MSGS_KEY = 'nectar_msgs';
  const PROFILE_KEY = 'nectar_profile';

  /* ---------- Demo people ---------- */
  const PEOPLE = [
    { id: 'maria', name: 'Mária Nováková', handle: 'maria', circle: 'rodina', avatar: 'https://picsum.photos/seed/nectar-maria/200', status: 'Káva a pokojný ráno ☕', numericId: '10231' },
    { id: 'peter', name: 'Peter Horváth', handle: 'peter', circle: 'priatelia', avatar: 'https://picsum.photos/seed/nectar-peter/200', status: 'Na túre po Malých Karpatoch', numericId: '10344' },
    { id: 'jana', name: 'Jana Kováčová', handle: 'jana', circle: 'praca', avatar: 'https://picsum.photos/seed/nectar-jana/200', status: 'Dizajnérka · Bratislava', numericId: '10512' },
    { id: 'tomas', name: 'Tomáš Belko', handle: 'tomas', circle: 'priatelia', avatar: 'https://picsum.photos/seed/nectar-tomas/200', status: 'Fotím mesto po nociach', numericId: '10678' },
    { id: 'eva', name: 'Eva Szabová', handle: 'eva', circle: 'rodina', avatar: 'https://picsum.photos/seed/nectar-eva/200', status: 'V záhrade je najlepšie', numericId: '10701' },
    { id: 'martin', name: 'Martin Čierny', handle: 'martin', circle: 'praca', avatar: 'https://picsum.photos/seed/nectar-martin/200', status: 'Frontend · remote', numericId: '10820' }
  ];

  const DEFAULT_POSTS = [
    { id: 'p1', authorId: 'maria', image: 'https://picsum.photos/seed/nectar-post1/800', caption: 'Nedeľný obed u babičky. Nič lepšie neexistuje.', circle: 'rodina', time: 'pred 20 min', likes: 12, ts: Date.now() - 20 * 60000 },
    { id: 'p2', authorId: 'peter', image: 'https://picsum.photos/seed/nectar-post2/800', caption: 'Ráno na Devíne. Hmla ešte nespadla.', circle: 'priatelia', time: 'pred 1 hod', likes: 28, ts: Date.now() - 60 * 60000 },
    { id: 'p3', authorId: 'jana', image: 'https://picsum.photos/seed/nectar-post3/800', caption: 'Nový projekt na stole. Držte palce.', circle: 'praca', time: 'pred 3 hod', likes: 9, ts: Date.now() - 180 * 60000 },
    { id: 'p4', authorId: 'tomas', image: 'https://picsum.photos/seed/nectar-post4/800', caption: 'Bratislava v noci — snáď posledné teplé večery.', circle: 'priatelia', time: 'včera', likes: 45, ts: Date.now() - 86400000 },
    { id: 'p5', authorId: 'eva', image: 'https://picsum.photos/seed/nectar-post5/800', caption: 'Prvé jablká zo záhrady 🍎', circle: 'rodina', time: 'včera', likes: 33, ts: Date.now() - 90000000 },
    { id: 'p6', authorId: 'martin', image: 'https://picsum.photos/seed/nectar-post6/800', caption: 'Standup hotový. Poďme na kávu.', circle: 'praca', time: 'pred 2 dňami', likes: 7, ts: Date.now() - 172800000 }
  ];

  const DEFAULT_CONVERSATIONS = {
    maria: [
      { from: 'maria', text: 'Ahoj! Ideš v nedeľu k nám na obed?', time: '10:12' },
      { from: 'me', text: 'Jasné, s radosťou. Mám niečo priniesť?', time: '10:15' },
      { from: 'maria', text: 'Len seba 😊 Koláč už pečieme.', time: '10:16' },
      { from: 'me', text: 'Super, teším sa!', time: '10:18' }
    ],
    peter: [
      { from: 'peter', text: 'Bol si niekedy na tom chodníku za Devínom?', time: 'včera' },
      { from: 'me', text: 'Áno, pred pár rokmi. Stále krásny?', time: 'včera' },
      { from: 'peter', text: 'Ešte krajší. Poďme nabudúce spolu.', time: 'včera' }
    ],
    jana: [
      { from: 'jana', text: 'Máš chvíľu pozrieť ten wireframe?', time: '14:02' },
      { from: 'me', text: 'Poďme o 15:00, OK?', time: '14:05' },
      { from: 'jana', text: 'Perfektné, pošlem link.', time: '14:06' }
    ],
    tomas: [
      { from: 'tomas', text: 'Pozri tú fotku z včera — nechám ju vo feede.', time: 'pondelok' },
      { from: 'me', text: 'Krásna! Lajkol som.', time: 'pondelok' }
    ],
    eva: [
      { from: 'eva', text: 'Mamička sa pýta, či prídete na víkend.', time: 'utorok' }
    ],
    martin: [
      { from: 'martin', text: 'PR je ready na review.', time: '9:40' },
      { from: 'me', text: 'Pozerám to teraz.', time: '9:45' }
    ]
  };

  const DEFAULT_ACTIVITY = [
    { id: 'a1', type: 'like', from: 'maria', text: 'lajkla tvoju fotku', time: 'pred 5 min', postId: 'p4', thumb: 'https://picsum.photos/seed/nectar-post4/100' },
    { id: 'a2', type: 'message', from: 'peter', text: 'ti napísal', time: 'pred 20 min' },
    { id: 'a3', type: 'like', from: 'jana', text: 'lajkla tvoju fotku', time: 'pred 1 hod', postId: 'p4', thumb: 'https://picsum.photos/seed/nectar-post4/100' },
    { id: 'a4', type: 'message', from: 'eva', text: 'ti napísala', time: 'včera' },
    { id: 'a5', type: 'like', from: 'tomas', text: 'lajkol tvoju fotku', time: 'včera', postId: 'p5', thumb: 'https://picsum.photos/seed/nectar-post5/100' },
    { id: 'a6', type: 'message', from: 'martin', text: 'ti napísal', time: 'pred 2 dňami' }
  ];

  const MSG_PREVIEWS = {
    maria: { last: 'Super, teším sa!', time: '10:18', unread: false },
    peter: { last: 'Poďme nabudúce spolu.', time: 'včera', unread: true },
    jana: { last: 'Perfektné, pošlem link.', time: '14:06', unread: false },
    tomas: { last: 'Krásna! Lajkol som.', time: 'pondelok', unread: false },
    eva: { last: 'Mamička sa pýta, či prídete…', time: 'utorok', unread: true },
    martin: { last: 'Pozerám to teraz.', time: '9:45', unread: false }
  };

  /* ---------- Storage helpers ---------- */
  function getSession() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
    catch (e) { return null; }
  }

  function setSession(session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function requireAuth() {
    const s = getSession();
    if (!s || !s.paid) {
      window.location.href = 'index.html';
      return null;
    }
    return s;
  }

  function getPosts() {
    try {
      const saved = localStorage.getItem(POSTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_POSTS.slice();
  }

  function savePosts(posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }

  function getLikes() {
    try { return JSON.parse(localStorage.getItem(LIKES_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function toggleLike(postId) {
    const likes = getLikes();
    likes[postId] = !likes[postId];
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    return likes[postId];
  }

  function getMessages(userId) {
    try {
      const all = JSON.parse(localStorage.getItem(MSGS_KEY) || 'null');
      if (all && all[userId]) return all[userId];
    } catch (e) {}
    return (DEFAULT_CONVERSATIONS[userId] || []).slice();
  }

  function saveMessage(userId, msg) {
    let all;
    try { all = JSON.parse(localStorage.getItem(MSGS_KEY) || 'null') || {}; }
    catch (e) { all = {}; }
    if (!all[userId]) all[userId] = (DEFAULT_CONVERSATIONS[userId] || []).slice();
    all[userId].push(msg);
    localStorage.setItem(MSGS_KEY, JSON.stringify(all));
    return all[userId];
  }

  function getProfile() {
    const session = getSession();
    try {
      const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
      if (saved) return saved;
    } catch (e) {}
    return {
      name: (session && session.name) || 'Ty',
      email: (session && session.email) || '',
      status: 'Tu som kvôli pokojným rozhovorom.',
      numericId: '10482',
      avatar: 'https://picsum.photos/seed/nectar-me/200',
      place: 'Bratislava'
    };
  }

  function saveProfile(p) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  }

  function findPerson(id) {
    if (id === 'me') {
      try {
        var me = JSON.parse(localStorage.getItem('nectar_me_person') || 'null');
        if (me) return me;
      } catch (e) {}
      var prof = null;
      try { prof = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null'); } catch (e2) {}
      var sess = getSession() || {};
      return {
        id: 'me',
        name: (prof && prof.name) || sess.name || 'Ty',
        avatar: (prof && prof.avatar) || 'https://picsum.photos/seed/nectar-me/200',
        circle: 'priatelia',
        status: (prof && prof.status) || '',
        numericId: (prof && prof.numericId) || '10482'
      };
    }
    return PEOPLE.find(function (p) { return p.id === id || p.handle === id; });
  }

  function circleLabel(c) {
    const map = { rodina: 'Rodina', priatelia: 'Priatelia', praca: 'Práca', vsetci: 'Všetci', verejne: 'Verejné', sukromne: 'Súkromné' };
    return map[c] || c;
  }

  /* ---------- Toast ---------- */
  function showToast(text) {
    let el = document.getElementById('nectar-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'nectar-toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  /* ---------- Icons (inline SVG) ---------- */
  const ICONS = {
    feed: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    messages: '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z"/></svg>',
    compose: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
    profile: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    bell: '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9c.3.6.9 1 1.6 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>'
  };

  /* ---------- Bottom nav ---------- */
  function renderBottomNav(active) {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;
    nav.innerHTML =
      '<a href="feed.html" data-nav="feed" class="' + (active === 'feed' ? 'active' : '') + '">' + ICONS.feed + '<span>Feed</span></a>' +
      '<a href="messages.html" data-nav="messages" class="' + (active === 'messages' ? 'active' : '') + '">' + ICONS.messages + '<span>Správy</span></a>' +
      '<a href="compose.html" data-nav="compose" class="nav-compose ' + (active === 'compose' ? 'active' : '') + '">' + ICONS.compose + '<span>Pridať</span></a>' +
      '<a href="profile.html" data-nav="profile" class="' + (active === 'profile' ? 'active' : '') + '">' + ICONS.profile + '<span>Profil</span></a>';
  }

  /* ---------- Public API ---------- */
  window.Nectar = {
    PEOPLE: PEOPLE,
    DEFAULT_ACTIVITY: DEFAULT_ACTIVITY,
    MSG_PREVIEWS: MSG_PREVIEWS,
    ICONS: ICONS,
    getSession: getSession,
    setSession: setSession,
    clearSession: clearSession,
    requireAuth: requireAuth,
    getPosts: getPosts,
    savePosts: savePosts,
    getLikes: getLikes,
    toggleLike: toggleLike,
    getMessages: getMessages,
    saveMessage: saveMessage,
    getProfile: getProfile,
    saveProfile: saveProfile,
    findPerson: findPerson,
    circleLabel: circleLabel,
    showToast: showToast,
    renderBottomNav: renderBottomNav
  };
})();
