import axios from "axios";

export const getAll = async (username, typeAccount, page) => {
    try {
        if (typeAccount === "") {
            return await axios.get(`http://localhost:8080/api/public/accounts?username=${username}&page=${page}`)
        } else {
            return await axios.get(`http://localhost:8080/api/public/accounts?username=${username}&typeAccount=${typeAccount}&page=${page}`)
        }
    } catch (e) {
        alert("Error")
    }
}

export const getAllType = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/public/typeAccounts")
        return res.data
    } catch (e) {
        alert("Error")
    }
}

export const remove = async (data) => {
    try {
        const res = await axios.delete("http://localhost:8080/api/public/accounts/", { data });
        return res.status;
    } catch (e) {
        alert("Xoá Thất Bại")
    }
}