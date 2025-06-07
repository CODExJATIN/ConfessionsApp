self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('confession-cache').then(cache =>
      cache.addAll([
        '/',
        '/index.html',
        '/192logo.png',
        '/logo.png',
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
