import * as baseHttpService from "./base-http.service";

export const accessAccount = async (data) => {
  return baseHttpService.post(`mailer/access-account`, data);
};

export const accessFolder = async (data) => {
  return baseHttpService.post(`mailer/access-folder`, data);
};

export const newTask = async (data) => {
  return baseHttpService.post(`mailer/new-task`, data);
};

export const endTask = async (data) => {
  return baseHttpService.post(`mailer/end-task`, data);
};

