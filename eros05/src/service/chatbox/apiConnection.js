import axios from "axios";

export const GetProfileApi = async () => {

    try {
        const res = await axios.get(`http://localhost:8080/api/public/message/account`)
        return res;
    } catch (e) {
        console.log(e);
    }
}
export const GetFriendsApi = async (name) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/public/message/chatlist?name=${name}`)
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const GetUnknowApi = async (name) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/public/message/unknowlist?name=${name}`)
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const GetChatBoxApi = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/public/message/Chatbox/${id}`)
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const SetBusyApi = async (isBusy) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/public/message/setbusy?busyMode=${!isBusy}`);
        return res;
    } catch (e) {
        console.log(e);
    }
}

