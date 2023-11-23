import axios from "axios";

export const getAll = async (username, typeAccount, page) => {
    try {
        if (typeAccount === "") {
            return await axios.get(`http://localhost:8080/api/public/accounts?username=${username}&page=${page}`)
        } else {
            return await axios.get(`http://localhost:8080/api/public/accounts?username=${username}&typeAccount=${typeAccount}&page=${page}`)
        }
    } catch (e) {
        alert("Hiển Thị Danh Sách Thất Bại");
    }
};
export const getAllType = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/public/typeAccounts")
        return res.data;
    } catch (e) {
        alert("Hiên Thị Loại Account Thất Bại");
    }
};

export const remove = async (data) => {
    try {
        return await axios.patch(`http://localhost:8080/api/public/accounts/lock/`, data);
    } catch (e) {
        alert("Khoá Thất Bại");
    }

};
export const unlock = async (id) => {
    try {
        return await axios.patch(`http://localhost:8080/api/public/accounts/unlock/${id}`);
    } catch (error) {
        throw new Error("Mở Khoá Thất Bại");
    }
};