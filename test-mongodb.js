require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Đang kiểm tra kết nối MongoDB...\n');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.includes('xxxxx')) {
  console.error('❌ LỖI: Connection string chưa được cập nhật!');
  console.log('\n📝 Hướng dẫn:');
  console.log('1. Mở file .env');
  console.log('2. Thay "xxxxx" trong MONGODB_URI bằng cluster ID thực tế');
  console.log('3. Lấy cluster ID từ MongoDB Atlas Dashboard');
  console.log('4. Chạy lại: node test-mongodb.js\n');
  process.exit(1);
}

console.log('📡 Connection String:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
console.log('');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ KẾT NỐI THÀNH CÔNG!');
    console.log('✅ MongoDB Atlas đã sẵn sàng!');
    console.log('\n🎉 Bạn có thể chạy server bằng lệnh:');
    console.log('   node server-mongodb.js\n');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ KẾT NỐI THẤT BẠI!');
    console.error('\n🔴 Lỗi:', err.message);
    console.log('\n💡 Các nguyên nhân thường gặp:');
    console.log('1. Sai username/password (kiểm tra: tranphu / 12345)');
    console.log('2. Chưa whitelist IP (vào Network Access → Allow 0.0.0.0/0)');
    console.log('3. Cluster chưa khởi động xong (đợi 2-3 phút)');
    console.log('4. Sai cluster ID (kiểm tra lại connection string)\n');
    process.exit(1);
  });
