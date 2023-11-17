import axios from "axios";

// const URL_PACKAGE_DETAIL = "http://localhost:8081/api/packageDetail"
const URL_PACKAGE_DETAIL = "http://localhost:8080/api/public/packageDetail"

export const getAll = async () => {
    try {
        let response = await axios.get(URL_PACKAGE_DETAIL);
        return response.data;
    } catch (e) {
        console.log("lỗi hàm getAll");
    }
}
export const setAccountTypesToAccount = async (values) => {
    console.log("++++++++++++++++++")
    console.log(values)
    try {
        let response = await axios.patch(URL_PACKAGE_DETAIL, values);
        console.log("kết quả")
        console.log(response)
        return response.status;
    } catch (e) {
        console.log("Sửa thất bại !");
    }
}
export const setMoneyAccount = async (values) => {
    console.log("-------------------------")
    console.log(values.idAccount + " id tìm dc")
    console.log(values.newMoney + " tiền mới")
    try {
        let response = await axios.patch(URL_PACKAGE_DETAIL + "/setMoneyAccount", values);
        return response.status;
    } catch (e) {
        console.log("Sửa thất bại !");
    }
}
export const findById = async (id) => {
    try {
        let response = await axios.get(`http://localhost:8080/accounts + \`/${id}\``);
        return response.data;
    } catch (e) {

    }
}