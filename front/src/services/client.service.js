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

export const createClient = async (data) => {
  return baseHttpService.post(`clients`, data);
};

export const updateClient = async (id, data) => {
  return baseHttpService.put(`clients/${id}`, data);
};

export const deleteClient = async (id) => {
  await baseHttpService._delete(`clients/${id}`);
};
