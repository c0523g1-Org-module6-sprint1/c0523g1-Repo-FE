import axios from "axios";

const URL_ACCOUNT_TYPES = "http://localhost:8080/api/public/accountTypes"
const URL_POST = "http://localhost:8080/api/public/post/new"
export const getAll = async () => {
    try {
        let response = await axios.get(URL_ACCOUNT_TYPES);
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