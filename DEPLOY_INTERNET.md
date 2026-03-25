# 🌍 Hướng Dẫn Deploy Lên Internet

## 🎯 Mục tiêu
Sau khi deploy, mọi người ở đâu cũng có thể truy cập qua link như:
- https://your-app.vercel.app
- https://your-app.onrender.com
- https://your-app.railway.app

## ⚡ Cách 1: Render.com (Khuyến nghị - Dễ nhất)

### Bước 1: Chuẩn bị
Không cần làm gì, project đã sẵn sàng!

### Bước 2: Tạo tài khoản
1. Truy cập: https://render.com
2. Nhấn "Get Started" → Đăng ký bằng GitHub/Google

### Bước 3: Upload code
**Cách A - Dùng GitHub (Khuyến nghị):**
1. Tạo repository trên GitHub
2. Upload code lên
3. Kết nối Render với GitHub

**Cách B - Upload trực tiếp:**
1. Nén project thành ZIP
2. Upload lên Render

### Bước 4: Deploy
1. Nhấn "New +" → "Web Service"
2. Chọn repository hoặc upload ZIP
3. Điền thông tin:
   - **Name**: quan-ly-hoc-sinh-vi-pham
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Nhấn "Create Web Service"
5. Đợi 2-3 phút

### Bước 5: Nhận link
Bạn sẽ nhận được link như: https://quan-ly-hoc-sinh-vi-pham.onrender.com

### ⚠️ Lưu ý Render:
- Miễn phí nhưng app sẽ "ngủ" sau 15 phút không dùng
- Lần đầu truy cập sau khi ngủ sẽ chậm (30 giây)
- Phù hợp cho sử dụng trong trường học

---

## 🚀 Cách 2: Railway.app (Nhanh, ổn định)

### Bước 1: Tạo tài khoản
1. Truy cập: https://railway.app
2. Đăng nhập bằng GitHub

### Bước 2: Deploy
1. Nhấn "New Project"
2. Chọn "Deploy from GitHub repo"
3. Chọn repository của bạn
4. Railway tự động detect và deploy
5. Nhận link: https://your-app.railway.app

### ⚠️ Lưu ý Railway:
- Miễn phí $5 credit/tháng
- Không bị ngủ như Render
- Nhanh và ổn định hơn

---

## 🔷 Cách 3: Vercel (Nhanh nhất)

### ⚠️ Lưu ý quan trọng:
Vercel chủ yếu cho frontend, cần chỉnh code một chút để chạy được.

### Bước 1: Cài Vercel CLI
```cmd
npm install -g vercel
```

### Bước 2: Deploy
```cmd
vercel
```

Làm theo hướng dẫn, nhận link: https://your-app.vercel.app

---

## 🐙 Cách 4: Dùng GitHub + Render (Chi tiết)

### Bước 1: Tạo GitHub repository
1. Truy cập: https://github.com
2. Nhấn "New repository"
3. Đặt tên: `quan-ly-hoc-sinh-vi-pham`
4. Nhấn "Create repository"

### Bước 2: Upload code lên GitHub
Mở CMD tại thư mục project:

```cmd
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[username]/quan-ly-hoc-sinh-vi-pham.git
git push -u origin main
```

### Bước 3: Kết nối với Render
1. Vào Render.com
2. Nhấn "New +" → "Web Service"
3. Chọn "Connect GitHub"
4. Chọn repository vừa tạo
5. Điền thông tin và deploy

---

## 📱 Sau khi deploy thành công

### Chia sẻ với mọi người:
1. Gửi link: https://your-app.onrender.com
2. Họ mở link trên điện thoại/máy tính
3. Nhấn nút "📱 Tải Ứng Dụng"
4. Cài đặt và sử dụng!

### Lợi ích:
✅ Truy cập từ bất kỳ đâu (không cần cùng WiFi)
✅ Có link cố định, dễ chia sẻ
✅ Tự động có HTTPS (bảo mật)
✅ Dữ liệu tập trung
✅ Không cần chạy server trên máy

---

## 🔧 Xử lý sự cố

### Lỗi khi deploy:
1. Kiểm tra file `package.json` có đầy đủ dependencies
2. Đảm bảo có file `server.js`
3. Kiểm tra port: Dùng `process.env.PORT || 3000`

### App bị ngủ (Render):
- Nâng cấp lên plan trả phí ($7/tháng)
- Hoặc dùng Railway (ổn định hơn)

### Dữ liệu bị mất khi restart:
- Hiện tại dùng file JSON, sẽ mất khi restart
- Giải pháp: Dùng database (MongoDB, PostgreSQL)

---

## 💡 Khuyến nghị

### Cho trường học (ít người):
→ **Render.com** (miễn phí, đủ dùng)

### Cho nhiều người dùng:
→ **Railway.app** (ổn định, $5/tháng)

### Cần tốc độ cao:
→ **Vercel** (nhanh nhất, cần chỉnh code)

---

## 🎓 Nâng cao: Dùng Database thật

Nếu muốn dữ liệu không bị mất, cần dùng database:

### MongoDB Atlas (Miễn phí):
1. Tạo tài khoản: https://www.mongodb.com/cloud/atlas
2. Tạo cluster miễn phí
3. Lấy connection string
4. Thay đổi code để dùng MongoDB thay vì file JSON

### PostgreSQL (Render cung cấp miễn phí):
1. Tạo PostgreSQL database trên Render
2. Kết nối với app
3. Dữ liệu lưu vĩnh viễn

---

## 📞 Cần hỗ trợ?

Nếu gặp khó khăn khi deploy, có thể:
1. Xem video hướng dẫn trên YouTube
2. Đọc docs của Render/Railway
3. Hỏi trên diễn đàn lập trình
