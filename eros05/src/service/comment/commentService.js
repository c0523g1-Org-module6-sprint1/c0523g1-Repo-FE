import axios from "axios";

const URL = "http://localhost:8080/api/public/comment"

export async function getAllCommentsService() {
    const res = await axios.get(URL)
    console.log(res)
    return res.data;
}

export async function createCommentService(data) {
    try {
    return  await axios.post(URL,data);
    }catch (e) {
        alert("Error Service")
    }
}

export async function deleteCommentService(id){
    return await axios.delete(URL + `/${id}`)
}