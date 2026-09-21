/* Nectar — runs before paint so the chosen theme never flashes.
   Reads the same JSON-encoded value app.js writes. */
(function () {
  var t = 'day';
  try {
    var raw = localStorage.getItem('nectar_theme');
    if (raw) {
      try { raw = JSON.parse(raw); } catch (e) { /* tolerate a bare string */ }
    }
    if (raw === 'dusk' || raw === 'day') {
      t = raw;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      t = 'dusk';
    }
  } catch (e) {}

  document.documentElement.setAttribute('data-theme', t);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'dusk' ? '#221c16' : '#f4ebdd');
})();
