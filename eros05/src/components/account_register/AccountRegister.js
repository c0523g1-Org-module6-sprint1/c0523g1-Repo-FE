import {useNavigate} from "react-router-dom";
import * as Yup from "yup";

export function Register() {
    const navigate = useNavigate();

    const initValuesRegister = {
        userName : "",
        password : "",
        birthday : "",
        gender : JSON.stringify({
            id : 1,
            name : "Nam"
        }),
        job : JSON.stringify({
            id : 1,
            name : "IT"
        }),
        location : JSON.stringify({
            id : 1,
            name : "ĐN"
        }),
        email : "",
        confirmEmail : ""
    }

}