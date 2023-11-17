import axios from "axios";

// const URL_API = "https://provinces.open-api.vn/api/";
//
// export const locationService = async ()=>{
//     try {
//         const res = await  axios.get(URL_API )
//         return res.data;
//     }catch ( e){
//         alert("fail service")
//     }
// }
export const editAccount= async (id, account) => {

        const res = await axios.patch(`http://localhost:8080/api/personal-page/edit/${id}`, account);
        return res.data;
}
export const getAccountByIdService = async (id) => {
        const res = await axios.get(`http://localhost:8080/api/personal-page/edit/${id}`)
        return res.data;
}
const URL ="http://localhost:8080/api/public/genders";
const URL_JOB ="http://localhost:8080/api/public/jobs";
const URL_LOCATION ="http://localhost:8080/api/public/locations";
export const genderService = async ( location)=>{
        const res = await  axios.get(URL)
        return res.data;
}

export const jobService = async ( location)=>{
        const res = await  axios.get(URL_JOB)
        return res.data;
}

export const locationService = async ( location)=>{
    const res = await  axios.get(URL_LOCATION)
    return res.data;
}
