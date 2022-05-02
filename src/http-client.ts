import axios from "axios";

export const httpCLient = axios.create({
    baseURL: "https://localhost:7209/api",
    headers: {
        "Content-type": "application/json"
    }
});

export default httpCLient;
