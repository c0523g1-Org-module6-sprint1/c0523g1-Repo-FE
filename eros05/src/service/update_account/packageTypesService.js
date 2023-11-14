import axios from "axios";

const URL_PACKAGE_TYPES  = "http://localhost:8081/api/packageTypes"
// const URL_PACKAGE_TYPES  = "http://localhost:8080/packageTypes"
export const getAll = async () => {
    try {
        let response = await axios.get(URL_PACKAGE_TYPES);
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log("lỗi hàm getAll");
    }
}