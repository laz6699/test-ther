$('#orderForm').on('submit', function(e) {
    e.preventDefault();
    const order = submitOrder();
    $('#orderModal').modal('hide');
    // Gán dữ liệu vào vùng PDF ẩn
    fillPdfContent(order);

    this.reset();

    // Khi bấm nút tải PDF
    $('#downloadPdfBtn').off('click').on('click', function(e) {
        e.preventDefault();
        const $pdfContent = $('#pdf-content');
        $pdfContent.show(); // Hiện vùng PDF tạm thời
        html2pdf().set({
            margin: 10,
            filename: 'don-hang.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from($pdfContent[0]).save().then(() => {
            $pdfContent.hide(); // Ẩn lại sau khi xuất PDF
        });
    });

    $('#successModal').modal('show');
});

// Sau khi người dùng đặt hàng thành công, điền đầy đủ thông tin vào #pdf-content:
function fillPdfContent(order) {
    $('#pdfProductName').text(order.productName || '');

    let price = order.productPrice;
    if (
        order.productDiscount &&
        order.productDiscount !== '' &&
        order.productDiscount !== order.productPrice
    ) {
        $('#pdfProductPriceOrigin').html(`<span style="text-decoration:line-through;color:#888;">${order.productPrice}</span>`);
        $('#pdfProductPriceDiscount').html(`<span style="color:#222; font-size:18px;">${order.productDiscount}</span>`);
        price = order.productDiscount;
    } else {
        $('#pdfProductPriceOrigin').html(`<span style="color:#222; font-size:18px;">${order.productPrice}</span>`);
        $('#pdfProductPriceDiscount').html(`<span style="color:#888;">Không áp dụng</span>`);
        price = order.productPrice;
    }

    $('#pdfProductQuantity').text(order.productQuantity || '');

    // Thành tiền = giá thực tế * số lượng
    let quantity = parseInt(order.productQuantity) || 1;
    // Chỉ tính nếu price là số hợp lệ
    let priceNum = Number(price.replace(/\D/g, '')) || 0;
    let total = priceNum * quantity;
    $('#pdfTotalPrice').html(
        `<span style="color:#ff6c9f; font-size:18px;">${total ? total.toLocaleString('vi-VN') : '0'}</span>`
    );

    $('#pdfReceiverName').text(order.receiverName || '');
    $('#pdfReceiverPhone').text(order.receiverPhone || '');
    $('#pdfAddress').text(order.address || '');
    $('#pdfCity').text(order.city || '');
    $('#pdfDistrict').text(order.district || '');
    $('#pdfDate').text(order.date || '');
    $('#pdfTime').text(order.time || '');
    $('#pdfNote').text(order.note || '');

    $('#pdfSenderName').text(order.senderName || '');
    $('#pdfSenderPhone').text(order.senderPhone || '');
    $('#pdfSenderEmail').text(order.senderEmail || '');
    $('#pdfRequest').text(order.request || '');
    $('#pdfHideSender').text(order.hideSender ? 'Có' : 'Không');
    $('#pdfVat').text(order.vat ? 'Có' : 'Không');
    $('#pdfStaffCode').text(order.staffCode || '');
}
