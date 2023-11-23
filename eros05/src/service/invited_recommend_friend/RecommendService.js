import axios from "axios";

export const findAll = async (id,roleID,genderName,locationName)=> {
    try{
        // let res = await axios.get(`http://localhost:8080/api/public/recommend/${id}/${roleID}/${genderName}`)
        let res = await axios.get(`http://localhost:8080/api/public/recommend?id=${id}&roleID=${roleID}&genderName=${genderName}&locationName=${locationName}`)
        return res.data
    }catch (e) {
        return e
    }
}

export const findAllLocation = async ()=> {
    try{
        // let res = await axios.get(`http://localhost:8080/api/public/recommend/${id}/${roleID}/${genderName}`)
        let res = await axios.get(`http://localhost:8080/api/public/recommend/locationHLP`)
        return res.data
    }catch (e) {
        return e
    }
}
export const findAccountById =async (id)=>{
    try{
        let res = await axios.get(`http://localhost:8080/api/public/personal-page/${id}`)
        return res.data
    }catch (e) {
        return e
    }
}