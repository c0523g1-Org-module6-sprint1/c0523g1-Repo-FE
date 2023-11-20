import axios from "axios";
import {getIdByJwt} from "../login/securityService";

export const GetProfileApi = async () => {
    let id = getIdByJwt();
    if (id) {
        try {
            const res = await axios.get(`http://localhost:8080/api/public/message/account`,{
                params: {
                    accountId: id
                }
            })
            return res;
        } catch (e) {
            console.log(e);
        }
    }
}
export const GetFriendsApi = async (name) => {
    let id = getIdByJwt();
    if (id) {
        try {
            const res = await axios.get(`http://localhost:8080/api/public/message/chatlist`,{
                params: {
                    accountId: id,
                    name: name
                }
            })
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}
export const GetUnknowApi = async (name) => {
    let id = getIdByJwt();
    if (id) {
        try {
            const res = await axios.get(`http://localhost:8080/api/public/message/unknowlist`,{
                params: {
                    accountId: id,
                    name: name
                }
            })
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}
export const GetChatBoxApi = async (friendId) => {
    let id = getIdByJwt();
    if (id) {
        try {
            const res = await axios.get(`http://localhost:8080/api/public/message/Chatbox`, {
                params: {
                    accountId: id,
                    id: friendId
                }
            })
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}
export const SetBusyApi = async (isBusy) => {
    let id = getIdByJwt();
    if (id) {
        try {
            const res = await axios.post(`http://localhost:8080/api/public/message`,{
                accountId: id,
                setbusy: !isBusy
            });
            return res;
        } catch (e) {
            console.log(e);
        }
    }
}

