import * as baseHttpService from "./base-http.service";
import queryString from "query-string";

export const getClients = () => {
  const queryObj = {};

  // if (status.length) {
  //   queryObj.status = status;
  // }

  // if (search.length) {
  //   queryObj.search = search;
  // }

  const queryStr = queryString.stringify(queryObj);
  return baseHttpService.get("clients" + (queryStr ? `?${queryStr}` : ""));
};

export const getClient = (id) => {
  return baseHttpService.get(`clients/${id}`);
};

export const createClient = async (data) => {
  return baseHttpService.post(`clients`, data);
};

export const updateClient = async (id, data) => {
  return baseHttpService.put(`clients/${id}`, data);
};

export const updateRessource = async (id, data) => {
  return baseHttpService.put(`clients/${id}/ressources`, data);
};

export const addClientFolder = async (id, data) => {
  return baseHttpService.put(`clients/${id}/folders/add`, data);
};

export const removeClientFolder = async (id, data) => {
  return baseHttpService._delete(`clients/${id}/folders/remove`, data);
};

export const deleteClient = async (id) => {
  await baseHttpService._delete(`clients/${id}`);
};
