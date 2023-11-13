import axios from "axios";

const URL_PACKAGE_DETAIL = "http://localhost:8081/api/packageDetail"

export const getAll = async () => {
    try {
        let response = await axios.get(URL_PACKAGE_DETAIL);
        return response.data;
    } catch (e) {
        console.log("lỗi hàm getAll");
    }
}
export const setAccountTypes = async (values) =>{
    try {
        let response = await axios.put(URL_PACKAGE_DETAIL + "/" + values.id, values);
        return response.status;
    } catch (e){
        console.log("Sửa thất bại !");
    }
}
export const setMoneyAccount = async (Account, newMoney) =>{
    try {
        let response = await axios.put(URL_PACKAGE_DETAIL + "/" + Account.id);
        return response.status;
    } catch (e){
        console.log("Sửa thất bại !");
    }
}