import axios from "axios";
const URL_TOP = "http://localhost:8080/api/member/top_hundered"

export const display= async ()=>{
    try {
        const res = await  axios.get(URL_TOP)
        console.log(res)
        return res.data;

    }catch (e){
        alert("fail")
    }
}