import axios from "axios";
const URL_RECOMMEND ="http://localhost:8080/api/member/recommend"

export const findAll = async ()=> {
    try{
        let res = await axios.get( URL_RECOMMEND)
        return res.data
    }catch (e) {
        alert("Access denied")
    }
}