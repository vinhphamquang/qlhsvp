# 📁 Cấu trúc dự án

```
quan-ly-hoc-sinh-vi-pham/
│
├── 📂 public/                    # Frontend (giao diện người dùng)
│   ├── index.html               # Trang chính
│   ├── app.js                   # Logic JavaScript
│   ├── style.css                # Thiết kế giao diện
│   ├── qr-code.html             # Trang QR Code chia sẻ
│   ├── service-worker.js        # PWA - hoạt động offline
│   ├── manifest.json            # PWA - cấu hình app
│   ├── icon-192.svg             # Icon app (192x192)
│   └── icon-512.svg             # Icon app (512x512)
│
├── 📂 models/                    # MongoDB Schemas (cho phiên bản MongoDB)
│   ├── Violation.js             # Schema vi phạm
│   ├── ViolationType.js         # Schema loại vi phạm
│   └── ArchivedYear.js          # Schema năm đã lưu trữ
│
├── 📂 archives/                  # Lưu trữ dữ liệu năm học cũ (JSON)
│   ├── 2023-2024.json           # Dữ liệu năm 2023-2024
│   ├── 2024-2025.json           # Dữ liệu năm 2024-2025
│   └── ...                      # Các năm khác
│
├── 📂 docs/                      # Tài liệu hướng dẫn
│   ├── DEPLOY_INTERNET.md       # Hướng dẫn deploy lên internet
│   ├── DEPLOY_NHANH.md          # Hướng dẫn deploy nhanh
│   ├── HUONG_DAN_CAI_DAT_PWA.md # Hướng dẫn cài đặt PWA
│   ├── HUONG_DAN_CHIA_SE.md     # Hướng dẫn chia sẻ
│   ├── HUONG_DAN_MONGODB.md     # Hướng dẫn MongoDB Atlas
│   ├── HUONG_DAN_SU_DUNG.md     # Hướng dẫn sử dụng
│   ├── TINH_NANG_DONG_BO.md     # Tính năng đồng bộ
│   ├── TINH_NANG_LUU_TRU_NAM.md # Tính năng lưu trữ năm
│   └── XU_LY_CACHE.md           # Xử lý cache PWA
│
├── 📂 node_modules/              # Thư viện (tự động tạo)
│
├── 📄 server.js                  # Backend với File JSON
├── 📄 server-mongodb.js          # Backend với MongoDB Atlas
├── 📄 test-mongodb.js            # Script test kết nối MongoDB
├── 📄 .env                       # Cấu hình MongoDB (không commit)
├── 📄 .env.example               # Mẫu file .env
├── 📄 package.json               # Cấu hình dự án & dependencies
├── 📄 package-lock.json          # Lock dependencies version
├── 📄 data.json                  # Database JSON (tự động tạo)
├── 📄 .gitignore                 # Git ignore config
├── 📄 render.yaml                # Config deploy Render
├── 📄 vercel.json                # Config deploy Vercel
├── 📄 README.md                  # Tài liệu chính
├── 📄 SETUP_MONGODB_NHANH.md    # Hướng dẫn setup MongoDB nhanh
├── 📄 BUOC_TIEP_THEO.md         # Các bước tiếp theo
└── 📄 CAU_TRUC_DU_AN.md         # File này

```

## 📝 Giải thích các file quan trọng

### Backend (Server)
- **server.js**: Server với File JSON (mặc định)
- **server-mongodb.js**: Server với MongoDB Atlas (tùy chọn)
- **test-mongodb.js**: Script test kết nối MongoDB
- **data.json**: Database JSON lưu dữ liệu hiện tại
- **archives/**: Thư mục lưu dữ liệu năm cũ (JSON)

### MongoDB (Tùy chọn)
- **models/Violation.js**: Schema vi phạm
- **models/ViolationType.js**: Schema loại vi phạm
- **models/ArchivedYear.js**: Schema năm đã lưu trữ
- **.env**: Cấu hình connection string MongoDB
- **.env.example**: Mẫu file .env

### Frontend (Client)
- **index.html**: Giao diện chính
- **app.js**: Logic xử lý (thêm/xóa/sửa vi phạm)
- **style.css**: Thiết kế đẹp, responsive
- **qr-code.html**: Trang tạo QR Code chia sẻ

### PWA (Progressive Web App)
- **manifest.json**: Cấu hình app (tên, icon, màu)
- **service-worker.js**: Cache, hoạt động offline
- **icon-*.svg**: Icon hiển thị khi cài app

### Deploy
- **render.yaml**: Config cho Render.com
- **vercel.json**: Config cho Vercel

### Docs
- Tất cả tài liệu hướng dẫn chi tiết
- **SETUP_MONGODB_NHANH.md**: Hướng dẫn setup MongoDB (5 phút)
- **BUOC_TIEP_THEO.md**: Các bước tiếp theo cần làm

## 🔧 File tự động tạo

Các file này sẽ tự động tạo khi chạy:
- `data.json` - Khi lưu vi phạm đầu tiên
- `archives/*.json` - Khi kết thúc năm học
- `node_modules/` - Khi chạy `npm install`

## 🗑️ File có thể xóa

Nếu không cần deploy:
- `render.yaml`
- `vercel.json`

Nếu không cần docs:
- Thư mục `docs/` (nhưng nên giữ)

## 💾 Backup quan trọng

### Phiên bản File JSON:
- ✅ `data.json` - Dữ liệu hiện tại
- ✅ `archives/` - Dữ liệu năm cũ
- ✅ `public/` - Nếu có chỉnh sửa

### Phiên bản MongoDB:
- ✅ MongoDB Atlas tự động backup
- ✅ Có thể export từ MongoDB Dashboard
- ✅ Vẫn nên backup file `.env`

## 📦 Kích thước

- Toàn bộ dự án (không có node_modules): ~500KB
- Với node_modules: ~50MB
- File ZIP để chia sẻ: ~15KB
