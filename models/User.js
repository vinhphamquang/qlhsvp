const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ho_ten: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  last_login: {
    type: Date,
    default: Date.now
  },
  login_count: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
