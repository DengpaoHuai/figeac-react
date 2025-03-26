import axios from "axios";

export const API_KEY = "e23d6c50b9424da5bef021f95bf8e881";

const httpClient = axios.create({
  baseURL: `https://crudcrud.com/api/${API_KEY}`,
});

export default httpClient;
