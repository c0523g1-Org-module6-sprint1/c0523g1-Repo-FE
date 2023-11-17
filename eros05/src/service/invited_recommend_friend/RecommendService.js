import axios from "axios";
const URL_RECOMMEND ="http://localhost:8080/api/public/recommend"

export const findAll = async ()=> {
    try{
        let res = await axios.get( URL_RECOMMEND)
        return res.data
    }catch (e) {
        return e
    }
}