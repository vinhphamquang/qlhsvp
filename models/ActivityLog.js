const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['Thêm vi phạm', 'Xóa vi phạm', 'Sửa vi phạm', 'Thêm loại vi phạm', 'Xóa loại vi phạm', 'Kết thúc năm học', 'Xóa năm học', 'Đăng nhập']
  },
  details: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index để tìm kiếm nhanh
activityLogSchema.index({ timestamp: -1 });
activityLogSchema.index({ user_email: 1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
