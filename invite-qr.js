/* Nectar — own-profile pull-to-reveal invite QR (prototype, no backend) */
(function () {
  'use strict';

  var TTL_MS = 120000;

  function init() {
    var shell = document.getElementById('app-shell');
    var panel = document.getElementById('qr-invite');
    var hint = document.getElementById('qr-pull-hint');
    var inviteBody = document.getElementById('qr-invite-body');
    var card = document.getElementById('qr-invite-card');
    var canvas = document.getElementById('qr-canvas');
    var ttlEl = document.getElementById('qr-ttl');
    var tokenEl = document.getElementById('qr-token');
    if (!shell || !panel || !hint || typeof qrcode !== 'function') return;

    document.documentElement.classList.add('own-profile');
    document.body.classList.add('own-profile');
    shell.classList.add('own-profile');

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var REST_H = 48;
    var PANEL_H = 300;
    var height = REST_H;
    var pulling = false;
    var latched = false;
    var startY = 0;
    var startH = REST_H;
    var lastY = 0;
    var lastT = 0;
    var velocity = 0;
    var anim = 0;
    var token = '';
    var tokenUntil = 0;
    var tickTimer = 0;
    var didRevealAnim = false;
    var tracking = false;
    var moved = false;
    var lockedScroll = false;
    var prevOverflow = '';
    var wheelTimer = 0;
    var lastTouchAt = 0;
    var handledMouse = false;

    function measure() {
      REST_H = hint.offsetHeight || 48;
      var bodyH = inviteBody ? inviteBody.offsetHeight : 252;
      PANEL_H = REST_H + bodyH;
      if (PANEL_H < REST_H + 200) PANEL_H = REST_H + 252;
    }

    function setHeight(h) {
      height = Math.max(0, h);
      var progress = (height - REST_H) / Math.max(1, PANEL_H - REST_H);
      if (progress < 0) progress = 0;
      if (progress > 1.15) progress = 1.15;
      panel.style.setProperty('--qr-h', height + 'px');
      panel.style.setProperty('--qr-p', String(Math.max(0, Math.min(1, progress))));

      var vis = Math.max(0, Math.min(1, (progress - 0.08) / 0.5));
      if (card) {
        card.style.opacity = String(vis);
        if (!reduceMotion) {
          card.style.transform = 'translateY(' + ((1 - vis) * -8) + 'px) scale(' + (0.975 + vis * 0.025) + ')';
        }
      }
      var hintText = hint.querySelector('.qr-pull-hint-text');
      if (hintText) hintText.style.opacity = String(1 - Math.min(1, progress * 1.35));

      if (progress > 0.22) {
        panel.classList.add('is-revealed');
        ensureToken();
        if (!didRevealAnim && progress > 0.52) {
          didRevealAnim = true;
          playReveal();
        }
      } else {
        panel.classList.remove('is-revealed');
      }

      hint.setAttribute('aria-expanded', height > REST_H + 24 ? 'true' : 'false');
    }

    function rubber(desired) {
      if (desired <= PANEL_H) return desired;
      var extra = desired - PANEL_H;
      var dim = 170;
      return PANEL_H + (1 - 1 / (extra * 0.55 / dim + 1)) * dim;
    }

    function atTop() {
      return shell.scrollTop <= 0;
    }

    function lockScroll() {
      if (lockedScroll) return;
      lockedScroll = true;
      prevOverflow = shell.style.overflowY;
      shell.style.overflowY = 'hidden';
    }

    function unlockScroll() {
      if (!lockedScroll) return;
      lockedScroll = false;
      shell.style.overflowY = prevOverflow || '';
    }

    function makeToken() {
      var alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      var bytes = new Uint8Array(8);
      if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(bytes);
      else {
        for (var i = 0; i < 8; i++) bytes[i] = Math.floor(Math.random() * 256);
      }
      var s = '';
      for (var j = 0; j < 8; j++) s += alphabet[bytes[j] % alphabet.length];
      return s;
    }

    function drawQr(text) {
      var qr = qrcode(0, 'H');
      qr.addData(text);
      qr.make();
      var n = qr.getModuleCount();
      var dpr = Math.min(2.5, window.devicePixelRatio || 1);
      var css = 148;
      canvas.width = Math.round(css * dpr);
      canvas.height = Math.round(css * dpr);
      canvas.style.width = css + 'px';
      canvas.style.height = css + 'px';
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, css, css);
      var pad = 10;
      var cell = (css - pad * 2) / n;
      ctx.fillStyle = '#262626';
      for (var r = 0; r < n; r++) {
        for (var c = 0; c < n; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect(pad + c * cell, pad + r * cell, cell + 0.45, cell + 0.45);
          }
        }
      }
      var holeW = 52;
      var holeH = 20;
      var hx = (css - holeW) / 2;
      var hy = (css - holeH) / 2;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(hx, hy, holeW, holeH, 3);
      else ctx.rect(hx, hy, holeW, holeH);
      ctx.fill();
      ctx.fillStyle = '#262626';
      ctx.font = 'italic 12px Georgia, "Times New Roman", Times, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Nectar', css / 2, css / 2 + 0.5);
    }

    function renderCountdown() {
      if (!ttlEl) return;
      var left = tokenUntil - Date.now();
      if (left <= 0) {
        ttlEl.textContent = 'Vypršalo';
        if (card) card.classList.add('expired');
        return;
      }
      var sec = Math.ceil(left / 1000);
      var m = Math.floor(sec / 60);
      var s = sec % 60;
      ttlEl.textContent = 'Platné ' + m + ':' + (s < 10 ? '0' : '') + s;
    }

    function ensureToken() {
      var now = Date.now();
      if (token && now < tokenUntil) {
        renderCountdown();
        return;
      }
      token = makeToken();
      tokenUntil = now + TTL_MS;
      if (tokenEl) {
        tokenEl.textContent = token.slice(0, 4) + ' · ' + token.slice(4);
      }
      if (card) card.classList.remove('expired');
      var url = 'nectar://invite/' + token;
      drawQr(url);
      renderCountdown();
      clearInterval(tickTimer);
      tickTimer = setInterval(renderCountdown, 250);
    }

    function playReveal() {
      if (!card || reduceMotion) return;
      card.classList.remove('play-reveal');
      void card.offsetWidth;
      card.classList.add('play-reveal');
    }

    function freshMoment() {
      token = '';
      tokenUntil = 0;
      didRevealAnim = false;
      if (card) {
        card.classList.remove('play-reveal');
        card.classList.remove('expired');
      }
    }

    function cancelAnim() {
      if (anim) cancelAnimationFrame(anim);
      anim = 0;
    }

    function springTo(target, v0) {
      cancelAnim();
      if (reduceMotion) {
        setHeight(target);
        if (target <= REST_H + 1) {
          latched = false;
          panel.classList.remove('is-latched');
          freshMoment();
        }
        unlockScroll();
        return;
      }
      var x = height;
      var v = (v0 || 0) * 1000;
      var stiffness = 340;
      var damping = 20;
      var last = performance.now();
      function step(now) {
        var dt = Math.min(0.032, (now - last) / 1000);
        last = now;
        var a = -stiffness * (x - target) - damping * v;
        v += a * dt;
        x += v * dt;
        var floor = REST_H * 0.72;
        if (x < floor) {
          x = floor;
          v = -v * 0.38;
        }
        setHeight(x);
        if (Math.abs(x - target) < 0.7 && Math.abs(v) < 18) {
          setHeight(target);
          anim = 0;
          if (target <= REST_H + 1) {
            latched = false;
            panel.classList.remove('is-latched');
            freshMoment();
            unlockScroll();
          }
          return;
        }
        anim = requestAnimationFrame(step);
      }
      anim = requestAnimationFrame(step);
    }

    function beginPull(y) {
      cancelAnim();
      pulling = true;
      moved = false;
      startY = y;
      startH = height;
      lastY = y;
      lastT = performance.now();
      velocity = 0;
      panel.classList.add('is-pulling');
      if (height <= REST_H + 2) freshMoment();
      lockScroll();
    }

    function movePull(y) {
      if (!pulling) return;
      var now = performance.now();
      var dt = now - lastT;
      if (dt > 0) velocity = (y - lastY) / dt;
      lastY = y;
      lastT = now;
      var raw = y - startY;
      if (Math.abs(raw) > 6) moved = true;
      var desired = startH + raw;
      if (desired < REST_H) {
        var compress = REST_H - (REST_H - desired) * 0.22;
        setHeight(Math.max(REST_H * 0.78, compress));
      } else {
        setHeight(rubber(desired));
      }
    }

    function endPull() {
      if (!pulling) return;
      pulling = false;
      panel.classList.remove('is-pulling');
      latched = false;
      panel.classList.remove('is-latched');
      springTo(REST_H, velocity);
    }

    function toggleLatch() {
      if (latched || height > PANEL_H * 0.75) {
        latched = false;
        panel.classList.remove('is-latched');
        springTo(REST_H, 0);
      } else {
        latched = true;
        panel.classList.add('is-latched');
        ensureToken();
        springTo(PANEL_H, 0);
        if (!didRevealAnim) {
          didRevealAnim = true;
          playReveal();
        }
      }
    }

    measure();
    setHeight(REST_H);

    shell.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      lastTouchAt = Date.now();
      tracking = atTop() || height > REST_H + 1;
      if (!tracking) return;
      startY = e.touches[0].clientY;
      startH = height;
      lastY = startY;
      lastT = performance.now();
      pulling = false;
      moved = false;
    }, { passive: true });

    shell.addEventListener('touchmove', function (e) {
      if (!tracking && height <= REST_H) return;
      var y = e.touches[0].clientY;
      var dy = y - startY;
      if (!pulling) {
        if (atTop() && dy > 6) {
          beginPull(startY);
        } else if (height > REST_H + 1 && dy < -6) {
          beginPull(startY);
        } else {
          return;
        }
      }
      if (pulling) {
        if (e.cancelable) e.preventDefault();
        movePull(y);
      }
    }, { passive: false });

    function touchDone() {
      lastTouchAt = Date.now();
      tracking = false;
      endPull();
    }
    shell.addEventListener('touchend', touchDone, { passive: true });
    shell.addEventListener('touchcancel', touchDone, { passive: true });

    hint.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      if (Date.now() - lastTouchAt < 700) return;
      e.preventDefault();
      handledMouse = true;
      beginPull(e.clientY);
      function mm(ev) { movePull(ev.clientY); }
      function mu() {
        window.removeEventListener('mousemove', mm);
        window.removeEventListener('mouseup', mu);
        if (moved) {
          endPull();
        } else {
          pulling = false;
          panel.classList.remove('is-pulling');
          unlockScroll();
          toggleLatch();
        }
      }
      window.addEventListener('mousemove', mm);
      window.addEventListener('mouseup', mu);
    });

    hint.addEventListener('click', function (e) {
      e.preventDefault();
      if (handledMouse) {
        handledMouse = false;
        return;
      }
      if (moved) return;
      toggleLatch();
    });

    hint.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLatch();
      }
    });

    shell.addEventListener('wheel', function (e) {
      var goingDown = e.deltaY < 0;
      var goingUp = e.deltaY > 0;
      if (!atTop() && height <= REST_H) return;
      if (!(goingDown && atTop()) && !(goingUp && height > REST_H)) return;
      e.preventDefault();
      cancelAnim();
      if (height <= REST_H + 2 && goingDown) freshMoment();
      lockScroll();
      var next = height + (-e.deltaY) * 0.42;
      if (next < REST_H) next = REST_H;
      setHeight(rubber(next));
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(function () {
        latched = false;
        panel.classList.remove('is-latched');
        springTo(REST_H, 0);
      }, 160);
    }, { passive: false });

    window.addEventListener('resize', function () {
      var open = height > REST_H + 40;
      measure();
      setHeight(open && latched ? PANEL_H : (open ? height : REST_H));
    });
  }

  window.NectarInviteQr = { init: init };
})();
