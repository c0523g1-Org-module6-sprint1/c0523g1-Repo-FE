import axios from "axios";
const URL_INVITED ="http://localhost:8081/api/member/invited"

export const findAll = async ()=> {
    try{
        let res = await axios.get( URL_INVITED)
        return res.data
    }catch (e) {
        alert("Access denied")
    }
}