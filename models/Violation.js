const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
  nam_hoc: {
    type: String,
    required: true,
    index: true
  },
  ho_ten: {
    type: String,
    required: true,
    trim: true
  },
  lop: {
    type: String,
    required: true,
    trim: true
  },
  noi_dung_vi_pham: {
    type: String,
    required: true
  },
  ngay_tao: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index để tìm kiếm nhanh
violationSchema.index({ nam_hoc: 1, ngay_tao: -1 });
violationSchema.index({ ho_ten: 1 });
violationSchema.index({ lop: 1 });

module.exports = mongoose.model('Violation', violationSchema);
