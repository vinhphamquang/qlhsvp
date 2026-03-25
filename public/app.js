const API_URL = window.location.origin + '/api';
let lastUpdateTime = null;
let autoSyncInterval = null;

// Tự động đồng bộ dữ liệu
function startAutoSync() {
    // Kiểm tra cập nhật mỗi 3 giây
    autoSyncInterval = setInterval(async () => {
        try {
            const response = await fetch(`${API_URL}/last-update`);
            const data = await response.json();
            
            if (lastUpdateTime && data.lastUpdate !== lastUpdateTime) {
                console.log('Phát hiện thay đổi, đang đồng bộ...');
                await loadViolations();
                await loadViolationTypes();
                showSyncNotification('🔄 Đã đồng bộ dữ liệu mới');
            }
            
            lastUpdateTime = data.lastUpdate;
        } catch (error) {
            console.error('Lỗi khi kiểm tra cập nhật:', error);
        }
    }, 3000);
}

// Hiển thị thông báo đồng bộ
function showSyncNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#27ae60;color:white;padding:15px 25px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:10000;animation:slideIn 0.3s ease;';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Thêm CSS cho animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Tự động điền năm học
function getCurrentSchoolYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    
    if (month >= 9) {
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
}

// Tải danh sách loại vi phạm
async function loadViolationTypes() {
    try {
        const response = await fetch(`${API_URL}/violation-types`);
        const types = await response.json();
        
        const violationList = document.getElementById('violationList');
        violationList.innerHTML = '';
        
        types.forEach(type => {
            const div = document.createElement('div');
            div.className = 'checkbox-item';
            div.innerHTML = `
                <input type="checkbox" id="vio_${type.id}" value="${type.ten_vi_pham}">
                <label for="vio_${type.id}">${type.ten_vi_pham}</label>
                <button class="delete-btn" onclick="deleteViolationType(${type.id})">Xóa</button>
            `;
            violationList.appendChild(div);
        });
    } catch (error) {
        console.error('Lỗi khi tải loại vi phạm:', error);
    }
}

// Thêm loại vi phạm mới
document.getElementById('addViolationBtn').addEventListener('click', async () => {
    const input = document.getElementById('newViolation');
    const tenViPham = input.value.trim();
    
    if (!tenViPham) {
        alert('Vui lòng nhập tên vi phạm');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/violation-types`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ten_vi_pham: tenViPham })
        });
        
        if (response.ok) {
            input.value = '';
            loadViolationTypes();
        } else {
            alert('Loại vi phạm đã tồn tại');
        }
    } catch (error) {
        console.error('Lỗi khi thêm loại vi phạm:', error);
    }
});

// Xóa loại vi phạm
async function deleteViolationType(id) {
    if (!confirm('Bạn có chắc muốn xóa loại vi phạm này?')) return;
    
    try {
        await fetch(`${API_URL}/violation-types/${id}`, { method: 'DELETE' });
        loadViolationTypes();
    } catch (error) {
        console.error('Lỗi khi xóa loại vi phạm:', error);
    }
}

// Tải danh sách vi phạm
async function loadViolations() {
    try {
        const response = await fetch(`${API_URL}/violations`);
        const violations = await response.json();
        
        const tbody = document.getElementById('violationTableBody');
        tbody.innerHTML = '';
        
        violations.forEach((v, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${violations.length - index}</td>
                <td>${v.nam_hoc}</td>
                <td>${v.ho_ten}</td>
                <td>${v.lop}</td>
                <td>${v.noi_dung_vi_pham}</td>
                <td><button class="btn-delete" onclick="deleteViolation(${v.id})">Xóa</button></td>
            `;
            tbody.appendChild(tr);
        });
        
        // Cập nhật STT tiếp theo
        document.getElementById('stt').value = violations.length + 1;
    } catch (error) {
        console.error('Lỗi khi tải danh sách vi phạm:', error);
    }
}

// Xóa vi phạm
async function deleteViolation(id) {
    if (!confirm('Bạn có chắc muốn xóa vi phạm này?')) return;
    
    try {
        await fetch(`${API_URL}/violations/${id}`, { method: 'DELETE' });
        loadViolations();
    } catch (error) {
        console.error('Lỗi khi xóa vi phạm:', error);
    }
}

// Xử lý form submit
document.getElementById('violationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const hoTen = document.getElementById('hoTen').value.trim();
    const lop = document.getElementById('lop').value.trim();
    
    // Lấy các vi phạm đã chọn
    const checkedBoxes = document.querySelectorAll('#violationList input[type="checkbox"]:checked');
    const violations = Array.from(checkedBoxes).map(cb => cb.value);
    
    if (violations.length === 0) {
        alert('Vui lòng chọn ít nhất một nội dung vi phạm');
        return;
    }
    
    const noiDungViPham = violations.join(', ');
    
    try {
        const response = await fetch(`${API_URL}/violations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nam_hoc: document.getElementById('namHoc').value,
                ho_ten: hoTen,
                lop: lop,
                noi_dung_vi_pham: noiDungViPham
            })
        });
        
        if (response.ok) {
            // Reset form
            document.getElementById('hoTen').value = '';
            document.getElementById('lop').value = '';
            checkedBoxes.forEach(cb => cb.checked = false);
            
            // Reload danh sách
            loadViolations();
            alert('Đã lưu vi phạm thành công!');
        }
    } catch (error) {
        console.error('Lỗi khi lưu vi phạm:', error);
        alert('Có lỗi xảy ra khi lưu vi phạm');
    }
});

// Xuất Excel
async function exportToExcel() {
    try {
        const response = await fetch(`${API_URL}/export-excel`);
        
        if (!response.ok) {
            throw new Error('Lỗi khi xuất file');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Danh_Sach_Vi_Pham.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        alert('Đã xuất file Excel thành công!');
    } catch (error) {
        console.error('Lỗi khi xuất Excel:', error);
        alert('Có lỗi xảy ra khi xuất file Excel');
    }
}

// Khởi tạo
document.getElementById('namHoc').value = getCurrentSchoolYear();
loadViolationTypes();
loadViolations();

// Bắt đầu đồng bộ tự động
startAutoSync();

// Dừng đồng bộ khi đóng trang
window.addEventListener('beforeunload', () => {
    if (autoSyncInterval) {
        clearInterval(autoSyncInterval);
    }
});

// Hiển thị trạng thái kết nối
window.addEventListener('online', () => {
    showSyncNotification('✅ Đã kết nối internet');
    startAutoSync();
});

window.addEventListener('offline', () => {
    showSyncNotification('⚠️ Mất kết nối internet');
    if (autoSyncInterval) {
        clearInterval(autoSyncInterval);
    }
});
