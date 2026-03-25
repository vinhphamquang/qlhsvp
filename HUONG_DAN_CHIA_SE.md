# 📱 Hướng Dẫn Chia Sẻ App Cho Người Khác

## 🎯 3 Cách để người khác cài đặt app về điện thoại:

---

## ✅ Cách 1: Chia sẻ qua WiFi (Nhanh nhất - Khuyến nghị)

### Bước 1: Khởi động server
```cmd
npm start
```

### Bước 2: Lấy địa chỉ IP
Mở CMD và gõ:
```cmd
ipconfig
```
Tìm dòng "IPv4 Address", ví dụ: **172.240.24.192**

### Bước 3: Chia sẻ với người khác

**Cách A - Dùng QR Code (Dễ nhất):**
1. Truy cập: http://localhost:3000
2. Nhấn nút **"🔗 Xem QR Code & Hướng dẫn"** ở đầu trang
3. Cho người khác quét QR Code bằng camera điện thoại
4. Họ sẽ được dẫn đến trang web
5. Nhấn nút **"📱 Tải Ứng Dụng"** → Cài đặt → Xong!

**Cách B - Gửi link trực tiếp:**
- Gửi link: **http://172.240.24.192:3000** (thay IP của bạn)
- Người nhận mở link → Nhấn "Tải Ứng Dụng" → Cài đặt

**⚠️ Lưu ý:** 
- Điện thoại phải cùng mạng WiFi với máy bạn
- Server phải đang chạy (npm start)

---

## 📦 Cách 2: Gửi file ZIP (Cho người ở xa)

### Bước 1: Nén project
File **QuanLyHocSinhViPham.zip** đã có sẵn trong thư mục

### Bước 2: Upload lên dịch vụ chia sẻ
Chọn một trong các dịch vụ:
- **Google Drive**: drive.google.com → Upload → Chia sẻ link
- **Dropbox**: dropbox.com → Upload → Tạo link
- **WeTransfer**: wetransfer.com (miễn phí, không cần đăng ký)
- **Send Anywhere**: send-anywhere.com

### Bước 3: Gửi link cho người khác

### Bước 4: Hướng dẫn người nhận
1. Tải file ZIP về
2. Giải nén
3. Cài Node.js (nếu chưa có): https://nodejs.org
4. Mở CMD tại thư mục đã giải nén
5. Chạy: `npm install`
6. Chạy: `npm start`
7. Truy cập: http://localhost:3000
8. Nhấn "Tải Ứng Dụng" → Cài đặt

---

## 🌍 Cách 3: Deploy lên Internet (Dùng lâu dài)

Để mọi người ở đâu cũng truy cập được, bạn cần deploy lên hosting:

### Option A: Vercel (Miễn phí, dễ nhất)
1. Tạo tài khoản: https://vercel.com
2. Cài Vercel CLI: `npm install -g vercel`
3. Chạy: `vercel`
4. Làm theo hướng dẫn
5. Nhận link: https://your-app.vercel.app

### Option B: Render (Miễn phí)
1. Tạo tài khoản: https://render.com
2. Tạo Git repository (GitHub/GitLab)
3. Push code lên
4. Kết nối với Render
5. Deploy tự động

### Option C: Railway (Miễn phí)
1. Tạo tài khoản: https://railway.app
2. Tạo project mới
3. Deploy từ GitHub hoặc upload code
4. Nhận link public

**Sau khi deploy:**
- Gửi link cho mọi người
- Họ truy cập → Nhấn "Tải Ứng Dụng" → Cài đặt
- Không cần cùng WiFi, không cần chạy server

---

## 📊 So sánh các cách:

| Cách | Ưu điểm | Nhược điểm | Phù hợp |
|------|---------|------------|---------|
| **WiFi + QR Code** | Nhanh, dễ, không cần upload | Cùng mạng, server phải chạy | Trong trường, văn phòng |
| **Gửi ZIP** | Offline, toàn quyền kiểm soát | Người nhận phải cài Node.js | Ít người, kỹ thuật |
| **Deploy Internet** | Truy cập mọi lúc, mọi nơi | Cần tài khoản hosting | Nhiều người, lâu dài |

---

## 💡 Khuyến nghị:

- **Trong trường/công ty**: Dùng Cách 1 (WiFi + QR Code)
- **Gửi cho vài người**: Dùng Cách 2 (ZIP file)
- **Sử dụng lâu dài**: Dùng Cách 3 (Deploy)

---

## 🆘 Xử lý sự cố:

### Không truy cập được qua IP:
- Kiểm tra tường lửa (Firewall)
- Tắt tạm thời: Control Panel → Windows Defender Firewall → Turn off
- Hoặc thêm rule cho port 3000

### QR Code không hoạt động:
- Đảm bảo cùng mạng WiFi
- Thử nhập link thủ công

### Không thấy nút "Tải Ứng Dụng":
- Dùng Chrome hoặc Edge (không phải Firefox)
- Trên iOS: Dùng Safari, nhấn "Chia sẻ" → "Thêm vào Màn hình chính"
