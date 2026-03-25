# Hướng Dẫn Cài Đặt App (PWA)

## ✅ Đã hoàn thành

Phần mềm đã được chuyển thành PWA (Progressive Web App) và có thể cài đặt như một ứng dụng thực sự!

## 📱 Cách cài đặt trên điện thoại

### Android (Chrome/Edge):
1. Mở trình duyệt Chrome hoặc Edge
2. Truy cập: http://localhost:3000 (hoặc địa chỉ server của bạn)
3. Nhấn vào biểu tượng 3 chấm ở góc trên
4. Chọn "Thêm vào màn hình chính" hoặc "Cài đặt ứng dụng"
5. Nhấn "Cài đặt"
6. App sẽ xuất hiện trên màn hình chính như app thật!

### iOS (Safari):
1. Mở Safari
2. Truy cập: http://localhost:3000
3. Nhấn nút "Chia sẻ" (biểu tượng mũi tên hướng lên)
4. Cuộn xuống và chọn "Thêm vào Màn hình chính"
5. Nhấn "Thêm"

## 💻 Cách cài đặt trên máy tính

### Chrome/Edge:
1. Mở Chrome hoặc Edge
2. Truy cập: http://localhost:3000
3. Nhìn vào thanh địa chỉ, bạn sẽ thấy biểu tượng cài đặt (⊕ hoặc 💻)
4. Nhấn vào biểu tượng đó
5. Chọn "Cài đặt"
6. App sẽ mở như một cửa sổ riêng biệt!

### Hoặc:
1. Nhấn vào 3 chấm ở góc trên
2. Chọn "Cài đặt Quản Lý Học Sinh Vi Phạm..."
3. Nhấn "Cài đặt"

## 🎯 Tính năng PWA

✅ Hoạt động offline (sau khi tải lần đầu)
✅ Cài đặt như app thật
✅ Có icon riêng trên màn hình
✅ Mở như app độc lập (không có thanh địa chỉ)
✅ Tự động hiển thị banner cài đặt
✅ Tải nhanh hơn nhờ cache

## 🌐 Để sử dụng trên mạng LAN

Nếu muốn các giáo viên khác trong trường cài đặt:

1. Tìm địa chỉ IP của máy chủ:
```cmd
ipconfig
```

2. Tìm dòng "IPv4 Address", ví dụ: 192.168.1.100

3. Các máy khác truy cập: http://192.168.1.100:3000

4. Sau đó cài đặt như hướng dẫn trên

## 📝 Lưu ý

- Server phải đang chạy để app hoạt động
- Dữ liệu được lưu trên server (file data.json)
- Nếu muốn deploy lên internet, cần có domain và HTTPS
