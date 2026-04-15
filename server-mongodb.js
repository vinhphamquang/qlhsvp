require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ExcelJS = require('exceljs');
const os = require('os');

// Import models
const Violation = require('./models/Violation');
const ViolationType = require('./models/ViolationType');
const ArchivedYear = require('./models/ArchivedYear');
const User = require('./models/User');
const ActivityLog = require('./models/ActivityLog');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Kết nối MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/qlhsvp';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Đã kết nối MongoDB thành công!');
    initDefaultData();
  })
  .catch(err => {
    console.error('❌ Lỗi kết nối MongoDB:', err.message);
    process.exit(1);
  });

// Khởi tạo dữ liệu mặc định
async function initDefaultData() {
  try {
    const count = await ViolationType.countDocuments();
    if (count === 0) {
      const defaultTypes = [
        'Đi học muộn',
        'Không mặc đồng phục',
        'Không làm bài tập',
        'Nói chuyện trong giờ học',
        'Sử dụng điện thoại trong lớp',
        'Vắng mặt không phép',
        'Đánh nhau',
        'Thiếu sách vở'
      ];
      
      await ViolationType.insertMany(
        defaultTypes.map(ten => ({ ten_vi_pham: ten }))
      );
      console.log('✅ Đã khởi tạo dữ liệu mặc định');
    }
  } catch (error) {
    console.error('Lỗi khởi tạo dữ liệu:', error);
  }
}

// Biến lưu thời gian cập nhật cuối
let lastUpdateTimestamp = Date.now();

function updateTimestamp() {
  lastUpdateTimestamp = Date.now();
}

// API: Lấy thời gian cập nhật cuối
app.get('/api/last-update', (req, res) => {
  res.json({ lastUpdate: lastUpdateTimestamp });
});

// API: Đăng nhập/Đăng ký user
app.post('/api/login', async (req, res) => {
  try {
    const { ho_ten, email } = req.body;
    
    if (!ho_ten || !email) {
      return res.status(400).json({ error: 'Thiếu thông tin họ tên hoặc email' });
    }
    
    // Tìm user theo email
    let user = await User.findOne({ email });
    
    if (user) {
      // User đã tồn tại - cập nhật thông tin đăng nhập
      user.ho_ten = ho_ten;
      user.last_login = new Date();
      user.login_count += 1;
      await user.save();
    } else {
      // User mới - tạo mới
      user = await User.create({
        ho_ten,
        email,
        last_login: new Date(),
        login_count: 1
      });
    }
    
    // Ghi log đăng nhập
    await ActivityLog.create({
      user_email: email,
      user_name: ho_ten,
      action: 'Đăng nhập',
      details: `${ho_ten} đã đăng nhập vào hệ thống`
    });
    
    res.json({
      success: true,
      user: {
        id: user._id,
        ho_ten: user.ho_ten,
        email: user.email,
        login_count: user.login_count
      }
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ error: error.message });
  }
});

// API: Lấy danh sách users (cho admin)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('ho_ten email last_login login_count createdAt')
      .sort({ last_login: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Lấy lịch sử hoạt động
app.get('/api/activity-logs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const logs = await ActivityLog.find()
      .sort({ timestamp: -1 })
      .limit(limit);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Lấy thông tin server
app.get('/api/server-info', (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = 'localhost';
  
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
  
  const port = process.env.PORT || 3000;
  const url = `http://${ipAddress}:${port}`;
  
  res.json({ ip: ipAddress, port, url });
});

// API: Lấy danh sách loại vi phạm
app.get('/api/violation-types', async (req, res) => {
  try {
    const types = await ViolationType.find().sort({ ten_vi_pham: 1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Thêm loại vi phạm mới
app.post('/api/violation-types', async (req, res) => {
  try {
    const { ten_vi_pham, user_email, user_name } = req.body;
    const newType = await ViolationType.create({ ten_vi_pham });
    
    // Ghi log
    if (user_email && user_name) {
      await ActivityLog.create({
        user_email,
        user_name,
        action: 'Thêm loại vi phạm',
        details: `Thêm loại vi phạm mới: ${ten_vi_pham}`
      });
    }
    
    updateTimestamp();
    res.json(newType);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Loại vi phạm đã tồn tại' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// API: Xóa loại vi phạm
app.delete('/api/violation-types/:id', async (req, res) => {
  try {
    const { user_email, user_name } = req.query;
    const type = await ViolationType.findById(req.params.id);
    
    if (type) {
      // Ghi log trước khi xóa
      if (user_email && user_name) {
        await ActivityLog.create({
          user_email,
          user_name,
          action: 'Xóa loại vi phạm',
          details: `Xóa loại vi phạm: ${type.ten_vi_pham}`
        });
      }
      
      await ViolationType.findByIdAndDelete(req.params.id);
    }
    
    updateTimestamp();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Lấy danh sách vi phạm
app.get('/api/violations', async (req, res) => {
  try {
    const violations = await Violation.find().sort({ _id: 1 }); // Sắp xếp cũ nhất trước
    res.json(violations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Thêm vi phạm mới
app.post('/api/violations', async (req, res) => {
  try {
    const { nam_hoc, ho_ten, lop, noi_dung_vi_pham, user_email, user_name } = req.body;
    const newViolation = await Violation.create({
      nam_hoc,
      ho_ten,
      lop,
      noi_dung_vi_pham
    });
    
    // Ghi log
    if (user_email && user_name) {
      await ActivityLog.create({
        user_email,
        user_name,
        action: 'Thêm vi phạm',
        details: `Thêm vi phạm: ${ho_ten} (${lop}) - ${noi_dung_vi_pham}`
      });
    }
    
    updateTimestamp();
    res.json(newViolation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Cập nhật vi phạm
app.put('/api/violations/:id', async (req, res) => {
  try {
    const { ho_ten, lop, noi_dung_vi_pham, user_email, user_name } = req.body;
    const violation = await Violation.findById(req.params.id);
    
    if (!violation) {
      return res.status(404).json({ error: 'Không tìm thấy vi phạm' });
    }
    
    // Lưu thông tin cũ để ghi log
    const oldInfo = `${violation.ho_ten} (${violation.lop}) - ${violation.noi_dung_vi_pham}`;
    const newInfo = `${ho_ten} (${lop}) - ${noi_dung_vi_pham}`;
    
    // Cập nhật
    violation.ho_ten = ho_ten;
    violation.lop = lop;
    violation.noi_dung_vi_pham = noi_dung_vi_pham;
    await violation.save();
    
    // Ghi log
    if (user_email && user_name) {
      await ActivityLog.create({
        user_email,
        user_name,
        action: 'Sửa vi phạm',
        details: `Sửa vi phạm: ${oldInfo} → ${newInfo}`
      });
    }
    
    updateTimestamp();
    res.json(violation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Xóa vi phạm
app.delete('/api/violations/:id', async (req, res) => {
  try {
    const { user_email, user_name } = req.query;
    const violation = await Violation.findById(req.params.id);
    
    if (violation) {
      // Ghi log trước khi xóa
      if (user_email && user_name) {
        await ActivityLog.create({
          user_email,
          user_name,
          action: 'Xóa vi phạm',
          details: `Xóa vi phạm: ${violation.ho_ten} (${violation.lop})`
        });
      }
      
      await Violation.findByIdAndDelete(req.params.id);
    }
    
    updateTimestamp();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Lưu trữ năm học
app.post('/api/archive-year', async (req, res) => {
  try {
    const { nam_hoc, user_email, user_name } = req.body;
    
    // Lấy tất cả vi phạm của năm đó
    const violations = await Violation.find({ nam_hoc });
    
    if (violations.length === 0) {
      return res.status(400).json({ success: false, message: 'Không có dữ liệu để lưu trữ' });
    }
    
    // Lưu vào archive
    await ArchivedYear.create({
      nam_hoc,
      violations: violations.map(v => ({
        ho_ten: v.ho_ten,
        lop: v.lop,
        noi_dung_vi_pham: v.noi_dung_vi_pham,
        ngay_tao: v.ngay_tao
      })),
      total: violations.length
    });
    
    // Xóa vi phạm của năm đó
    await Violation.deleteMany({ nam_hoc });
    
    // Ghi log
    if (user_email && user_name) {
      const [startYear, endYear] = nam_hoc.split('-').map(Number);
      const newYear = `${startYear + 1}-${endYear + 1}`;
      await ActivityLog.create({
        user_email,
        user_name,
        action: 'Kết thúc năm học',
        details: `Kết thúc năm học ${nam_hoc} (${violations.length} vi phạm) và chuyển sang năm ${newYear}`
      });
    }
    
    updateTimestamp();
    res.json({ success: true, message: `Đã lưu trữ năm học ${nam_hoc}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Lấy danh sách các năm đã lưu trữ
app.get('/api/archived-years', async (req, res) => {
  try {
    const years = await ArchivedYear.find()
      .select('nam_hoc total archived_date')
      .sort({ nam_hoc: -1 });
    res.json(years);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Lấy dữ liệu năm đã lưu trữ
app.get('/api/archived-data/:year', async (req, res) => {
  try {
    const data = await ArchivedYear.findOne({ nam_hoc: req.params.year });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Không tìm thấy dữ liệu năm học này' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Xóa năm học đã lưu trữ
app.delete('/api/archived-year/:year', async (req, res) => {
  try {
    const { user_email, user_name } = req.query;
    const year = req.params.year;
    
    const result = await ArchivedYear.findOneAndDelete({ nam_hoc: year });
    if (result) {
      // Ghi log
      if (user_email && user_name) {
        await ActivityLog.create({
          user_email,
          user_name,
          action: 'Xóa năm học',
          details: `Xóa năm học ${year} (${result.total} vi phạm)`
        });
      }
      
      updateTimestamp();
      res.json({ success: true, message: `Đã xóa năm học ${year}` });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy năm học này' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Khôi phục năm học từ lưu trữ
app.post('/api/restore-year', async (req, res) => {
  try {
    const { nam_hoc, user_email, user_name } = req.body;
    
    // Tìm dữ liệu năm học trong archive
    const archivedData = await ArchivedYear.findOne({ nam_hoc });
    
    if (!archivedData) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy năm học này trong kho lưu trữ' });
    }
    
    // Khôi phục dữ liệu vào collection chính
    const violations = archivedData.violations.map(v => ({
      nam_hoc,
      ho_ten: v.ho_ten,
      lop: v.lop,
      noi_dung_vi_pham: v.noi_dung_vi_pham,
      ngay_tao: v.ngay_tao
    }));
    
    await Violation.insertMany(violations);
    
    // Xóa khỏi archive
    await ArchivedYear.findOneAndDelete({ nam_hoc });
    
    // Ghi log
    if (user_email && user_name) {
      await ActivityLog.create({
        user_email,
        user_name,
        action: 'Khôi phục năm học',
        details: `Khôi phục năm học ${nam_hoc} (${violations.length} vi phạm) từ kho lưu trữ`
      });
    }
    
    updateTimestamp();
    res.json({ success: true, message: `Đã khôi phục năm học ${nam_hoc}` });
  } catch (error) {
    console.error('Lỗi khi khôi phục năm học:', error);
    res.status(500).json({ error: error.message });
  }
});

// API: Xuất file Excel
app.get('/api/export-excel', async (req, res) => {
  try {
    const violations = await Violation.find().sort({ _id: -1 });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh Sách Vi Phạm');

    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 10 },
      { header: 'Năm học', key: 'nam_hoc', width: 15 },
      { header: 'Họ tên', key: 'ho_ten', width: 25 },
      { header: 'Lớp', key: 'lop', width: 12 },
      { header: 'Nội dung vi phạm', key: 'noi_dung_vi_pham', width: 50 },
      { header: 'Ngày ghi nhận', key: 'ngay_tao', width: 20 }
    ];

    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF667eea' }
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    violations.forEach((v, index) => {
      const row = worksheet.addRow({
        stt: violations.length - index,
        nam_hoc: v.nam_hoc,
        ho_ten: v.ho_ten,
        lop: v.lop,
        noi_dung_vi_pham: v.noi_dung_vi_pham,
        ngay_tao: new Date(v.ngay_tao).toLocaleString('vi-VN')
      });

      row.getCell(1).alignment = { horizontal: 'center' };
      row.getCell(4).alignment = { horizontal: 'center' };
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Danh_Sach_Vi_Pham.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Lỗi khi xuất Excel:', error);
    res.status(500).json({ error: 'Lỗi khi xuất file Excel' });
  }
});

// API: Xuất Excel cho năm đã lưu trữ
app.get('/api/export-archived-excel/:year', async (req, res) => {
  try {
    const data = await ArchivedYear.findOne({ nam_hoc: req.params.year });
    if (!data) {
      return res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Năm học ${data.nam_hoc}`);

    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 10 },
      { header: 'Họ tên', key: 'ho_ten', width: 25 },
      { header: 'Lớp', key: 'lop', width: 12 },
      { header: 'Nội dung vi phạm', key: 'noi_dung_vi_pham', width: 50 },
      { header: 'Ngày ghi nhận', key: 'ngay_tao', width: 20 }
    ];

    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF667eea' }
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    data.violations.forEach((v, index) => {
      const row = worksheet.addRow({
        stt: index + 1,
        ho_ten: v.ho_ten,
        lop: v.lop,
        noi_dung_vi_pham: v.noi_dung_vi_pham,
        ngay_tao: new Date(v.ngay_tao).toLocaleString('vi-VN')
      });

      row.getCell(1).alignment = { horizontal: 'center' };
      row.getCell(3).alignment = { horizontal: 'center' };
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=Vi_Pham_${data.nam_hoc}.xlsx`);

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
