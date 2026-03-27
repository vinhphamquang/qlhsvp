const API_URL = window.location.origin + '/api';
let lastUpdateTime = null;
let autoSyncInterval = null;

// Kiểm tra đăng nhập
function checkLogin() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    const loginModal = document.getElementById('loginModal');
    const mainContent = document.getElementById('mainContent');
    const displayUserName = document.getElementById('displayUserName');
    
    if (!loginModal || !mainContent) {
        return false;
    }
    
    if (userName && userEmail) {
        // Đã đăng nhập
        loginModal.style.display = 'none';
        mainContent.style.display = 'block';
        if (displayUserName) {
            displayUserName.textContent = userName;
        }
        return true;
    } else {
        // Chưa đăng nhập
        loginModal.style.display = 'flex';
        mainContent.style.display = 'none';
        return false;
    }
}

// Xử lý đăng nhập
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userName = document.getElementById('userName').value.trim();
            const userEmail = document.getElementById('userEmail').value.trim();
            
            if (userName && userEmail) {
                try {
                    // Gửi thông tin đăng nhập lên server
                    const response = await fetch(`${API_URL}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ho_ten: userName,
                            email: userEmail
                        })
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        // Lưu thông tin vào localStorage
                        localStorage.setItem('userName', userName);
                        localStorage.setItem('userEmail', userEmail);
                        localStorage.setItem('userId', result.user.id);
                        
                        // Hiển thị nội dung chính
                        document.getElementById('loginModal').style.display = 'none';
                        document.getElementById('mainContent').style.display = 'block';
                        document.getElementById('displayUserName').textContent = userName;
                        
                        // Hiển thị thông báo chào mừng
                        if (result.user.login_count === 1) {
                            showSyncNotification(`🎉 Chào mừng ${userName}!`);
                        } else {
                            showSyncNotification(`👋 Chào mừng trở lại ${userName}! (Lần đăng nhập thứ ${result.user.login_count})`);
                        }
                        
                        // Khởi tạo app
                        init();
                    } else {
                        alert('❌ Đăng nhập thất bại. Vui lòng thử lại.');
                    }
                } catch (error) {
                    console.error('Lỗi đăng nhập:', error);
                    alert('❌ Có lỗi xảy ra. Vui lòng kiểm tra kết nối internet.');
                }
            }
        });
    }
    
    // Kiểm tra đăng nhập khi load trang
    if (checkLogin()) {
        init();
    }
});

// Hiển thị thông tin user
function showUserInfo() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    alert(`👤 Thông tin người dùng:\n\nHọ tên: ${userName}\nEmail: ${userEmail}`);
}

// Đăng xuất
function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        location.reload();
    }
}

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
            const typeId = type._id || type.id;
            div.innerHTML = `
                <input type="checkbox" id="vio_${typeId}" value="${type.ten_vi_pham}">
                <label for="vio_${typeId}">${type.ten_vi_pham}</label>
                <button class="delete-btn" onclick="deleteViolationType('${typeId}', '${type.ten_vi_pham}')">Xóa</button>
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
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        const response = await fetch(`${API_URL}/violation-types`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ten_vi_pham: tenViPham,
                user_email: userEmail,
                user_name: userName
            })
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
async function deleteViolationType(id, tenViPham) {
    if (!confirm(`Bạn có chắc muốn xóa loại vi phạm "${tenViPham}"?`)) return;
    
    try {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        await fetch(`${API_URL}/violation-types/${id}?user_email=${userEmail}&user_name=${encodeURIComponent(userName)}`, { 
            method: 'DELETE' 
        });
        loadViolationTypes();
    } catch (error) {
        console.error('Lỗi khi xóa loại vi phạm:', error);
    }
}

// Tải danh sách vi phạm
let allViolations = []; // Lưu toàn bộ danh sách để lọc

async function loadViolations() {
    try {
        const response = await fetch(`${API_URL}/violations`);
        const violations = await response.json();
        allViolations = violations; // Lưu vào biến global
        
        displayViolations(violations);
        
        // Cập nhật STT tiếp theo
        document.getElementById('stt').value = violations.length + 1;
    } catch (error) {
        console.error('Lỗi khi tải danh sách vi phạm:', error);
    }
}

// Hiển thị danh sách vi phạm
function displayViolations(violations) {
    const tbody = document.getElementById('violationTableBody');
    tbody.innerHTML = '';
    
    if (violations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px; color: #999;">Không có dữ liệu</td></tr>';
        return;
    }
    
    violations.forEach((v, index) => {
        const tr = document.createElement('tr');
        const violationId = v._id || v.id;
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${v.nam_hoc}</td>
            <td>${v.ho_ten}</td>
            <td>${v.lop}</td>
            <td>${v.noi_dung_vi_pham}</td>
            <td>
                <button class="btn-edit" onclick="editViolation('${violationId}', '${v.ho_ten}', '${v.lop}', '${v.noi_dung_vi_pham}')" style="background: #3498db; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-right: 5px; font-size: 13px;">✏️</button>
                <button class="btn-delete" onclick="deleteViolation('${violationId}')" style="background: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px;">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Lọc vi phạm
function filterViolations() {
    const filterKhoi = document.getElementById('filterKhoi').value;
    const filterLop = document.getElementById('filterLop').value.toLowerCase().trim();
    const filterName = document.getElementById('filterName').value.toLowerCase().trim();
    
    let filtered = allViolations;
    
    // Lọc theo khối
    if (filterKhoi) {
        filtered = filtered.filter(v => v.lop.startsWith(filterKhoi));
    }
    
    // Lọc theo lớp
    if (filterLop) {
        filtered = filtered.filter(v => v.lop.toLowerCase().includes(filterLop));
    }
    
    // Lọc theo tên
    if (filterName) {
        filtered = filtered.filter(v => v.ho_ten.toLowerCase().includes(filterName));
    }
    
    displayViolations(filtered);
}

// Reset bộ lọc
function resetFilter() {
    document.getElementById('filterKhoi').value = '';
    document.getElementById('filterLop').value = '';
    document.getElementById('filterName').value = '';
    displayViolations(allViolations);
}

// Xóa vi phạm
async function deleteViolation(id) {
    if (!confirm('Bạn có chắc muốn xóa vi phạm này?')) return;
    
    try {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        await fetch(`${API_URL}/violations/${id}?user_email=${userEmail}&user_name=${encodeURIComponent(userName)}`, { 
            method: 'DELETE' 
        });
        loadViolations();
    } catch (error) {
        console.error('Lỗi khi xóa vi phạm:', error);
    }
}

// Mở modal chỉnh sửa vi phạm
function editViolation(id, hoTen, lop, noiDung) {
    document.getElementById('editViolationId').value = id;
    document.getElementById('editHoTen').value = hoTen;
    document.getElementById('editLop').value = lop;
    document.getElementById('editNoiDung').value = noiDung;
    document.getElementById('editViolationModal').style.display = 'block';
}

// Đóng modal chỉnh sửa
function closeEditViolationModal() {
    document.getElementById('editViolationModal').style.display = 'none';
}

// Xử lý form chỉnh sửa
document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('editViolationForm');
    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = document.getElementById('editViolationId').value;
            const hoTen = document.getElementById('editHoTen').value.trim();
            const lop = document.getElementById('editLop').value.trim();
            const noiDung = document.getElementById('editNoiDung').value.trim();
            
            const userName = localStorage.getItem('userName');
            const userEmail = localStorage.getItem('userEmail');
            
            try {
                const response = await fetch(`${API_URL}/violations/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ho_ten: hoTen,
                        lop: lop,
                        noi_dung_vi_pham: noiDung,
                        user_email: userEmail,
                        user_name: userName
                    })
                });
                
                if (response.ok) {
                    closeEditViolationModal();
                    loadViolations();
                    alert('✅ Đã cập nhật vi phạm thành công!');
                } else {
                    alert('❌ Có lỗi xảy ra khi cập nhật');
                }
            } catch (error) {
                console.error('Lỗi khi cập nhật vi phạm:', error);
                alert('❌ Có lỗi xảy ra khi cập nhật');
            }
        });
    }
});

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
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        const response = await fetch(`${API_URL}/violations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nam_hoc: document.getElementById('namHoc').value,
                ho_ten: hoTen,
                lop: lop,
                noi_dung_vi_pham: noiDungViPham,
                user_email: userEmail,
                user_name: userName
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

// Hàm khởi tạo app
function init() {
    document.getElementById('namHoc').value = getCurrentSchoolYear();
    loadViolationTypes();
    loadViolations();
    startAutoSync();
}

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

// === CHỨC NĂNG LƯU TRỮ NĂM HỌC ===

// Hiển thị modal lưu trữ
async function showArchiveModal() {
    const modal = document.getElementById('archiveModal');
    const select = document.getElementById('yearToArchive');
    
    // Lấy danh sách năm học từ dữ liệu hiện tại
    const response = await fetch(`${API_URL}/violations`);
    const violations = await response.json();
    
    const years = [...new Set(violations.map(v => v.nam_hoc))].sort().reverse();
    
    if (years.length === 0) {
        alert('Chưa có dữ liệu để lưu trữ');
        return;
    }
    
    select.innerHTML = years.map(year => 
        `<option value="${year}">${year}</option>`
    ).join('');
    
    // Cập nhật thông tin chuyển năm
    updateYearTransitionInfo(years[0]);
    
    // Lắng nghe thay đổi năm
    select.onchange = (e) => updateYearTransitionInfo(e.target.value);
    
    modal.style.display = 'block';
}

// Cập nhật thông tin chuyển năm
function updateYearTransitionInfo(oldYear) {
    const [startYear, endYear] = oldYear.split('-').map(Number);
    const newYear = `${startYear + 1}-${endYear + 1}`;
    
    document.getElementById('oldYear').textContent = oldYear;
    document.getElementById('newYear').textContent = newYear;
}

// Đóng modal lưu trữ
function closeArchiveModal() {
    document.getElementById('archiveModal').style.display = 'none';
}

// Lưu trữ năm học
async function archiveYear() {
    const year = document.getElementById('yearToArchive').value;
    
    // Tính năm học mới
    const [startYear, endYear] = year.split('-').map(Number);
    const newSchoolYear = `${startYear + 1}-${endYear + 1}`;
    
    if (!confirm(`Bạn có chắc muốn kết thúc năm học ${year}?\n\n✅ Dữ liệu năm ${year} sẽ được lưu trữ\n✅ Hệ thống tự động chuyển sang năm ${newSchoolYear}\n✅ Bạn có thể xem lại dữ liệu cũ bất cứ lúc nào`)) {
        return;
    }
    
    try {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        const response = await fetch(`${API_URL}/archive-year`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nam_hoc: year,
                user_email: userEmail,
                user_name: userName
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Cập nhật năm học mới
            document.getElementById('namHoc').value = newSchoolYear;
            
            alert(`✅ Đã kết thúc năm học ${year}\n\n🎓 Hệ thống đã chuyển sang năm học ${newSchoolYear}\n📁 Dữ liệu cũ đã được lưu trữ an toàn`);
            closeArchiveModal();
            loadViolations();
        } else {
            alert(`❌ ${result.message}`);
        }
    } catch (error) {
        console.error('Lỗi khi lưu trữ:', error);
        alert('Có lỗi xảy ra khi lưu trữ năm học');
    }
}

// Hiển thị modal xem năm cũ
async function showViewArchiveModal() {
    const modal = document.getElementById('viewArchiveModal');
    const listDiv = document.getElementById('archivedYearsList');
    
    try {
        const response = await fetch(`${API_URL}/archived-years`);
        const years = await response.json();
        
        if (years.length === 0) {
            listDiv.innerHTML = '<p style="text-align: center; color: #999;">Chưa có năm học nào được lưu trữ</p>';
        } else {
            listDiv.innerHTML = '<h3>Chọn năm học để xem:</h3>' + years.map(year => `
                <div class="archived-year-item" onclick="viewArchivedYear('${year.nam_hoc}')">
                    <strong>📅 Năm học: ${year.nam_hoc}</strong><br>
                    <small>Tổng số vi phạm: ${year.total} | Lưu trữ: ${new Date(year.archived_date).toLocaleDateString('vi-VN')}</small>
                </div>
            `).join('');
        }
        
        document.getElementById('archivedDataView').innerHTML = '';
        modal.style.display = 'block';
    } catch (error) {
        console.error('Lỗi khi tải danh sách:', error);
        alert('Có lỗi xảy ra khi tải danh sách năm học');
    }
}

// Đóng modal xem năm cũ
function closeViewArchiveModal() {
    document.getElementById('viewArchiveModal').style.display = 'none';
}

// Xem dữ liệu năm đã lưu trữ
async function viewArchivedYear(year) {
    try {
        const response = await fetch(`${API_URL}/archived-data/${year}`);
        const data = await response.json();
        
        const viewDiv = document.getElementById('archivedDataView');
        viewDiv.innerHTML = `
            <h3 style="margin-top: 30px; color: #667eea;">📊 Dữ liệu năm học ${year}</h3>
            <div style="margin-bottom: 15px; display: flex; gap: 10px;">
                <button class="btn-export" onclick="exportArchivedToExcel('${year}')">📥 Xuất Excel</button>
                <button class="btn-delete" onclick="confirmDeleteYear('${year}')">🗑️ Xóa năm học</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Lớp</th>
                            <th>Nội dung vi phạm</th>
                            <th>Ngày ghi nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.violations.map((v, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${v.ho_ten}</td>
                                <td>${v.lop}</td>
                                <td>${v.noi_dung_vi_pham}</td>
                                <td>${new Date(v.ngay_tao).toLocaleDateString('vi-VN')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        alert('Có lỗi xảy ra khi tải dữ liệu năm học');
    }
}

// Xác nhận xóa năm học (bước 1)
function confirmDeleteYear(year) {
    const modal = document.getElementById('deleteConfirmModal');
    document.getElementById('yearToDelete').textContent = year;
    document.getElementById('confirmYearInput').value = '';
    document.getElementById('deleteYearValue').value = year;
    modal.style.display = 'block';
}

// Đóng modal xác nhận xóa
function closeDeleteConfirmModal() {
    document.getElementById('deleteConfirmModal').style.display = 'none';
}

// Xóa năm học (bước 2 - sau khi xác nhận)
async function deleteArchivedYear() {
    const year = document.getElementById('deleteYearValue').value;
    const confirmInput = document.getElementById('confirmYearInput').value.trim().toLowerCase();
    
    // Kiểm tra xác nhận
    if (confirmInput !== 'xóa') {
        alert('❌ Xác nhận không đúng!\n\nVui lòng nhập chữ "xóa" để xác nhận.');
        return;
    }
    
    try {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        const response = await fetch(`${API_URL}/archived-year/${year}?user_email=${userEmail}&user_name=${encodeURIComponent(userName)}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(`✅ ${result.message}`);
            closeDeleteConfirmModal();
            closeViewArchiveModal();
        } else {
            alert(`❌ ${result.message}`);
        }
    } catch (error) {
        console.error('Lỗi khi xóa năm học:', error);
        alert('Có lỗi xảy ra khi xóa năm học');
    }
}

// Xuất Excel cho năm đã lưu trữ
async function exportArchivedToExcel(year) {
    window.location.href = `${API_URL}/export-archived-excel/${year}`;
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
    const archiveModal = document.getElementById('archiveModal');
    const viewModal = document.getElementById('viewArchiveModal');
    const deleteModal = document.getElementById('deleteConfirmModal');
    const helpModal = document.getElementById('helpModal');
    
    if (event.target === archiveModal) {
        closeArchiveModal();
    }
    if (event.target === viewModal) {
        closeViewArchiveModal();
    }
    if (event.target === deleteModal) {
        closeDeleteConfirmModal();
    }
    if (event.target === helpModal) {
        closeHelpModal();
    }
}

// Hiển thị modal hướng dẫn
function showHelpModal() {
    document.getElementById('helpModal').style.display = 'block';
}

// Đóng modal hướng dẫn
function closeHelpModal() {
    document.getElementById('helpModal').style.display = 'none';
}

// Hiển thị modal lịch sử hoạt động
async function showActivityLogModal() {
    document.getElementById('activityLogModal').style.display = 'block';
    await loadActivityLogs();
}

// Đóng modal lịch sử
function closeActivityLogModal() {
    document.getElementById('activityLogModal').style.display = 'none';
}

// Tải lịch sử hoạt động
async function loadActivityLogs() {
    try {
        const response = await fetch(`${API_URL}/activity-logs?limit=100`);
        const logs = await response.json();
        
        const tbody = document.getElementById('activityLogTableBody');
        tbody.innerHTML = '';
        
        if (logs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px;">Chưa có lịch sử hoạt động</td></tr>';
            return;
        }
        
        // Màu sắc cho từng loại hành động
        const actionColors = {
            'Đăng nhập': '#3498db',
            'Thêm vi phạm': '#27ae60',
            'Xóa vi phạm': '#e74c3c',
            'Sửa vi phạm': '#f39c12',
            'Thêm loại vi phạm': '#9b59b6',
            'Xóa loại vi phạm': '#e67e22',
            'Kết thúc năm học': '#16a085',
            'Xóa năm học': '#c0392b'
        };
        
        logs.forEach((log, index) => {
            const tr = document.createElement('tr');
            const timestamp = new Date(log.timestamp).toLocaleString('vi-VN');
            const color = actionColors[log.action] || '#667eea';
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${timestamp}</td>
                <td><strong>${log.user_name}</strong><br><small style="color: #999;">${log.user_email}</small></td>
                <td><span style="background: ${color}; color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; display: inline-block; white-space: nowrap;">${log.action}</span></td>
                <td>${log.details}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Lỗi khi tải lịch sử:', error);
        const tbody = document.getElementById('activityLogTableBody');
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px; color: #e74c3c;">Không thể tải lịch sử hoạt động</td></tr>';
    }
}
