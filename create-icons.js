// Script tạo icon đơn giản bằng Canvas (chạy trong Node.js)
const fs = require('fs');

// Tạo SVG icon
const createSVG = (size) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">📋</text>
</svg>`;
};

// Tạo các file SVG
fs.writeFileSync('public/icon-192.svg', createSVG(192));
fs.writeFileSync('public/icon-512.svg', createSVG(512));

console.log('Đã tạo icon SVG. Bạn có thể sử dụng trực tiếp hoặc chuyển sang PNG.');
console.log('Để chuyển sang PNG, bạn có thể:');
console.log('1. Mở file SVG trong trình duyệt và chụp màn hình');
console.log('2. Sử dụng tool online như: https://cloudconvert.com/svg-to-png');
console.log('3. Hoặc tạm thời dùng SVG (hầu hết trình duyệt đều hỗ trợ)');
