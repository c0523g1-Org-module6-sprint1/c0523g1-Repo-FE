import axios from "axios";

    const URL_PACKAGE_TYPES  = "http://localhost:8080/api/public/packageTypes"
// const URL_PACKAGE_TYPES  = "http://localhost:8080/packageTypes"
export const getAll = async () => {
    try {
        let response = await axios.get(URL_PACKAGE_TYPES);
        return response.data;
    } catch (e) {
        console.log("lỗi hàm getAll");
    }
}

export const getAllPackageAccount = async () => {
    try {
        let response = await axios.get(URL_PACKAGE_TYPES + "/packageAccount");
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log("lỗi hàm getAllPackageAccount");
    }
}
export const findPackageAccount = async (idAccount) => {
    try {
        let response = await axios.get(URL_PACKAGE_TYPES + `/packageAccount/` + idAccount);
        return response.data;
    } catch (e) {
        console.log("lỗi hàm findPackageAccount");
    }
}