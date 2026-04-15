# 📚 Quản Lý Học Sinh Vi Phạm

Hệ thống quản lý kỷ luật học sinh chuyên nghiệp dành cho giáo viên.

## 🎯 Hai phiên bản lưu trữ:
- **File JSON** (server.js) - Đơn giản, chạy ngay, lưu trên máy
- **MongoDB Atlas** (server-mongodb.js) - Lưu đám mây, truy cập mọi nơi

## ✨ Tính năng

- ✅ Đăng nhập với email và họ tên
- ✅ Ghi nhận vi phạm học sinh (tự động điền STT và năm học)
- ✅ Chỉnh sửa và xóa vi phạm
- ✅ Lọc vi phạm theo khối, lớp, tên học sinh
- ✅ Quản lý danh sách loại vi phạm
- ✅ Xem lịch sử hoạt động (ai làm gì, khi nào)
- ✅ Xuất báo cáo Excel với định dạng đẹp
- ✅ Lưu trữ theo năm học
- ✅ Xem lại dữ liệu các năm trước
- ✅ Đồng bộ dữ liệu tự động giữa các thiết bị (mỗi 3 giây)
- ✅ Cài đặt như app (PWA)
- ✅ Hoạt động offline

---

## 🚀 HƯỚNG DẪN CHẠY CHO MÁY MỚI

### Bước 1: Cài đặt Node.js

1. Truy cập: https://nodejs.org
2. Tải phiên bản **LTS** (khuyến nghị)
3. Chạy file cài đặt và làm theo hướng dẫn
4. Kiểm tra cài đặt thành công:
   ```cmd
   node --version
   npm --version
   ```
   Nếu hiển thị số phiên bản → Thành công!

### Bước 2: Tải mã nguồn

**Cách 1: Tải ZIP**
1. Tải file ZIP của dự án
2. Giải nén vào thư mục bạn muốn (ví dụ: `D:\qlhsvp`)

**Cách 2: Clone từ Git** (nếu có)
```cmd
git clone [URL_REPOSITORY]
cd quan-ly-hoc-sinh-vi-pham
```

### Bước 3: Mở Command Prompt tại thư mục dự án

**Cách 1:**
1. Mở thư mục dự án trong File Explorer
2. Nhấn vào thanh địa chỉ, gõ `cmd` và Enter

**Cách 2:**
1. Mở Command Prompt (Win + R → gõ `cmd` → Enter)
2. Di chuyển đến thư mục dự án:
   ```cmd
   cd D:\qlhsvp
   ```

### Bước 4: Cài đặt thư viện

Chạy lệnh sau (chỉ cần chạy 1 lần khi cài đặt):
```cmd
npm install
```

Đợi khoảng 1-2 phút để tải và cài đặt tất cả thư viện cần thiết.

### Bước 5: Chọn phiên bản và chạy

#### ⭐ PHIÊN BẢN 1: File JSON (Khuyến nghị cho người mới)

**Ưu điểm:**
- Đơn giản, không cần cấu hình
- Chạy ngay lập tức
- Dữ liệu lưu trên máy

**Chạy server:**
```cmd
npm start
```

**Kết quả:** Sẽ thấy thông báo:
```
Server đang chạy tại http://localhost:3000
Hoặc truy cập qua mạng tại: http://[YOUR_IP]:3000
```

#### ⭐ PHIÊN BẢN 2: MongoDB Atlas (Lưu trữ đám mây)

**Ưu điểm:**
- Dữ liệu lưu trên cloud
- Truy cập từ mọi nơi
- Tự động backup

**Các bước:**

1. **Tạo tài khoản MongoDB Atlas** (miễn phí):
   - Truy cập: https://www.mongodb.com/cloud/atlas/register
   - Đăng ký tài khoản miễn phí
   - Tạo cluster (chọn FREE tier)
   - Tạo database user (username: tranphu1, password: 12345)
   - Whitelist IP: 0.0.0.0/0 (cho phép tất cả IP)

2. **Lấy Connection String:**
   - Nhấn "Connect" → "Connect your application"
   - Copy connection string
   - Thay `<password>` bằng mật khẩu thật

3. **Cập nhật file `.env`:**
   ```
   MONGODB_URI=mongodb+srv://tranphu1:12345@cluster0.xxxxx.mongodb.net/qlhsvp?retryWrites=true&w=majority
   PORT=3000
   ```

4. **Test kết nối:**
   ```cmd
   npm run test:mongodb
   ```
   Nếu thấy "✅ Kết nối MongoDB thành công!" → OK!

5. **Chạy server:**
   ```cmd
   npm run start:mongodb
   ```

**Xem hướng dẫn chi tiết:** `SETUP_MONGODB_NHANH.md`

### Bước 6: Truy cập ứng dụng

1. Mở trình duyệt (Chrome, Edge, Firefox...)
2. Truy cập: **http://localhost:3000**
3. Đăng nhập với email và họ tên của bạn
4. Bắt đầu sử dụng!

---

## 📱 Chia sẻ với đồng nghiệp

### Trong cùng mạng WiFi:

1. **Tìm địa chỉ IP của máy:**
   ```cmd
   ipconfig
   ```
   Tìm dòng "IPv4 Address" (ví dụ: 192.168.1.100)

2. **Chia sẻ link:**
   - Gửi cho đồng nghiệp: `http://192.168.1.100:3000`
   - Hoặc dùng QR Code trong app (nhấn "🔗 Xem QR Code")

3. **Lưu ý:**
   - Máy chủ phải bật và chạy server
   - Cùng mạng WiFi
   - Tắt firewall nếu không kết nối được

### Deploy lên Internet:

Xem hướng dẫn trong `docs/DEPLOY_INTERNET.md` để:
- Deploy lên Render.com (miễn phí)
- Deploy lên Vercel (miễn phí)
- Truy cập từ mọi nơi có internet


---

## 📖 Hướng dẫn sử dụng chi tiết

### 1. Đăng nhập lần đầu
- Nhập **họ và tên** của bạn
- Nhập **email** đúng định dạng (ví dụ: giaovien@gmail.com)
- Nhấn "✅ Đăng nhập"
- Thông tin sẽ được lưu, lần sau không cần nhập lại

### 2. Thêm vi phạm mới
1. Nhập họ tên học sinh
2. Nhập lớp (ví dụ: 6A, 7B, 8C, 9D)
3. Chọn các vi phạm từ danh sách (có thể chọn nhiều)
4. Nhấn "Lưu Vi Phạm"

### 3. Chỉnh sửa vi phạm
- Nhấn nút **✏️** bên cạnh vi phạm cần sửa
- Sửa thông tin trong cửa sổ hiện ra
- Nhấn "Cập nhật"

### 4. Xóa vi phạm
- Nhấn nút **🗑️** bên cạnh vi phạm cần xóa
- Xác nhận xóa

### 5. Lọc và tìm kiếm
- **Lọc theo khối:** Chọn khối 6, 7, 8, hoặc 9
- **Lọc theo lớp:** Nhập tên lớp (ví dụ: 6A)
- **Tìm học sinh:** Nhập tên học sinh
- Nhấn "🔄 Xóa lọc" để hiển thị lại tất cả

### 6. Xem lịch sử hoạt động
- Nhấn nút **"📜 Lịch sử"**
- Xem ai đã làm gì, khi nào
- Mỗi hành động có màu sắc riêng để dễ phân biệt

### 7. Xuất Excel
- Nhấn **"📥 Xuất Excel"** để tải báo cáo
- File Excel có định dạng đẹp, sẵn sàng in

### 8. Kết thúc năm học
1. Nhấn **"🎓 Kết thúc năm học"**
2. Chọn năm cần kết thúc
3. Hệ thống tự động chuyển sang năm mới
4. Dữ liệu năm cũ được lưu trữ an toàn

### 9. Xem năm cũ
1. Nhấn **"📂 Xem năm cũ"**
2. Chọn năm muốn xem
3. Có thể xuất Excel riêng cho năm đó
4. Có thể xóa năm học (cẩn thận, không thể hoàn tác!)

### 10. Cài đặt như App

**Trên máy tính (Chrome/Edge):**
1. Nhấn biểu tượng **⊕** trên thanh địa chỉ
2. Hoặc nhấn nút **📱** (hình tròn) ở góc dưới bên phải
3. Chọn "Cài đặt"

**Trên Android:**
1. Menu **⋮** → "Thêm vào màn hình chính"

**Trên iOS (Safari):**
1. Nút Chia sẻ **⬆️** → "Thêm vào Màn hình chính"

---

## 🔧 Các lệnh hữu ích

```cmd
# Cài đặt thư viện
npm install

# Chạy phiên bản File JSON
npm start

# Test kết nối MongoDB
npm run test:mongodb

# Chạy phiên bản MongoDB
npm run start:mongodb

# Kiểm tra phiên bản Node.js
node --version

# Kiểm tra phiên bản npm
npm --version
```

---

## 📂 Cấu trúc dự án

```
quan-ly-hoc-sinh-vi-pham/
├── public/              # Frontend (Giao diện người dùng)
│   ├── index.html      # Trang chính
│   ├── app.js          # Logic xử lý
│   ├── style.css       # Thiết kế giao diện
│   ├── qr-code.html    # Trang QR Code chia sẻ
│   ├── service-worker.js # PWA offline support
│   ├── manifest.json   # PWA configuration
│   ├── icon-192.svg    # Icon app 192x192
│   └── icon-512.svg    # Icon app 512x512
├── models/             # MongoDB Schemas
│   ├── Violation.js    # Schema vi phạm
│   ├── ViolationType.js # Schema loại vi phạm
│   ├── ArchivedYear.js # Schema năm lưu trữ
│   ├── User.js         # Schema người dùng
│   └── ActivityLog.js  # Schema lịch sử hoạt động
├── archives/           # Lưu trữ năm học cũ (JSON)
├── docs/              # Tài liệu hướng dẫn
│   ├── DEPLOY_INTERNET.md
│   ├── DEPLOY_NHANH.md
│   ├── HUONG_DAN_CAI_DAT_PWA.md
│   ├── HUONG_DAN_CHIA_SE.md
│   ├── HUONG_DAN_MONGODB.md
│   ├── HUONG_DAN_SU_DUNG.md
│   ├── TINH_NANG_DONG_BO.md
│   ├── TINH_NANG_LUU_TRU_NAM.md
│   └── XU_LY_CACHE.md
├── server.js          # Backend với File JSON
├── server-mongodb.js  # Backend với MongoDB Atlas
├── test-mongodb.js    # Test kết nối MongoDB
├── .env               # Cấu hình MongoDB (tạo từ .env.example)
├── .env.example       # Mẫu file cấu hình
├── package.json       # Dependencies và scripts
├── data.json          # Database JSON (tự tạo khi chạy)
├── users.json         # Danh sách users (tự tạo)
├── activity-logs.json # Lịch sử hoạt động (tự tạo)
├── BAT_DAU_NHANH.md   # Hướng dẫn bắt đầu nhanh
├── BUOC_TIEP_THEO.md  # Các bước tiếp theo
├── CAU_TRUC_DU_AN.md  # Cấu trúc dự án chi tiết
├── SETUP_MONGODB_NHANH.md # Setup MongoDB nhanh
└── README.md          # File này
```

---

## 🔧 Công nghệ sử dụng

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + CSS3 + JavaScript (Vanilla)
- **Database**: 
  - File JSON (mặc định - đơn giản)
  - MongoDB Atlas (tùy chọn - cloud)
- **PWA**: Service Worker + Web App Manifest
- **Export**: ExcelJS (xuất báo cáo Excel)
- **Icons**: SVG (nhẹ và sắc nét)

---

## 📝 Lưu ý quan trọng

### Phiên bản File JSON:
✅ **Ưu điểm:**
- Đơn giản, không cần cấu hình
- Chạy ngay lập tức
- Không cần internet (sau khi cài đặt)
- Dữ liệu lưu trên máy, kiểm soát hoàn toàn

⚠️ **Lưu ý:**
- Dữ liệu lưu trong file `data.json`
- Năm cũ lưu trong thư mục `archives/`
- Nên backup định kỳ (copy file data.json)
- Server phải chạy để app hoạt động
- Chỉ truy cập được trong mạng nội bộ

### Phiên bản MongoDB Atlas:
✅ **Ưu điểm:**
- Dữ liệu lưu trên cloud
- Truy cập từ mọi nơi có internet
- Tự động backup
- Nhiều người dùng cùng lúc
- Đồng bộ realtime

⚠️ **Lưu ý:**
- Cần internet để hoạt động
- Cần tạo tài khoản MongoDB Atlas
- Cần cấu hình file `.env`
- Free tier: 512MB storage

---

## 🆘 Xử lý sự cố thường gặp

### 1. Lỗi "npm không được nhận dạng"
**Nguyên nhân:** Chưa cài Node.js hoặc chưa thêm vào PATH

**Giải pháp:**
- Cài đặt lại Node.js từ https://nodejs.org
- Chọn "Add to PATH" khi cài đặt
- Khởi động lại Command Prompt

### 2. Lỗi "Cannot find module"
**Nguyên nhân:** Chưa cài đặt thư viện

**Giải pháp:**
```cmd
npm install
```

### 3. Lỗi "Port 3000 already in use"
**Nguyên nhân:** Port 3000 đang được sử dụng

**Giải pháp:**
- Tắt ứng dụng đang dùng port 3000
- Hoặc đổi port trong file `server.js` hoặc `server-mongodb.js`:
  ```javascript
  const PORT = process.env.PORT || 3001; // Đổi thành 3001
  ```

### 4. Không kết nối được MongoDB
**Nguyên nhân:** Sai connection string hoặc IP chưa được whitelist

**Giải pháp:**
- Kiểm tra file `.env`
- Kiểm tra username/password
- Whitelist IP: 0.0.0.0/0 trong MongoDB Atlas
- Chạy test: `npm run test:mongodb`

### 5. Dữ liệu bị mất
**Nguyên nhân:** Xóa nhầm file hoặc lỗi hệ thống

**Giải pháp:**
- Restore từ file backup `data.json`
- Restore từ thư mục `archives/` (nếu đã lưu trữ năm)
- Với MongoDB: dữ liệu vẫn còn trên cloud

### 6. Không thấy cập nhật mới
**Nguyên nhân:** Cache của trình duyệt

**Giải pháp:**
- Nhấn **Ctrl + F5** (Windows) hoặc **Cmd + Shift + R** (Mac)
- Hoặc xóa cache trong Settings của trình duyệt

### 7. Không chia sẻ được với đồng nghiệp
**Nguyên nhân:** Firewall chặn hoặc không cùng mạng

**Giải pháp:**
- Kiểm tra cùng mạng WiFi
- Tắt Firewall tạm thời
- Kiểm tra IP đúng: `ipconfig`

---

## 📞 Hỗ trợ và tài liệu

### Tài liệu chi tiết:
Xem thêm trong thư mục `docs/`:
- `BAT_DAU_NHANH.md` - Bắt đầu nhanh trong 5 phút
- `SETUP_MONGODB_NHANH.md` - Setup MongoDB Atlas
- `HUONG_DAN_SU_DUNG.md` - Hướng dẫn sử dụng đầy đủ
- `HUONG_DAN_CHIA_SE.md` - Chia sẻ với đồng nghiệp
- `HUONG_DAN_CAI_DAT_PWA.md` - Cài đặt như app
- `DEPLOY_INTERNET.md` - Deploy lên internet
- `TINH_NANG_DONG_BO.md` - Tính năng đồng bộ
- `TINH_NANG_LUU_TRU_NAM.md` - Lưu trữ theo năm
- `XU_LY_CACHE.md` - Xử lý cache và cập nhật

### Trong app:
- Nhấn nút **"❓ Hướng dẫn sử dụng"** trong header
- Xem hướng dẫn chi tiết 12 phần với ảnh minh họa

---

## 🎯 Roadmap (Tính năng tương lai)

- [ ] Thống kê vi phạm theo biểu đồ
- [ ] Gửi thông báo qua email
- [ ] Import dữ liệu từ Excel
- [ ] Xuất PDF
- [ ] Phân quyền người dùng (Admin/Teacher)
- [ ] Tích hợp với hệ thống điểm danh
- [ ] App mobile native (Android/iOS)

---

## 📄 License

MIT License - Tự do sử dụng, chỉnh sửa và phân phối

---

## 👨‍💻 Phát triển bởi

Hệ thống Quản Lý Học Sinh Vi Phạm
Version 2.0 - 2025

---

## 🙏 Cảm ơn

Cảm ơn bạn đã sử dụng hệ thống! Nếu có góp ý hoặc báo lỗi, vui lòng liên hệ.

**Chúc bạn sử dụng hiệu quả! 🎉**
