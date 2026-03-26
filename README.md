# 📚 Quản Lý Học Sinh Vi Phạm

Hệ thống quản lý kỷ luật học sinh chuyên nghiệp dành cho giáo viên.

## 🎯 Hai phiên bản lưu trữ:
- **File JSON** (server.js) - Đơn giản, chạy ngay, lưu trên máy
- **MongoDB Atlas** (server-mongodb.js) - Lưu đám mây, truy cập mọi nơi

## ✨ Tính năng

- ✅ Ghi nhận vi phạm học sinh (tự động điền STT và năm học)
- ✅ Quản lý danh sách loại vi phạm
- ✅ Xuất báo cáo Excel
- ✅ Lưu trữ theo năm học
- ✅ Xem lại dữ liệu các năm trước
- ✅ Đồng bộ dữ liệu tự động giữa các thiết bị
- ✅ Cài đặt như app (PWA)
- ✅ Hoạt động offline

## 🚀 Cài đặt và chạy

### 1. Cài đặt Node.js
Tải và cài đặt từ: https://nodejs.org

### 2. Cài đặt thư viện
```cmd
npm install
```

### 3. Chọn phiên bản và chạy

#### Phiên bản File JSON (Khuyến nghị cho người mới):
```cmd
npm start
```

#### Phiên bản MongoDB Atlas (Lưu trữ đám mây):
```cmd
npm run test:mongodb
npm run start:mongodb
```

### 4. Truy cập
Mở trình duyệt: http://localhost:3000

## 🔄 Chuyển sang MongoDB Atlas

Nếu bạn muốn lưu dữ liệu trên đám mây (truy cập từ mọi nơi):

1. **Đọc hướng dẫn**: `SETUP_MONGODB_NHANH.md` (5 phút)
2. **Tạo MongoDB Atlas** cluster miễn phí
3. **Cập nhật** file `.env` với connection string
4. **Test kết nối**: `npm run test:mongodb`
5. **Chạy server**: `npm run start:mongodb`

Xem chi tiết trong `docs/HUONG_DAN_MONGODB.md`

## 📱 Cài đặt như App

### Trên máy tính (Chrome/Edge):
1. Nhấn biểu tượng cài đặt trên thanh địa chỉ
2. Hoặc nhấn nút "📱 Tải Ứng Dụng" ở góc dưới

### Trên điện thoại:
1. **Android**: Menu → "Thêm vào màn hình chính"
2. **iOS**: Chia sẻ → "Thêm vào Màn hình chính"

## 🌐 Chia sẻ với đồng nghiệp

### Cùng WiFi:
1. Tìm IP máy: `ipconfig`
2. Chia sẻ: `http://[IP]:3000`
3. Hoặc dùng QR Code trong app

### Deploy lên Internet:
Xem hướng dẫn trong thư mục `docs/`

## 📂 Cấu trúc dự án

```
quan-ly-hoc-sinh-vi-pham/
├── public/              # Frontend
│   ├── index.html      # Giao diện chính
│   ├── app.js          # Logic frontend
│   ├── style.css       # Thiết kế
│   ├── qr-code.html    # Trang QR Code
│   ├── service-worker.js # PWA offline
│   ├── manifest.json   # PWA config
│   └── icon-*.svg      # Icons
├── models/             # MongoDB Schemas
│   ├── Violation.js    # Schema vi phạm
│   ├── ViolationType.js # Schema loại vi phạm
│   └── ArchivedYear.js # Schema năm lưu trữ
├── archives/           # Lưu trữ năm học cũ (JSON)
├── docs/              # Tài liệu hướng dẫn
├── server.js          # Backend với File JSON
├── server-mongodb.js  # Backend với MongoDB
├── test-mongodb.js    # Test kết nối MongoDB
├── .env               # Cấu hình MongoDB
├── package.json       # Dependencies
├── data.json          # Database JSON (tự tạo)
└── README.md          # File này
```

## 🎯 Hướng dẫn sử dụng

### Thêm vi phạm:
1. Nhập họ tên và lớp học sinh
2. Chọn các vi phạm (có thể chọn nhiều)
3. Nhấn "Lưu Vi Phạm"

### Kết thúc năm học:
1. Nhấn "🎓 Kết thúc năm học"
2. Chọn năm cần kết thúc
3. Hệ thống tự động chuyển sang năm mới

### Xem năm cũ:
1. Nhấn "📂 Xem năm cũ"
2. Chọn năm muốn xem
3. Có thể xuất Excel riêng

### Xuất Excel:
- Nhấn "📥 Xuất Excel" để tải file

## 🔧 Công nghệ

- **Backend**: Node.js + Express
- **Frontend**: HTML + CSS + JavaScript
- **Database**: 
  - File JSON (mặc định - đơn giản)
  - MongoDB Atlas (tùy chọn - đám mây)
- **PWA**: Service Worker + Manifest
- **Export**: ExcelJS

## 📝 Lưu ý

### Phiên bản File JSON:
- Dữ liệu lưu trong file `data.json`
- Năm cũ lưu trong thư mục `archives/`
- Nên backup định kỳ
- Server phải chạy để app hoạt động

### Phiên bản MongoDB:
- Dữ liệu lưu trên MongoDB Atlas
- Truy cập từ mọi nơi
- Tự động backup
- Cần internet để hoạt động

## 🆘 Xử lý sự cố

### Không chạy được:
```cmd
npm install
npm start
```

### Port 3000 bị chiếm:
Đổi port trong `server.js`

### Mất dữ liệu:
Restore từ file backup `data.json`

## 📞 Hỗ trợ

Xem thêm tài liệu trong thư mục `docs/`:
- Hướng dẫn cài đặt PWA
- Hướng dẫn chia sẻ
- Hướng dẫn deploy
- Tính năng đồng bộ
- Tính năng lưu trữ năm

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa
