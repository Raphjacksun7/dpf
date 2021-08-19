import * as baseHttpService from "./base-http.service";
import queryString from "query-string";

export const getUsers = () => {
  const queryObj = {};

  // if (status.length) {
  //   queryObj.status = status;
  // }

  // if (search.length) {
  //   queryObj.search = search;
  // }

  const queryStr = queryString.stringify(queryObj);
  return baseHttpService.get("users" + (queryStr ? `?${queryStr}` : ""));
};

export const getUser = (id) => {
  return baseHttpService.get(`users/${id}`);
};


export const createUser = async (data) => {
  return baseHttpService.post(`users`, data);
};

export const updateUser = async (id, data) => {
  return baseHttpService.put(`users/${id}`, data);
};

export const deleteUser = async (id) => {
  await baseHttpService._delete(`users/${id}`);
};
