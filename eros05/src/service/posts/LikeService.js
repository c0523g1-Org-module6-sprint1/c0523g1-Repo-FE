import axios from "axios";
export const insertLike = async (accountId,postId) => {
    try {
        const respone = await axios.post(`http://localhost:8080/api/public/like/new?accountId=${accountId}&postId=${postId}`)
        console.log(respone.status);
    } catch (error) {
        console.log(error);
    }
}

export const getAmountLike = async (postId) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/like/amount/" + postId);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}


export const checkIsLiked = async (postId, accountId) => {
    try {
        const respone = await axios.get(`http://localhost:8080/api/public/like/isLiked?postId=${postId}&accountId=${accountId}`);
        return respone;
    } catch (error) {
        console.log(error);
    }
}

export const unlike = async (postId, accountId) => {
    try {
        const respone = await axios.delete(`http://localhost:8080/api/public/like/${postId}/${accountId}`);
        return respone.status;
    } catch (error) {
        console.log(error);
    }
}

