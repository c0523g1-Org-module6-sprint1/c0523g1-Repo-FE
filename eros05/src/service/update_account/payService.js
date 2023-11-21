import axios from "axios";

export const checkVnPay = async (values) => {
    try {
        const a  = await axios.get(`http://localhost:8080/api/member/pay?sum=${values}`);
        return a.data;
    } catch (e) {
        console.log("lỗi hàm thêm mới");
    }
}