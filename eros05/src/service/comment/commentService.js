import axios from "axios";

const URL = "http://localhost:8080/api/public/comment"

export async function getAllCommentsService() {
    const res = await axios.get(URL)
    console.log(res)
    return res.data;
}

export async function createCommentService(content) {
    const res = await axios.post(URL, content)
    return res;
}