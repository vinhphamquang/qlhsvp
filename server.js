const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const os = require('os');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// File lưu trữ dữ liệu
const DATA_FILE = 'data.json';

// Biến lưu thời gian cập nhật cuối
let lastUpdateTimestamp = Date.now();

// Hàm cập nhật timestamp
function updateTimestamp() {
  lastUpdateTimestamp = Date.now();
}

// Khởi tạo dữ liệu mặc định
function initData() {
  if (!fs.existsSync(DATA_FILE)) {
    const defaultData = {
      violations: [],
      violationTypes: [
        { id: 1, ten_vi_pham: 'Đi học muộn' },
        { id: 2, ten_vi_pham: 'Không mặc đồng phục' },
        { id: 3, ten_vi_pham: 'Không làm bài tập' },
        { id: 4, ten_vi_pham: 'Nói chuyện trong giờ học' },
        { id: 5, ten_vi_pham: 'Sử dụng điện thoại trong lớp' },
        { id: 6, ten_vi_pham: 'Vắng mặt không phép' },
        { id: 7, ten_vi_pham: 'Đánh nhau' },
        { id: 8, ten_vi_pham: 'Thiếu sách vở' }
      ],
      nextViolationId: 1,
      nextTypeId: 9
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
}

// Đọc dữ liệu
function readData() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

// Ghi dữ liệu
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

initData();

// API: Lấy thời gian cập nhật cuối
app.get('/api/last-update', (req, res) => {
  res.json({ lastUpdate: lastUpdateTimestamp });
});

// API: Lấy thông tin server (IP và URL)
app.get('/api/server-info', (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = 'localhost';
  
  // Tìm địa chỉ IPv4 không phải localhost
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
    if (ipAddress !== 'localhost') break;
  }
  
  const port = 3000;
  const url = `http://${ipAddress}:${port}`;
  
  res.json({ ip: ipAddress, port, url });
});

// API: Lấy danh sách loại vi phạm
app.get('/api/violation-types', (req, res) => {
  const data = readData();
  res.json(data.violationTypes);
});

// API: Thêm loại vi phạm mới
app.post('/api/violation-types', (req, res) => {
  const { ten_vi_pham } = req.body;
  const data = readData();
  
  // Kiểm tra trùng lặp
  const exists = data.violationTypes.some(v => v.ten_vi_pham === ten_vi_pham);
  if (exists) {
    return res.status(400).json({ error: 'Loại vi phạm đã tồn tại' });
  }
  
  const newType = {
    id: data.nextTypeId++,
    ten_vi_pham
  };
  
  data.violationTypes.push(newType);
  writeData(data);
  updateTimestamp(); // Cập nhật timestamp
  res.json(newType);
});

// API: Xóa loại vi phạm
app.delete('/api/violation-types/:id', (req, res) => {
  const data = readData();
  data.violationTypes = data.violationTypes.filter(v => v.id !== parseInt(req.params.id));
  writeData(data);
  updateTimestamp(); // Cập nhật timestamp
  res.json({ success: true });
});

// API: Lấy danh sách vi phạm
app.get('/api/violations', (req, res) => {
  const data = readData();
  res.json(data.violations);
});

// API: Thêm vi phạm mới
app.post('/api/violations', (req, res) => {
  const { nam_hoc, ho_ten, lop, noi_dung_vi_pham } = req.body;
  const data = readData();
  
  const newViolation = {
    id: data.nextViolationId++,
    nam_hoc,
    ho_ten,
    lop,
    noi_dung_vi_pham,
    ngay_tao: new Date().toISOString()
  };
  
  data.violations.push(newViolation);
  writeData(data);
  updateTimestamp(); // Cập nhật timestamp
  res.json(newViolation);
});

// API: Xóa vi phạm
app.delete('/api/violations/:id', (req, res) => {
  const data = readData();
  data.violations = data.violations.filter(v => v.id !== parseInt(req.params.id));
  writeData(data);
  updateTimestamp(); // Cập nhật timestamp
  res.json({ success: true });
});

// API: Xuất file Excel
app.get('/api/export-excel', async (req, res) => {
  try {
    const data = readData();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh Sách Vi Phạm');

    // Định dạng tiêu đề
    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 10 },
      { header: 'Năm học', key: 'nam_hoc', width: 15 },
      { header: 'Họ tên', key: 'ho_ten', width: 25 },
      { header: 'Lớp', key: 'lop', width: 12 },
      { header: 'Nội dung vi phạm', key: 'noi_dung_vi_pham', width: 50 },
      { header: 'Ngày ghi nhận', key: 'ngay_tao', width: 20 }
    ];

    // Style cho header
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF667eea' }
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Thêm dữ liệu
    data.violations.forEach((violation, index) => {
      const row = worksheet.addRow({
        stt: data.violations.length - index,
        nam_hoc: violation.nam_hoc,
        ho_ten: violation.ho_ten,
        lop: violation.lop,
        noi_dung_vi_pham: violation.noi_dung_vi_pham,
        ngay_tao: new Date(violation.ngay_tao).toLocaleString('vi-VN')
      });

      // Căn giữa cột STT và Lớp
      row.getCell(1).alignment = { horizontal: 'center' };
      row.getCell(4).alignment = { horizontal: 'center' };
    });

    // Thêm border cho tất cả cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // Gửi file
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Danh_Sach_Vi_Pham.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Lỗi khi xuất Excel:', error);
    res.status(500).json({ error: 'Lỗi khi xuất file Excel' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  console.log(`Hoặc truy cập qua mạng tại: http://[YOUR_IP]:${PORT}`);
});
