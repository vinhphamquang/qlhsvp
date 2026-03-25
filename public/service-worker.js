const CACHE_NAME = 'qlhs-vi-pham-v2'; // Tăng version khi có thay đổi
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

// Cài đặt Service Worker
self.addEventListener('install', (event) => {
  // Skip waiting để activate ngay lập tức
  self.skipWaiting();
  
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
  // Claim clients ngay lập tức
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all([
        // Xóa cache cũ
        ...cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Xóa cache cũ:', cacheName);
            return caches.delete(cacheName);
          }
        }),
        // Claim tất cả clients
        self.clients.claim()
      ]);
    })
  );
});

// Xử lý fetch requests - Network First Strategy
self.addEventListener('fetch', (event) => {
  // Bỏ qua các API requests
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    // Thử fetch từ network trước
    fetch(event.request)
      .then((response) => {
        // Clone response để cache
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      })
      .catch(() => {
        // Nếu network fail, dùng cache
        return caches.match(event.request);
      })
  );
});
