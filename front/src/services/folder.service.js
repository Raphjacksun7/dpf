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

export const deleteFolder = async (id) => {
  await baseHttpService._delete(`folders/${id}`);
};
