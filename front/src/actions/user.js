import {
  SET_MESSAGE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  FECTH_USERS_FAIL,
  FECTH_USERS_SUCCESS,
  FECTH_USER_SUCCESS,
  FECTH_USER_FAIL,
  REMOVE_USER_FOLDER_SUCCESS,
  REMOVE_USER_FOLDER_FAIL,
  ADD_USER_FOLDER_FAIL,
  ADD_USER_FOLDER_SUCCESS,
  CREATE_PASSWORD_SUCCESS,
  CREATE_PASSWORD_FAIL,
} from "./types";

import * as UserService from "../services/user.service";

export const getUsers = () => (dispatch) => {
  return UserService.getUsers().then(
    (response) => {
      dispatch({
        type: FECTH_USERS_SUCCESS,
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
        type: FECTH_USERS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getUser = (id) => (dispatch) => {
  return UserService.getUser(id).then(
    (response) => {
      dispatch({
        type: FECTH_USER_SUCCESS,
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
        type: FECTH_USER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const create = (data) => (dispatch) => {
  return UserService.createUser(data).then(
    (response) => {
      dispatch({
        type: CREATE_USER_SUCCESS,
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
        type: CREATE_USER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const createPassword = (id, data) => (dispatch) => {
  return UserService.createPassword(id, data).then(
    (response) => {
      dispatch({
        type: CREATE_PASSWORD_SUCCESS,
        payload: response.data,
      });

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: response.data,
      // });

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
        type: CREATE_PASSWORD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateUser = (id, data) => (dispatch) => {
  return UserService.updateUser(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
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
        type: UPDATE_USER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addUserFolder = (id, data) => (dispatch) => {
  return UserService.addUserFolder(id, data).then(
    (response) => {
      dispatch({
        type: ADD_USER_FOLDER_SUCCESS,
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
        type: ADD_USER_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const removeUserFolder = (id, data) => (dispatch) => {
  return UserService.removeUserFolder(id, data).then(
    (response) => {
      console.log(response);
      dispatch({
        type: REMOVE_USER_FOLDER_SUCCESS,
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
        type: REMOVE_USER_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteUser = (id) => (dispatch) => {
  return UserService.deleteUser(id).then(
    (response) => {
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: id,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response,
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
        type: DELETE_USER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
