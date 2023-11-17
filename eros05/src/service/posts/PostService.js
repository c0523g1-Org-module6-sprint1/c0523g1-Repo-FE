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

export const update = async (id,values) => {
    try {
        const respone = await axios.patch("http://localhost:8080/api/public/newsfeed/post/admin/" + id,values);
        console.log(respone.status);
        return respone.status; 
    } catch (error) {
        console.log(error);
    }
}
// export const upPost = async (values) => {
//     try {
//         let response = await axios.post(URL_POST, values);
//         return response.status;
//     } catch (e) {
//         console.log("lỗi hàm thêm mới");
//     }
// }




