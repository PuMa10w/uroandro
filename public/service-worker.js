/* eslint-disable no-restricted-globals */
// UroMed Service Worker - Cache-first offline support

const CACHE_NAME = 'uromed-v3';
const OFFLINE_URL = '/';

const urlsToCache = [
  '/',
  '/index.html',
  // CSS и JS будут добавлены динамически
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Только для наших запросов (не API)
  if (url.origin !== self.location.origin) return;
  
  // HTML — network first, fallback к кэшу
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/'))
    );
    return;
  }
  
  // CSS/JS/Images — cache first
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResp) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResp.clone());
          return fetchResp;
        });
      });
    })
  );
});