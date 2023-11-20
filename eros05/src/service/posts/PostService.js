import axios from "axios";
export const getListNewsfeed = async (loggedInAccountId) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/post/newsfeed/" +loggedInAccountId);
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

export const getListOfAnAccount = async (userName) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/post/account/" + userName);
        console.log(respone.data);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}










