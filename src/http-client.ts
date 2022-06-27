import axios from "axios";

export const httpCLient = axios.create({
    baseURL: "https://localhost:7209/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});

export default httpCLient;
    