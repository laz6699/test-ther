$(document).ready(function () {
    // Lấy sản phẩm từ localStorage nếu có, nếu không thì dùng mảng mặc định
    let products = JSON.parse(localStorage.getItem('hoatn_products') || '[]');
    if (!products.length) {
        products = [
            // Thêm sản phẩm mặc định cho hoa tốt nghiệp ở đây
            {
                id: "hoahongdo",
                name: "Hoa Hồng Đỏ",
                price: "250.000đ",
                img: "../img/hoatuoi/mot.jpg"
            },
            {
                id: "hoacamchuong",
                name: "Hoa Cẩm Chướng",
                price: "200.000đ",
                img: "../img/hoatuoi/hai.jpg"
            },
            {
                id: "hoalanhodiep",
                name: "Hoa Lan Hồ Điệp",
                price: "350.000đ",
                img: "../img/hoatuoi/ba.jpg"
            },
            {
                id: "hoacamtucau",
                name: "Hoa Cẩm Tú Cầu",
                price: "350.000đ",
                img: "../img/hoatuoi/bon.jpg"
            },
            {
                id: "hoatinhyeu",
                name: "Hoa Tình Yêu",
                price: "350.000đ",
                img: "../img/hoatuoi/nam.jpg"
            },
            {
                id: "hoahoacuc",
                name: "Hoa Hoa Cúc",
                price: "350.000đ",
                img: "../img/hoatuoi/sau.jpg"
            },
            {
                id: "hoamauhong",
                name: "Hoa Màu Hồng",
                price: "350.000đ",
                img: "../img/hoatuoi/bay.jpg"
            },
            {
                id: "hoacodon",
                name: "Hoa Cô Đơn",
                price: "350.000đ",
                img: "../img/hoatuoi/tam.jpg"
            }
        ];
    }

    const productList = document.getElementById('hoatn');
    productList.classList.add('justify-content-center');

    products.forEach((product) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center';
        col.innerHTML = `
            <div class="card" style="width: 16rem;">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title" style="font-size: 16px;">${product.name}</h5>
                    <p class="card-text" style="color: #ff69b4; font-weight: bold;">
                        ${
                            product.discount
                                ? `<span style="text-decoration:line-through;color:#888;">${product.price}</span> <span style="color:#ff69b4;">${product.discount}</span>`
                                : product.price
                        }
                    </p>
                    <a href="../html/chitiet.html?id=${product.id}" class="btn btn-pink" style="background:#ff69b4;color:#fff;">Đặt mua</a>
                </div>
            </div>
        `;
        productList.appendChild(col);
    });
});