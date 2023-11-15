import axios from "axios";

const LOGIN_API = "http://localhost:8080/api/public/login";

const doLogin = async (loginRequest) => {
    const res = await axios.post(LOGIN_API, loginRequest);
    console.log(res.status);
};

export {doLogin};