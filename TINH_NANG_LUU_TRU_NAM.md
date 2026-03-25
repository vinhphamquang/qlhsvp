# 📁 Tính Năng Lưu Trữ Theo Năm Học

## ✨ Tính năng mới

Hệ thống tự động quản lý dữ liệu theo năm học với khả năng:
- Lưu trữ dữ liệu khi kết thúc năm học
- Xem lại dữ liệu các năm trước
- Xuất Excel cho từng năm cụ thể
- Tự động chuyển sang năm mới

## 🎯 Cách sử dụng

### 1. Kết thúc năm học và lưu trữ

**Bước 1:** Nhấn nút **"📁 Lưu trữ năm học"**

**Bước 2:** Chọn năm học cần lưu trữ từ dropdown

**Bước 3:** Nhấn **"Xác nhận lưu trữ"**

**Kết quả:**
- Dữ liệu năm đó được lưu vào thư mục `archives/`
- Dữ liệu được xóa khỏi danh sách hiện tại
- Sẵn sàng cho năm học mới

### 2. Xem lại dữ liệu năm cũ

**Bước 1:** Nhấn nút **"📂 Xem năm cũ"**

**Bước 2:** Chọn năm học muốn xem

**Bước 3:** Xem danh sách vi phạm của năm đó

**Bước 4:** Có thể xuất Excel cho năm đó

## 📊 Cấu trúc lưu trữ

### Thư mục archives/
```
archives/
├── 2023-2024.json
├── 2024-2025.json
└── 2025-2026.json
```

### Nội dung file lưu trữ
```json
{
  "nam_hoc": "2024-2025",
  "violations": [...],
  "archived_date": "2025-06-15T10:30:00.000Z",
  "total": 150
}
```

## 🔄 Quy trình hàng năm

### Cuối năm học (tháng 5-6):
1. Xuất Excel toàn bộ dữ liệu năm hiện tại
2. Nhấn "Lưu trữ năm học"
3. Chọn năm vừa kết thúc
4. Xác nhận lưu trữ

### Đầu năm học mới (tháng 8-9):
1. Hệ thống tự động điền năm học mới
2. Bắt đầu ghi nhận vi phạm năm mới
3. Dữ liệu năm cũ vẫn có thể xem lại

## 📈 Lợi ích

### Cho giáo viên:
✅ Dữ liệu gọn gàng, không bị lẫn lộn giữa các năm
✅ Dễ dàng tra cứu lịch sử
✅ Xuất báo cáo theo từng năm
✅ Không lo mất dữ liệu cũ

### Cho quản lý:
✅ Theo dõi xu hướng vi phạm qua các năm
✅ So sánh số liệu giữa các năm
✅ Lưu trữ lâu dài
✅ Dễ dàng kiểm tra lại

## 🎨 Giao diện

### Nút chức năng:
- **📁 Lưu trữ năm học** (màu cam): Kết thúc và lưu năm
- **📂 Xem năm cũ** (màu xanh): Xem dữ liệu đã lưu
- **📥 Xuất Excel**: Xuất dữ liệu hiện tại hoặc năm cũ

### Modal lưu trữ:
- Dropdown chọn năm
- Cảnh báo rõ ràng
- Nút xác nhận và hủy

### Modal xem năm cũ:
- Danh sách các năm đã lưu
- Hiển thị tổng số vi phạm
- Ngày lưu trữ
- Bảng dữ liệu chi tiết

## ⚠️ Lưu ý quan trọng

### Trước khi lưu trữ:
- Đảm bảo đã xuất Excel backup
- Kiểm tra kỹ dữ liệu
- Không thể hoàn tác sau khi lưu

### Sau khi lưu trữ:
- Dữ liệu vẫn có thể xem lại
- Có thể xuất Excel bất cứ lúc nào
- Không thể chỉnh sửa dữ liệu đã lưu

### Bảo mật:
- File lưu trữ ở thư mục `archives/`
- Nên backup định kỳ
- Khi deploy, đảm bảo thư mục này được giữ lại

## 🔧 Kỹ thuật

### Lưu trữ:
- Dữ liệu lưu dạng JSON
- Mỗi năm một file riêng
- Tự động tạo thư mục archives

### Đồng bộ:
- Lưu trữ cũng kích hoạt đồng bộ
- Tất cả thiết bị cập nhật ngay

### Xuất Excel:
- Hỗ trợ xuất cả năm hiện tại và năm cũ
- Định dạng đẹp, có border
- Tên file tự động theo năm

## 📱 Trên điện thoại

Tất cả tính năng hoạt động tốt trên mobile:
- Modal responsive
- Nút dễ nhấn
- Bảng cuộn ngang
- Xuất Excel trực tiếp

## 🚀 Nâng cao (tùy chọn)

Có thể mở rộng thêm:
- Tìm kiếm trong dữ liệu cũ
- So sánh giữa các năm
- Biểu đồ thống kê
- Tự động lưu trữ vào ngày cố định
- Gửi email báo cáo cuối năm

## 💡 Tips

### Quản lý hiệu quả:
1. Lưu trữ đúng thời điểm (cuối năm)
2. Đặt tên năm học chuẩn (VD: 2024-2025)
3. Backup thư mục archives định kỳ
4. Kiểm tra dữ liệu trước khi lưu

### Tra cứu nhanh:
1. Dùng "Xem năm cũ" để tra cứu
2. Xuất Excel nếu cần phân tích sâu
3. Lưu file Excel vào thư mục riêng

## 📞 Hỗ trợ

Nếu gặp vấn đề:
- Kiểm tra thư mục archives có tồn tại không
- Đảm bảo có quyền ghi file
- Xem console log để debug
