# 🎯 Các bước tiếp theo để hoàn tất MongoDB Atlas

## ✅ Đã hoàn thành:
- ✅ Cài đặt mongoose và dotenv
- ✅ Tạo 3 models: Violation, ViolationType, ArchivedYear
- ✅ Tạo server-mongodb.js với đầy đủ API
- ✅ Tạo file .env với thông tin: username=tranphu, password=12345
- ✅ Tạo script test kết nối: test-mongodb.js
- ✅ Cập nhật package.json với scripts mới

## 🔴 Cần bạn làm (5 phút):

### Bước 1: Tạo MongoDB Atlas Cluster
📖 Đọc hướng dẫn chi tiết: `SETUP_MONGODB_NHANH.md`

Tóm tắt:
1. Vào https://www.mongodb.com/cloud/atlas/register
2. Đăng ký/đăng nhập (có thể dùng Google)
3. Tạo cluster miễn phí (M0 FREE)
4. Chọn region: Singapore (gần VN nhất)
5. Tạo user: tranphu / 12345
6. Whitelist IP: 0.0.0.0/0 (cho phép mọi IP)

### Bước 2: Lấy Connection String
1. Nhấn nút "Connect" ở cluster
2. Chọn "Drivers" → Node.js
3. Copy connection string
4. Sẽ có dạng: `mongodb+srv://tranphu:<password>@cluster0.xxxxx.mongodb.net/...`

### Bước 3: Cập nhật file .env
1. Mở file `.env`
2. Thay `xxxxx` bằng cluster ID thực tế của bạn
3. Đảm bảo có `/qlhsvp` trước dấu `?`

Ví dụ:
```env
MONGODB_URI=mongodb+srv://tranphu:12345@cluster0.abc123.mongodb.net/qlhsvp?retryWrites=true&w=majority
```

### Bước 4: Test kết nối
```cmd
npm run test:mongodb
```

Nếu thấy "✅ KẾT NỐI THÀNH CÔNG!" → Hoàn tất!

### Bước 5: Chạy server MongoDB
```cmd
npm run start:mongodb
```

## 🎉 Sau khi hoàn tất:

Bạn sẽ có:
- ✅ Dữ liệu lưu trên đám mây MongoDB Atlas
- ✅ Truy cập từ mọi nơi (không cần cùng WiFi)
- ✅ Tự động backup
- ✅ Miễn phí 512MB

## 🔄 Nếu muốn quay lại dùng File JSON:

```cmd
npm start
```

Dữ liệu sẽ lưu trong file `data.json` như cũ.

## 🆘 Gặp vấn đề?

### Lỗi "bad auth":
→ Sai username/password
→ Kiểm tra lại: tranphu / 12345

### Lỗi "MongooseServerSelectionError":
→ Chưa whitelist IP
→ Vào Network Access → Add IP → 0.0.0.0/0

### Lỗi "Cannot find module":
→ Chạy: `npm install`

### Connection string vẫn có "xxxxx":
→ Chưa cập nhật file .env
→ Phải thay bằng cluster ID thực tế

## 📞 Cần hỗ trợ thêm?

Chụp màn hình lỗi và hỏi tôi!
