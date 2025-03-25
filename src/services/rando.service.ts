import httpClient from "../lib/http-client";
import { Rando, randoSchema } from "../schemas/rando.schema";

export const createRando = async (rando: Omit<Rando, "_id">) => {
  const response = await httpClient.post("/rando", rando);
  return response.data;
};

export const getRando = async () => {
  const response = await httpClient.get("/rando");
  //check data with schema
  const data = response.data.map((rando: Rando) => randoSchema.parse(rando));
  return data;
};

export const updateRando = async (id: string, rando: Rando) => {
  const response = await httpClient.put(`/rando/${id}`, rando);
  return response.data;
};

export const deleteRando = async (id: string) => {
  const response = await httpClient.delete(`/rando/${id}`);
  return response.data;
};

export const getRandoById = async (id: string) => {
  const response = await httpClient.get(`/rando/${id}`);
  return randoSchema.parse(response.data);
};
