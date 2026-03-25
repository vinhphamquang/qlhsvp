const CACHE_NAME = 'qlhs-vi-pham-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

// Cài đặt Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Đã mở cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Kích hoạt Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Xóa cache cũ:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Xử lý fetch requests
self.addEventListener('fetch', (event) => {
  // Bỏ qua các API requests
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Trả về cache nếu có
        if (response) {
          return response;
        }
        // Nếu không có trong cache, fetch từ network
        return fetch(event.request);
      })
  );
});
