import {jwtDecode} from "jwt-decode";
import axios from "axios";


const API_URL = "http://localhost:8080/api";

const doLogin = async (data) => {
    return await axios.post(API_URL + "/public/login", data);
};

const addAccessToken = async (jwt) => {
    localStorage.setItem("accessToken", jwt);
}

const getAccessToken = () => {
    const jwt = localStorage.getItem("accessToken");
    if (jwt) {
        return jwtDecode(jwt);
    } else {
        return null;
    }
}

const getUsernameByJwt = () => {
    const jwt = localStorage.getItem("accessToken");
    if (jwt) {
        return jwtDecode(jwt).sub;
    } else {
        return null;
    }
}

const getIdByJwt = () => {
    const jwt = localStorage.getItem("accessToken");
    if (jwt) {
        return jwtDecode(jwt).id;
    } else {
        return null;
    }
}

const getRoleByJwt = () => {
    const jwt = localStorage.getItem("accessToken");
    if (jwt) {
        return jwtDecode(jwt).role[0].authority;
    } else {
        return null;
    }
}

const handleLogout = () => {
    localStorage.removeItem("accessToken");
}

export {doLogin, addAccessToken, getUsernameByJwt, getIdByJwt, getRoleByJwt, getAccessToken};