import axios from "axios";
export const getListPublic = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/newsfeed/post/public");
        console.log(respone.data);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const getPostById = async (id) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/newsfeed/post/" + id);
        console.log(respone.data);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}

export const getPrivacyPost = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/public/privacy-post");
        console.log(respone.data);
        return respone.data; 
    } catch (error) {
        console.log(error);
    }
}


