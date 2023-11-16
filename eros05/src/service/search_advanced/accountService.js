import axios from "axios";
const URL_SEARCH = "http://localhost:8080/api/public/search_advanced"
const URL_API = "https://provinces.open-api.vn/api/"

export const searchAdvanced= async (name, birthday, gender, job, hobby)=>{
    try {
        const res = await  axios.get(URL_SEARCH )
        return res.data;
    }catch (e){
        alert("fail")
    }
}

export const cities= async ( location)=>{
    try {
        const res = await  axios.get(URL_API )
        return res.data;
    }catch ( e){
        alert("fail")
    }
}
