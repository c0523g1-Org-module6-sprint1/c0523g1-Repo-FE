import axios from "axios";

const URL = "http://localhost:8080/api/public/comment"

export async function getAllCommentsService() {
    const res = await axios.get(URL)
    console.log(res)
    return res.data;
}

export async function createCommentService(data) {
    return await axios.post(URL, data);
}

export async function deleteCommentService(id) {
    return await axios.delete(URL + `/${id}`)
}

export async function getCommentById(id) {
    const res = await axios.get(URL + `${id}`);
    return res.data;
}