import axios from "axios";

export const httpCLient = axios.create({
    baseURL: "https://distributed22.azurewebsites.net/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});

export default httpCLient;
