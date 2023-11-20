import axios from "axios";

const URL_SEARCH = "http://localhost:8080/api/public/search_advanced/"
const URL_GENDER = "http://localhost:8080/api/public/genders"
const URL_JOB = "http://localhost:8080/api/public/jobs"
const URL_HOBBY = "http://localhost:8080/api/public/hobby"
const URL_API = "https://provinces.open-api.vn/api/"

export const searchAdvanced = async (data) => {
        const res = await axios.post(URL_SEARCH, data)
        return res;
}

export const displayGender = async () => {
    try {
        const res = await axios.get(URL_GENDER)
        return res.data;
    } catch (e) {
        alert("fail")
    }
}

export const displayJob = async () => {
    try {
        const res = await axios.get(URL_JOB)
        return res.data;
    } catch (e) {
        alert("fail")
    }
}

export const displayHobby = async () => {
    try {
        const res = await axios.get(URL_HOBBY)
        return res.data;
    } catch (e) {
        alert("fail")
    }
}


export const location = async () => {
    try {
        const res = await axios.get(URL_API)
        return res.data;
        console.log(res.data)
    } catch (e) {
        alert("fail")
    }
}
