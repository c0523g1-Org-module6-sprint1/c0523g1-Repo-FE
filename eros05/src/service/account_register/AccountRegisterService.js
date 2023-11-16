import axios from "axios";
export const register = async (values) => {
    const response = await axios.post("http://localhost:8080/api/public/user/register",values);
    console.log(response);
    return response;
}