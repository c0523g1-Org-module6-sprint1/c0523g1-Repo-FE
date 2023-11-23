import axios from "axios";
export const getListNewsfeed = async (loggedInAccountId) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/post/newsfeed/" +loggedInAccountId);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const getListForAdmin = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/post/admin");
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const getPostById = async (id) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/newsfeed/post/" + id);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const getPrivacyPost = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/privacy-post");
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const update = async (id,values) => {
    try {
        const respone = await axios.patch("http://localhost:8080/api/public/post/admin/" + id,values);
        console.log(respone.status);
        return respone.status; 
    } catch (error) {
        console.log(error);
    }
}

export const getListOfAnAccount = async (accountId) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/post/account/" + accountId);
        console.log(respone.data);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const checkIsFriend = async (accountId1,accountId2) => {
    try {
        const respone = await axios.get(`http://localhost:8080/api/public/post/isFriend?accountId1=${accountId1}&accountId2=${accountId2}`);
        console.log(respone.data);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const getListForFriend = async (accountId) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/post/friend/" + accountId);
        console.log(respone.data);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const getListForStranger = async (accountId) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/post/stranger/" + accountId);
        console.log(respone.data);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}













