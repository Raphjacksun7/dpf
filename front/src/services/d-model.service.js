import * as baseHttpService from "./base-http.service";
import queryString from "query-string";

export const getDModels = () => {
  const queryObj = {};

  // if (status.length) {
  //   queryObj.status = status;
  // }

  // if (search.length) {
  //   queryObj.search = search;
  // }

  const queryStr = queryString.stringify(queryObj);
  return baseHttpService.get("d-models" + (queryStr ? `?${queryStr}` : ""));
};

export const getDModel = (id) => {
  return baseHttpService.get(`d-models/${id}`);
};

export const getDModelsByFolder = (id) => {
  return baseHttpService.get(`d-models/folder/${id}`);
};

export const createDModel = async (data) => {
  return baseHttpService.post(`d-models`, data);
};

export const updateDModel = async (id, data) => {
  return baseHttpService.put(`d-models/${id}`, data);
};

export const deleteDModel = async (id) => {
  await baseHttpService._delete(`d-models/${id}`);
};
