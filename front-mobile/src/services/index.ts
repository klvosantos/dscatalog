import axios from "axios";

export const api = axios.create({
    baseURL: "https://marcelo-dscatalog.herokuapp.com",
});
