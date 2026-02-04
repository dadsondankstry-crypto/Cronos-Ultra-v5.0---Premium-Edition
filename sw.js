const CACHE_NAME = 'cronos-ultra-v5-cache';
const assets = [
  './',
  './index.html',
  './icon-192.png',
  './icon-512.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(e.request).then(response => {
        const fetchPromise = fetch(e.request).then(networkResponse => {
          if (e.request.url.startsWith('http')) {
             cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => response);
        return response || fetchPromise;
      });
    })
  );
});