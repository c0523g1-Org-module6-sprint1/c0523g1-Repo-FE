import axios from "axios";

const URL_PERSONAL_PAGE = "http://localhost:8080/api/public/personal-page/"
const URL = "http://localhost:8080//api/public/"
const URL_SENT_INVITE = "http://localhost:8080/api/public/sent-invite/"
const URL_GET_STATUS ="http://localhost:8080/api/public/status/"

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

export const sentInvite = async (relationships) => {
    try {
        return await axios.post(URL_SENT_INVITE,relationships)
    }catch (e) {
        console.log(e)
    }
}

export const getStatus = async (idSent, idReceiver) =>{
    try {
       return  await axios.get(URL_GET_STATUS+`${idSent}/${idReceiver}`)
    }catch (e) {
        console.log(e.message)
    }
}
