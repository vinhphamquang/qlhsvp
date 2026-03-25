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
├── 📂 archives/                  # Lưu trữ dữ liệu năm học cũ
│   ├── 2023-2024.json           # Dữ liệu năm 2023-2024
│   ├── 2024-2025.json           # Dữ liệu năm 2024-2025
│   └── ...                      # Các năm khác
│
├── 📂 docs/                      # Tài liệu hướng dẫn
│   ├── DEPLOY_INTERNET.md       # Hướng dẫn deploy lên internet
│   ├── DEPLOY_NHANH.md          # Hướng dẫn deploy nhanh
│   ├── HUONG_DAN_CAI_DAT_PWA.md # Hướng dẫn cài đặt PWA
│   ├── HUONG_DAN_CHIA_SE.md     # Hướng dẫn chia sẻ
│   ├── HUONG_DAN_SU_DUNG.md     # Hướng dẫn sử dụng
│   ├── TINH_NANG_DONG_BO.md     # Tính năng đồng bộ
│   └── TINH_NANG_LUU_TRU_NAM.md # Tính năng lưu trữ năm
│
├── 📂 node_modules/              # Thư viện (tự động tạo)
│
├── 📄 server.js                  # Backend API server
├── 📄 package.json               # Cấu hình dự án & dependencies
├── 📄 package-lock.json          # Lock dependencies version
├── 📄 data.json                  # Database (tự động tạo)
├── 📄 .gitignore                 # Git ignore config
├── 📄 render.yaml                # Config deploy Render
├── 📄 vercel.json                # Config deploy Vercel
├── 📄 README.md                  # Tài liệu chính
└── 📄 CAU_TRUC_DU_AN.md         # File này

```

## 📝 Giải thích các file quan trọng

### Backend (Server)
- **server.js**: Server Node.js + Express, xử lý API
- **data.json**: Database lưu dữ liệu hiện tại (JSON)
- **archives/**: Thư mục lưu dữ liệu năm cũ

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

Cần backup định kỳ:
- ✅ `data.json` - Dữ liệu hiện tại
- ✅ `archives/` - Dữ liệu năm cũ
- ✅ `public/` - Nếu có chỉnh sửa

## 📦 Kích thước

- Toàn bộ dự án (không có node_modules): ~500KB
- Với node_modules: ~50MB
- File ZIP để chia sẻ: ~15KB
