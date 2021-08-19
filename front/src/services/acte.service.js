import * as baseHttpService from "./base-http.service";
import queryString from "query-string";

export const getActes = () => {
  const queryObj = {};

  // if (status.length) {
  //   queryObj.status = status;
  // }

  // if (search.length) {
  //   queryObj.search = search;
  // }

  const queryStr = queryString.stringify(queryObj);
  return baseHttpService.get("actes" + (queryStr ? `?${queryStr}` : ""));
};

export const getActe = (id) => {
  return baseHttpService.get(`actes/${id}`);
};

export const getActesByFolder = (id) => {
  return baseHttpService.get(`actes/folder/${id}`);
};

export const createActe = async (data) => {
  return baseHttpService.post(`actes`, data);
};

export const updateActe = async (id, data) => {
  return baseHttpService.put(`actes/${id}`, data);
};

export const deleteActe = async (id) => {
  await baseHttpService._delete(`actes/${id}`);
};
