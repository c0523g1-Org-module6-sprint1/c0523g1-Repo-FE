import Swal from "sweetalert2";

export const alert = (pricePay,nameAccount) => {
    Swal.fire({
        title: "Thông báo!",
        text: `Thanh toán thành công ${pricePay} vnđ bạn đã thay đổi thành hạng ${nameAccount}`,
        icon: "success"
    });
}

export const handlePackage = async (namePackageAccount, nameAccount) => {
    if (namePackageAccount !== nameAccount){
        Swal.fire({
            title: "Thông báo thay đổi thứ hạng",
            text: `Hiện tại thứ hạng của bạn đang là ${namePackageAccount}, nếu bạn mua gói ${nameAccount} thì thứ hạng sẽ bị thay đổi. Thay vào đó nếu bạn thanh toán gói này chúng tôi sẽ hoàn lại kim cương dựa vào số ngày còn lại của gói cũ`,
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tôi đã hiểu"
        })

    }
}