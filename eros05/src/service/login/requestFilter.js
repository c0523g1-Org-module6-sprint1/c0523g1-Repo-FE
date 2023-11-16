import axios from "axios";

const requestFilter = async () => {
    axios.interceptors.request
        .use(async (request) => {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                request.headers.Authorization = `Bearer ${accessToken}`
            }
            return request;
        })
}

export {requestFilter};