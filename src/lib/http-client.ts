import axios from "axios";

export const API_KEY = "0c4a3379aa4b4c139c689a33c01f79eb";

const httpClient = axios.create({
  baseURL: `https://crudcrud.com/api/${API_KEY}`,
});

export default httpClient;
