import axios from "axios";

const URL_PERSONAL_PAGE = "http://localhost:8080/api/personal-page/"
const URL = "http://localhost:8080/"

export const getInfoPersonal = async (id) => {
   try {
       return await axios.get(URL_PERSONAL_PAGE+`${id}`)
   }catch (e) {
       console.log(e)
   }
}

export const getInfoAccount = async (name) =>{
    try {
        return await axios.get(URL+`${name}`)
    }catch (e) {
        console.log(e)
    }
}

