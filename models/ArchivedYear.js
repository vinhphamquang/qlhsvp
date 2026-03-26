const mongoose = require('mongoose');

const archivedYearSchema = new mongoose.Schema({
  nam_hoc: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  violations: [{
    ho_ten: String,
    lop: String,
    noi_dung_vi_pham: String,
    ngay_tao: Date
  }],
  archived_date: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ArchivedYear', archivedYearSchema);
