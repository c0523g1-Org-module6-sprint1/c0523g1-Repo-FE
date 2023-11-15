export function formatPrice(price) {
    // Định dạng giá tiền thành xx.xxx
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}