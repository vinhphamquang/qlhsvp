# 🍃 Hướng dẫn cài đặt MongoDB Atlas

## 📋 Tổng quan

MongoDB Atlas là dịch vụ database cloud miễn phí, phù hợp để deploy ứng dụng lên internet.

## 🚀 Bước 1: Tạo tài khoản MongoDB Atlas

1. Truy cập: https://www.mongodb.com/cloud/atlas/register
2. Đăng ký tài khoản miễn phí
3. Xác nhận email

## 🗄️ Bước 2: Tạo Cluster

1. Sau khi đăng nhập, nhấn **"Build a Database"**
2. Chọn **"M0 FREE"** (512MB miễn phí)
3. Chọn **Provider**: AWS
4. Chọn **Region**: Singapore (gần Việt Nam nhất)
5. Đặt tên Cluster: `qlhsvp-cluster`
6. Nhấn **"Create"**

## 👤 Bước 3: Tạo Database User

1. Trong phần **Security** → **Database Access**
2. Nhấn **"Add New Database User"**
3. Chọn **"Password"**
4. Username: `qlhsvp_admin`
5. Password: Tạo password mạnh (lưu lại)
6. Database User Privileges: **"Read and write to any database"**
7. Nhấn **"Add User"**

## 🌐 Bước 4: Whitelist IP Address

1. Trong phần **Security** → **Network Access**
2. Nhấn **"Add IP Address"**
3. Chọn **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Nhấn **"Confirm"**

⚠️ **Lưu ý**: Trong production, nên chỉ cho phép IP cụ thể

## 🔗 Bước 5: Lấy Connection String

1. Quay lại **Database** → Nhấn **"Connect"**
2. Chọn **"Connect your application"**
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Copy **Connection String**, ví dụ:
   ```
   mongodb+srv://qlhsvp_admin:<password>@qlhsvp-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## ⚙️ Bước 6: Cấu hình ứng dụng

### 6.1. Cài đặt thư viện

```cmd
npm install
```

### 6.2. Tạo file .env

Tạo file `.env` trong thư mục gốc:

```env
MONGODB_URI=mongodb+srv://qlhsvp_admin:YOUR_PASSWORD@qlhsvp-cluster.xxxxx.mongodb.net/qlhsvp?retryWrites=true&w=majority
PORT=3000
NODE_ENV=production
```

**Thay thế:**
- `YOUR_PASSWORD`: Password bạn đã tạo ở Bước 3
- `xxxxx`: Cluster ID của bạn

### 6.3. Chạy với MongoDB

```cmd
node server-mongodb.js
```

## ✅ Bước 7: Kiểm tra kết nối

Nếu thành công, bạn sẽ thấy:
```
✅ Đã kết nối MongoDB thành công!
✅ Đã khởi tạo dữ liệu mặc định
Server đang chạy tại http://localhost:3000
```

## 🔄 Chuyển đổi giữa JSON và MongoDB

### Dùng JSON (hiện tại):
```cmd
npm start
```
hoặc
```cmd
node server.js
```

### Dùng MongoDB:
```cmd
node server-mongodb.js
```

## 📊 Xem dữ liệu trong MongoDB Atlas

1. Vào **Database** → **Browse Collections**
2. Chọn database `qlhsvp`
3. Xem các collections:
   - `violations`: Vi phạm hiện tại
   - `violationtypes`: Loại vi phạm
   - `archivedyears`: Năm học đã lưu trữ

## 🚀 Deploy lên Render với MongoDB

### 1. Cập nhật package.json

Đổi script start:
```json
"scripts": {
  "start": "node server-mongodb.js"
}
```

### 2. Thêm biến môi trường trên Render

1. Vào Render Dashboard
2. Chọn service của bạn
3. **Environment** → **Add Environment Variable**
4. Thêm:
   - Key: `MONGODB_URI`
   - Value: Connection string của bạn

### 3. Deploy

Render sẽ tự động deploy với MongoDB Atlas!

## 💡 Lợi ích MongoDB Atlas

✅ **Miễn phí 512MB** - Đủ cho hàng nghìn vi phạm
✅ **Tự động backup** - Không lo mất dữ liệu
✅ **Truy cập từ mọi nơi** - Không cần VPN
✅ **Nhanh** - Server ở Singapore
✅ **Dễ scale** - Nâng cấp khi cần
✅ **Bảo mật** - Mã hóa dữ liệu

## 🔒 Bảo mật

### Nên làm:
- ✅ Dùng password mạnh
- ✅ Giữ bí mật file `.env`
- ✅ Không commit `.env` lên Git
- ✅ Thay đổi password định kỳ

### Không nên:
- ❌ Share connection string công khai
- ❌ Dùng password đơn giản
- ❌ Allow all IP trong production

## 🆘 Xử lý sự cố

### Lỗi: "MongoServerError: bad auth"
→ Sai username/password, kiểm tra lại

### Lỗi: "MongooseServerSelectionError"
→ Kiểm tra:
- IP đã được whitelist chưa
- Connection string đúng chưa
- Internet có hoạt động không

### Lỗi: "Database name is required"
→ Thêm `/qlhsvp` vào connection string

## 📞 Hỗ trợ

- MongoDB Docs: https://docs.mongodb.com
- MongoDB University: https://university.mongodb.com (khóa học miễn phí)
- Community: https://community.mongodb.com
