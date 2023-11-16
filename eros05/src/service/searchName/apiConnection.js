import axios from "axios";

const URL_ACCOUNT = "http://localhost:8080/api/public/search-name";
// const URL_USER = "http://localhost:8080/api/public/search-name/user";
export const searchByName = async (name)=>{
    try{
        const res = await axios.get(URL_ACCOUNT+`/${name}`)
        return res;
    }catch (e){
        alert("Tìm tên lỗi");
    }
}
// export const findByUserName = async (userName)=>{
//     try{
//         const res = await axios.get(URL_ACCOUNT+`/${userName}`)
//         return res;
//     }catch (e){
//         alert("Tìm user lỗi");
//     }
// }