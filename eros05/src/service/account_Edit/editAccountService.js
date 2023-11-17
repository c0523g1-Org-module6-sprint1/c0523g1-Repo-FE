import axios from "axios";


const URL = "";
const URL_API = "https://provinces.open-api.vn/api/";

export const locationService = async ()=>{
    try {
        const res = await  axios.get(URL_API )
        return res.data;
    }catch ( e){
        alert("fail service")
    }
}
export const editAccountService = async (id, account) => {

        const res = await axios.patch(`http://localhost:8080/api/personal-page/edit/${id}`, account);
        return res.data;
}
export const getAccountByIdService = async (id) => {
        const res = await axios.get(`http://localhost:8080/api/personal-page/edit/${id}`)
        return res.data;
}