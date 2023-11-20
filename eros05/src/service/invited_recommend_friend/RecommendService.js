import axios from "axios";

export const findAll = async ()=> {
    try{
        let res = await axios.get("http://localhost:8080/api/public/recommend")
        return res.data
    }catch (e) {
        return e
    }
}