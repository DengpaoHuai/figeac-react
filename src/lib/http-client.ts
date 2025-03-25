import axios from "axios";

export const API_KEY = "4eb34a5b8dfa4d73b34a7f19dbb6bf93";

const httpClient = axios.create({
  baseURL: `https://crudcrud.com/api/${API_KEY}`,
});

export default httpClient;
