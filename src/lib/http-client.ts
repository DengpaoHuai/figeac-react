import axios from "axios";

export const API_KEY = "0bf2f4023cda4f68b1bdb08584f7f1ea";

const httpClient = axios.create({
  baseURL: `https://crudcrud.com/api/${API_KEY}`,
});

export default httpClient;
