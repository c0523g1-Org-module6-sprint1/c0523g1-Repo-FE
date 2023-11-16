import axios from "axios";

const URL_ACCOUNT_TYPES = "http://localhost:8081/api/accountTypes"
const URL_POST = "http://localhost:8080/post"
export const getAll = async () => {
    try {
        let response = await axios.get(URL_ACCOUNT_TYPES);
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log("lỗi hàm getAll");
    }
}
export const upPost = async (values) => {
    try {
        let response = await axios.post(URL_POST, values);
        return response.status;
    } catch (e) {
        console.log("lỗi hàm thêm mới");
    }
}
export const checkVnPay = async (values) => {
    try {
        const a  = await axios.get(`http://localhost:8080/pay?sum=${values}`);
        return a.data;
    } catch (e) {
        console.log("lỗi hàm thêm mới");
    }
}