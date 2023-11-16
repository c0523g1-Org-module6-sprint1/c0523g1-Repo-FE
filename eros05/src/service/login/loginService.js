import {jwtDecode} from "jwt-decode";
import axios from "axios";


const API_URL = "http://localhost:8080/api";

const doLogin = async (loginRequest) => {
    return await axios.post(API_URL + "/public/login", loginRequest);
};

const addAccessToken = async (jwt) => {
    localStorage.setItem("accessToken", jwt);
}

const getUsernameByJwt = () => {
    const jwt = localStorage.getItem("accessToken");
    if (jwt) {
        return jwtDecode(jwt).sub.sub;
    } else {
        return null;
    }
}

const getIdByJwt = () => {
    const jwt = localStorage.getItem("accessToken");
    if (jwt) {
        return jwtDecode(jwt).sub.id;
    } else {
        return null;
    }
}





export {doLogin, addAccessToken, getUsernameByJwt, getIdByJwt};