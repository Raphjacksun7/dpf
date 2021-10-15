import {
  ACCOUNT_ACCESS_FAIL,
  ACCOUNT_ACCESS_SUCCESS,
  ACCESS_FOLDER_SUCCESS,
  ACCESS_FOLDER_FAIL,
  NEW_TASK_SUCCESS,
  NEW_TASK_FAIL,
  END_TASK_SUCCESS,
  END_TASK_FAIL,
  SET_MESSAGE,
} from "./types";

import * as MailerService from "../services/mailer.service";

export const accessAccount = (data) => (dispatch) => {
  return MailerService.accessAccount(data).then(
    (response) => {
      dispatch({
        type: ACCOUNT_ACCESS_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: ACCOUNT_ACCESS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};


export const accessFolder = (data) => (dispatch) => {
  return MailerService.accessFolder(data).then(
    (response) => {
      dispatch({
        type: ACCESS_FOLDER_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: ACCESS_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};


export const newTask = (data) => (dispatch) => {
  return MailerService.newTask(data).then(
    (response) => {
      dispatch({
        type: NEW_TASK_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: NEW_TASK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const endTask = (data) => (dispatch) => {
  return MailerService.endTask(data).then(
    (response) => {
      dispatch({
        type: END_TASK_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: END_TASK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};
