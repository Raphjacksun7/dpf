import * as baseHttpService from "./base-http.service";
import queryString from "query-string";

export const getTasks = () => {
  const queryObj = {};

  // if (status.length) {
  //   queryObj.status = status;
  // }

  // if (search.length) {
  //   queryObj.search = search;
  // }

  const queryStr = queryString.stringify(queryObj);
  return baseHttpService.get("tasks" + (queryStr ? `?${queryStr}` : ""));
};

export const getTask = (id) => {
  return baseHttpService.get(`tasks/${id}`);
};

export const getTasksBySender = (id) => {
  return baseHttpService.get(`tasks/owner/${id}`);
};

export const getTasksByReciever = (id) => {
  return baseHttpService.get(`tasks/reciever/${id}`);
};

export const createTask = async (data) => {
  return baseHttpService.post(`tasks`, data);
};

export const updateTask = async (id, data) => {
  return baseHttpService.put(`tasks/${id}`, data);
};

export const deleteTask = async (id) => {
  await baseHttpService._delete(`tasks/${id}`);
};
