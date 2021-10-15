import * as baseHttpService from "./base-http.service";
import queryString from "query-string";

export const getUsers = () => {
  const queryObj = {};
  const queryStr = queryString.stringify(queryObj);
  return baseHttpService.get("users" + (queryStr ? `?${queryStr}` : ""));
};

export const getUser = (id) => {
  return baseHttpService.get(`users/${id}`);
};

export const createUser = async (data) => {
  return baseHttpService.post(`users`, data);
};

export const createPassword = async (id, data) => {
  return baseHttpService.put(`users/${id}/create-password`, data);
};

export const updateUser = async (id, data) => {
  return baseHttpService.put(`users/${id}`, data);
};

export const addUserFolder = async (id, data) => {
  return baseHttpService.put(`users/${id}/folders/add`, data);
};

export const removeUserFolder = async (id, data) => {
  return baseHttpService._delete(`users/${id}/folders/remove`, data);
};

export const deleteUser = async (id) => {
  return baseHttpService._delete(`users/${id}`);
};
