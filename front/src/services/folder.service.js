import * as baseHttpService from "./base-http.service";
import queryString from "query-string";

export const getFolders = () => {
  const queryObj = {};

  // if (status.length) {
  //   queryObj.status = status;
  // }

  // if (search.length) {
  //   queryObj.search = search;
  // }

  const queryStr = queryString.stringify(queryObj);
  return baseHttpService.get("folders" + (queryStr ? `?${queryStr}` : ""));
};

export const getFolder = (id) => {
  return baseHttpService.get(`folders/${id}`);
};

export const createFolder = async (data) => {
  return baseHttpService.post(`folders`, data);
};

export const updateFolder = async (id, data) => {
  return baseHttpService.put(`folders/${id}`, data);
};

export const addToFolderUser = async (id, data) => {
  return baseHttpService.put(`folders/${id}/users/add`, data);
};

export const removeToFolderUser = async (id, data) => {
  return baseHttpService._delete(`folders/${id}/users/remove`, data);
};

export const addToFolderClient = async (id, data) => {
  return baseHttpService.put(`folders/${id}/clients/add`, data);
};

export const removeToFolderClient = async (id, data) => {
  return baseHttpService._delete(`folders/${id}/clients/remove`, data);
};

export const deleteFolder = async (id) => {
  await baseHttpService._delete(`folders/${id}`);
};
