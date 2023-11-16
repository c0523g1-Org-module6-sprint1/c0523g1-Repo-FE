import axios from "axios";

export async function getAll () {
    try {
        const res = await  axios.get("http://localhost:8080/api/comment/gift")
    }catch (e) {
        alert("Error Service")
    }
}