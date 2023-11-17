export function formatPrice(price) {
    // Định dạng giá tiền thành xx.xxx
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
export function vndToUsd(vnd) {
    const exchangeRate = 24288; // Tỷ giá VND sang USD
    let usd = vnd / exchangeRate;
    let strUsd = usd.toString()
    let newUsd = strUsd.substring(0,4)
    let numberUsd = +newUsd;
    console.log(numberUsd)
    return numberUsd;
}