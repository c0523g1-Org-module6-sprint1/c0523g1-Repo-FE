import axios from "axios";
import {jwtDecode} from "jwt-decode";


const API_URL = "http://localhost:8080/api";

const doLogin = async (loginRequest) => {
    return await axios.post(API_URL + "/public/login", loginRequest);
};

const addAccessToken = async (jwt) => {
    localStorage.setItem("accessToken", jwt);
}

const getAccountInfoByJwt = () => {
    const jwt = localStorage.getItem("accessToken");
    if (jwt) {
        return jwtDecode(jwt);
    } else {
        return null;
    }
}


export {doLogin, addAccessToken};