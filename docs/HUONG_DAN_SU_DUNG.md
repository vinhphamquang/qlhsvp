# 📱 Hướng Dẫn Cài Đặt và Sử Dụng

## Bước 1: Cài đặt Node.js

Nếu chưa có Node.js, tải và cài đặt tại: https://nodejs.org/
(Chọn phiên bản LTS - khuyến nghị)

## Bước 2: Giải nén file

Giải nén file ZIP vào một thư mục bất kỳ

## Bước 3: Cài đặt thư viện

Mở Command Prompt (CMD) hoặc Terminal tại thư mục vừa giải nén, chạy lệnh:

```cmd
npm install
```

Đợi khoảng 1-2 phút để cài đặt xong.

## Bước 4: Chạy ứng dụng

Chạy lệnh:

```cmd
npm start
```

Bạn sẽ thấy thông báo: "Server đang chạy tại http://localhost:3000"

## Bước 5: Truy cập ứng dụng

### Trên máy tính:
- Mở trình duyệt Chrome hoặc Edge
- Truy cập: http://localhost:3000

### Trên điện thoại (cùng mạng WiFi):
1. Tìm địa chỉ IP của máy tính:
   - Mở CMD và gõ: `ipconfig`
   - Tìm dòng "IPv4 Address", ví dụ: 192.168.1.100

2. Trên điện thoại:
   - Mở Chrome hoặc Safari
   - Truy cập: http://192.168.1.100:3000 (thay bằng IP của bạn)

## Bước 6: Cài đặt như App (PWA)

### Trên Android:
1. Nhấn vào 3 chấm ở góc trên
2. Chọn "Thêm vào màn hình chính" hoặc "Cài đặt ứng dụng"
3. Nhấn "Cài đặt"

### Trên iOS:
1. Nhấn nút "Chia sẻ" (mũi tên hướng lên)
2. Chọn "Thêm vào Màn hình chính"
3. Nhấn "Thêm"

### Trên máy tính:
1. Nhìn vào thanh địa chỉ, nhấn biểu tượng cài đặt (⊕)
2. Chọn "Cài đặt"

## 🎯 Tính năng

✅ Tự động điền STT và năm học
✅ Nhập họ tên và lớp học sinh
✅ Chọn nhiều vi phạm từ danh sách
✅ Thêm loại vi phạm mới
✅ Xuất file Excel
✅ Dữ liệu lưu vĩnh viễn
✅ Cài đặt như app thật
✅ Hoạt động offline

## ⚠️ Lưu ý

- Để ứng dụng hoạt động, server phải đang chạy (npm start)
- Dữ liệu được lưu trong file `data.json`
- Để dừng server, nhấn Ctrl+C trong cửa sổ CMD

## 🆘 Gặp vấn đề?

### Lỗi "npm không được nhận dạng":
→ Cần cài đặt Node.js

### Lỗi khi chạy npm install:
→ Thử chạy lại lệnh hoặc xóa thư mục `node_modules` và chạy lại

### Không truy cập được từ điện thoại:
→ Kiểm tra máy tính và điện thoại cùng mạng WiFi
→ Tắt tường lửa (firewall) tạm thời để test

## 📞 Hỗ trợ

Nếu cần hỗ trợ, vui lòng liên hệ người cung cấp phần mềm.
