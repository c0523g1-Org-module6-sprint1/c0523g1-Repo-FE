import axios from "axios";

const URL_ACCOUNT_TYPES = "http://localhost:8081/api/accountTypes"
export const getAll = async () => {
    try {
        let response = await axios.get(URL_ACCOUNT_TYPES);
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log("lỗi hàm getAll");
    }
}