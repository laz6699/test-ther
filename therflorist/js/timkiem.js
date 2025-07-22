function searchRedirect() {
    const keyword = document.getElementById('search-box').value.trim();
    if (keyword) {
        window.location.href = `timkiem.html?keyword=${encodeURIComponent(keyword)}`;
    }
    return false; // Ngăn submit form reload trang
}

// Lấy từ khóa từ URL
function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || '';
}

$(document).ready(function () {
    const keyword = getParam('keyword').toLowerCase().trim();
    if (keyword) {
        $('#search-title').text('Kết quả tìm kiếm: "' + keyword + '"');
    }
    // Lấy sản phẩm từ localStorage (chỉ sản phẩm do bạn tạo)
    let products = JSON.parse(localStorage.getItem('all_products') || '[]');
    let html = '';
    const result = products.filter(p => p.name && p.name.toLowerCase().includes(keyword));
    if (result.length > 0) {
        html = result.map(product => `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
                <div class="card" style="width: 16rem;">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title" style="font-size: 16px;">${product.name}</h5>
                        <p class="card-text" style="color: #ff69b4; font-weight: bold;">
                            ${product.discount ? `<span style="text-decoration:line-through;color:#888;">${product.price}</span> <span style="color:#ff69b4;">${product.discount}</span>` : product.price}
                        </p>
                        <a href="chitiet.html?id=${product.id}" class="btn btn-pink" style="background:#ff69b4;color:#fff;">Xem chi tiết</a>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        html = '<div class="col-12 text-center text-danger">Không tìm thấy sản phẩm phù hợp.</div>';
    }
    $('#timkiem').html(html);
});
