import axios from "axios";

export const findAll = async (id,roleID)=> {
    try{
        let res = await axios.get(`http://localhost:8080/api/public/recommend/${id}/${roleID}`)
        return res.data
    }catch (e) {
        return e
    }
}