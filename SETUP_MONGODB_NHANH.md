# ⚡ Setup MongoDB Atlas Nhanh (5 phút)

## 🎯 Thông tin đã chuẩn bị:
- **Username**: tranphu
- **Password**: 12345
- **Database**: qlhsvp

## 📋 Các bước thực hiện:

### Bước 1: Tạo tài khoản MongoDB Atlas (2 phút)

1. Mở trình duyệt, vào: **https://www.mongodb.com/cloud/atlas/register**

2. Đăng ký bằng:
   - Email của bạn
   - Hoặc đăng nhập bằng Google (nhanh hơn)

3. Xác nhận email nếu cần

### Bước 2: Tạo Cluster miễn phí (1 phút)

1. Sau khi đăng nhập, nhấn **"+ Create"** hoặc **"Build a Database"**

2. Chọn gói **"M0 FREE"** (512MB miễn phí)
   - Nhấn **"Create"** ở gói FREE

3. Cấu hình:
   - **Provider**: AWS (mặc định)
   - **Region**: Singapore (ap-southeast-1) - Gần VN nhất
   - **Cluster Name**: Cluster0 (mặc định)

4. Nhấn **"Create Cluster"** (đợi 1-3 phút)

### Bước 3: Tạo Database User (30 giây)

1. Trong khi đợi cluster, một popup sẽ hiện ra
   
2. Hoặc vào **Security** → **Database Access** → **"+ ADD NEW DATABASE USER"**

3. Điền thông tin:
   - **Authentication Method**: Password
   - **Username**: `tranphu`
   - **Password**: `12345`
   - **Database User Privileges**: **"Read and write to any database"**

4. Nhấn **"Add User"**

### Bước 4: Cho phép truy cập (30 giây)

1. Vào **Security** → **Network Access** → **"+ ADD IP ADDRESS"**

2. Chọn **"ALLOW ACCESS FROM ANYWHERE"**
   - Hoặc nhập: `0.0.0.0/0`

3. Nhấn **"Confirm"**

### Bước 5: Lấy Connection String (1 phút)

1. Vào **Database** → Nhấn nút **"Connect"** của Cluster0

2. Chọn **"Drivers"** (hoặc "Connect your application")

3. Chọn:
   - **Driver**: Node.js
   - **Version**: 5.5 or later

4. Copy **Connection String**, sẽ giống như:
   ```
   mongodb+srv://tranphu:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **QUAN TRỌNG**: Thay `<password>` bằng `12345` và thêm `/qlhsvp` trước dấu `?`
   
   Kết quả cuối cùng:
   ```
   mongodb+srv://tranphu:12345@cluster0.xxxxx.mongodb.net/qlhsvp?retryWrites=true&w=majority
   ```

### Bước 6: Cập nhật file .env

1. Mở file `.env` trong thư mục dự án

2. Thay dòng `MONGODB_URI=...` bằng connection string vừa lấy:
   ```env
   MONGODB_URI=mongodb+srv://tranphu:12345@cluster0.XXXXX.mongodb.net/qlhsvp?retryWrites=true&w=majority
   ```
   
   **Chú ý**: Thay `XXXXX` bằng cluster ID thực tế của bạn

3. Lưu file

### Bước 7: Cài đặt và chạy (1 phút)

```cmd
npm install
node server-mongodb.js
```

Nếu thành công, bạn sẽ thấy:
```
✅ Đã kết nối MongoDB thành công!
✅ Đã khởi tạo dữ liệu mặc định
Server đang chạy tại http://localhost:3000
```

## ✅ Hoàn tất!

Giờ bạn có thể:
- Truy cập: http://localhost:3000
- Dữ liệu lưu trên MongoDB Atlas
- Truy cập từ mọi nơi
- Tự động backup

## 🔍 Kiểm tra dữ liệu

1. Vào MongoDB Atlas Dashboard
2. **Database** → **Browse Collections**
3. Chọn database `qlhsvp`
4. Xem các collections:
   - `violations` - Vi phạm
   - `violationtypes` - Loại vi phạm
   - `archivedyears` - Năm cũ

## 🆘 Nếu gặp lỗi:

### Lỗi: "MongoServerError: bad auth"
→ Sai username/password
→ Kiểm tra lại: tranphu / 12345

### Lỗi: "MongooseServerSelectionError"
→ Chưa whitelist IP
→ Quay lại Bước 4

### Lỗi: "Cannot find module 'mongoose'"
→ Chạy: `npm install`

## 📞 Cần hỗ trợ?

Chụp màn hình lỗi và hỏi tôi!
