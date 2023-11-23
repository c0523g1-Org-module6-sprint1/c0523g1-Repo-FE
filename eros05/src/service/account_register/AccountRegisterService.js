import axios from "axios";



export const register = async (values) => {
    console.log(values)
   try{
       const response = await axios.post("http://localhost:8080/api/public/user/register",values);
       console.log(response)
       return response;
   }catch (e) {
       console.log("loi")
   }
}

export const getJob = async () => {
    const response = await axios.get("http://localhost:8080/api/public/jobs");
    return response.data;
}

export const getLocation = async () => {
    const response = await axios.get("http://localhost:8080/api/public/locations");
    return response.data;
}