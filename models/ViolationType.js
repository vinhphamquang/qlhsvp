const mongoose = require('mongoose');

const violationTypeSchema = new mongoose.Schema({
  ten_vi_pham: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ViolationType', violationTypeSchema);
