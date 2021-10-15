import {
  CREATE_TASK_FAIL,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_SUCCESS,
  FECTH_RECIEVER_TASK_FAIL,
  FECTH_RECIEVER_TASK_SUCCESS,
  FECTH_SENDER_TASK_FAIL,
  FECTH_SENDER_TASK_SUCCESS,
  FECTH_TASKS_FAIL,
  FECTH_TASKS_SUCCESS,
  FECTH_TASK_FAIL,
  FECTH_TASK_SUCCESS,
  SET_MESSAGE,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "./types";

import * as TaskService from "../services/task.service";

export const getTasks = () => (dispatch) => {
  return TaskService.getTasks().then(
    (response) => {
      dispatch({
        type: FECTH_TASKS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FECTH_TASKS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getTask = (id) => (dispatch) => {
  return TaskService.getTask(id).then(
    (response) => {
      dispatch({
        type: FECTH_TASK_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FECTH_TASK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getTasksBySender = (id) => (dispatch) => {
  return TaskService.getTasksBySender(id).then(
    (response) => {
      dispatch({
        type: FECTH_SENDER_TASK_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FECTH_SENDER_TASK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getTasksByReciever = (id) => (dispatch) => {
  return TaskService.getTasksByReciever(id).then(
    (response) => {
      dispatch({
        type: FECTH_RECIEVER_TASK_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FECTH_RECIEVER_TASK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const createTask = (data) => (dispatch) => {
  return TaskService.createTask(data).then(
    (response) => {
      dispatch({
        type: CREATE_TASK_SUCCESS,
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
        type: CREATE_TASK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateTask = (id, data) => (dispatch) => {
  return TaskService.updateTask(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_TASK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteTask = (id) => (dispatch) => {
  return TaskService.deleteTask(id).then(
    (response) => {
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: id,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_TASK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
