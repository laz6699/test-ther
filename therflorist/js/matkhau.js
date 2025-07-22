$(document).ready(function() {
    $('#loginModal').modal('show');
    $('#adminPassword').on('keypress', function(e) {
        if (e.which === 13) checkAdminPassword();
    });
});
function checkAdminPassword() {
    if ($('#adminPassword').val() === '150924') {
        $('#loginModal').modal('hide');
        $('body').show();
        $('#adminPassword').val('');
        $('#loginError').hide();
    } else {
        $('#loginError').show();
        $('#adminPassword').val('');
    }
}


let orderToDelete = null;
function showDeleteModal(orderId) {
    orderToDelete = orderId;
    $('#deletePassword').val('');
    $('#deleteError').hide();
    $('#deleteOrderModal').modal('show');
}

function confirmDeleteOrder() {
    const password = $('#deletePassword').val();
    
    if (password === '150924') {
        let orders = getConsultedOrders().filter(o => o.id !== orderToDelete);
        localStorage.setItem('consultedOrders', JSON.stringify(orders));
        $('#deleteOrderModal').modal('hide');
        renderConsulted();
    } else {
        $('#deleteError').show();
    }
}

let orderToCancel = null;
function showCancelModal(orderId) {
    if (confirm('Bạn có chắc chắn muốn hủy đơn này?')) {
        removeOrder(orderId);
        renderOrders();
    }
}

