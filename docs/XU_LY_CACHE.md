# 🔄 Xử lý Cache và Cập nhật

## ❓ Vấn đề

Khi cập nhật code, trình duyệt vẫn hiển thị phiên bản cũ do:
- Service Worker cache phiên bản cũ
- Browser cache
- PWA cache

## ✅ Giải pháp đã áp dụng

### 1. Network First Strategy
Service Worker giờ sẽ:
- Thử tải từ network trước
- Nếu thành công → Cập nhật cache và hiển thị
- Nếu thất bại (offline) → Dùng cache cũ

### 2. Auto Update
- Kiểm tra cập nhật mỗi 10 giây
- Khi có phiên bản mới → Hỏi người dùng
- Người dùng đồng ý → Reload tự động

### 3. Skip Waiting
- Service Worker mới activate ngay lập tức
- Không cần đợi tất cả tab đóng

### 4. Version Control
- Tăng version trong `CACHE_NAME` khi có thay đổi lớn
- Tự động xóa cache cũ

## 🔧 Cách sử dụng

### Khi phát triển:
1. Sửa code
2. Refresh trang (F5)
3. Nếu không thấy thay đổi → Ctrl+F5 (hard refresh)

### Khi deploy:
1. Tăng version trong `service-worker.js`:
   ```javascript
   const CACHE_NAME = 'qlhs-vi-pham-v3'; // v2 → v3
   ```
2. Deploy code mới
3. Người dùng sẽ được hỏi cập nhật tự động

## 🛠️ Xóa cache thủ công

### Trên Chrome/Edge:
1. F12 → Application → Storage
2. Clear site data
3. Hoặc: Settings → Privacy → Clear browsing data

### Trên điện thoại:
1. Settings → Apps → [Tên App]
2. Storage → Clear cache

## 📝 Lưu ý

### Khi nào cần tăng version:
- ✅ Thay đổi giao diện (HTML/CSS)
- ✅ Thay đổi logic (JavaScript)
- ✅ Thay đổi manifest/icons
- ❌ Không cần khi chỉ sửa backend

### Cache strategy:
- **Network First**: Luôn cập nhật mới nhất
- **Cache First**: Nhanh nhưng có thể cũ
- Hiện tại dùng **Network First** để luôn mới

## 🔍 Debug cache

### Kiểm tra Service Worker:
```javascript
// Trong Console
navigator.serviceWorker.getRegistrations()
  .then(regs => console.log(regs));
```

### Xóa Service Worker:
```javascript
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(reg => reg.unregister()));
```

### Xóa cache:
```javascript
caches.keys()
  .then(keys => keys.forEach(key => caches.delete(key)));
```

## 🚀 Best Practices

1. **Development**: Tắt Service Worker
   - Chrome DevTools → Application → Service Workers
   - Check "Bypass for network"

2. **Testing**: Dùng Incognito mode
   - Không có cache cũ
   - Test như người dùng mới

3. **Production**: Tăng version khi deploy
   - Đảm bảo người dùng nhận được bản mới

## 💡 Tips

- Ctrl+F5: Hard refresh (bỏ qua cache)
- Ctrl+Shift+Delete: Xóa cache trình duyệt
- F12 → Network → Disable cache: Test không cache
