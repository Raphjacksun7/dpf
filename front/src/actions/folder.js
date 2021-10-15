import {
  ADD_FOLDER_CLIENT_FAIL,
  ADD_FOLDER_CLIENT_SUCCESS,
  ADD_FOLDER_USER_FAIL,
  ADD_FOLDER_USER_SUCCESS,
  CREATE_FOLDER_FAIL,
  CREATE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAIL,
  DELETE_FOLDER_SUCCESS,
  FECTH_FOLDERS_FAIL,
  FECTH_FOLDERS_SUCCESS,
  FECTH_FOLDER_FAIL,
  FECTH_FOLDER_SUCCESS,
  REMOVE_FOLDER_CLIENT_FAIL,
  REMOVE_FOLDER_CLIENT_SUCCESS,
  REMOVE_FOLDER_USER_FAIL,
  REMOVE_FOLDER_USER_SUCCESS,
  SET_MESSAGE,
  UPDATE_FOLDER_FAIL,
  UPDATE_FOLDER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "./types";

import * as FolderService from "../services/folder.service";

export const getFolders = () => (dispatch) => {
  return FolderService.getFolders().then(
    (response) => {
      dispatch({
        type: FECTH_FOLDERS_SUCCESS,
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
        type: FECTH_FOLDERS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getFolder = (id) => (dispatch) => {
  return FolderService.getFolder(id).then(
    (response) => {
      dispatch({
        type: FECTH_FOLDER_SUCCESS,
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
        type: FECTH_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const createFolder = (data) => (dispatch) => {
  return FolderService.createFolder(data).then(
    (response) => {
      dispatch({
        type: CREATE_FOLDER_SUCCESS,
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
        type: CREATE_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateFolder = (id, data) => (dispatch) => {
  return FolderService.updateFolder(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_FOLDER_SUCCESS,
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
        type: UPDATE_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addToFolderUser = (id, data) => (dispatch) => {
  return FolderService.addToFolderUser(id, data).then(
    (response) => {
      dispatch({
        type: ADD_FOLDER_USER_SUCCESS,
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
        type: ADD_FOLDER_USER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const removeToFolderUser = (id, data) => (dispatch) => {
  return FolderService.removeToFolderUser(id, data).then(
    (response) => {
      console.log(response);
      dispatch({
        type: REMOVE_FOLDER_USER_SUCCESS,
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
        type: REMOVE_FOLDER_USER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addToFolderClient = (id, data) => (dispatch) => {
  return FolderService.addToFolderClient(id, data).then(
    (response) => {
      dispatch({
        type: ADD_FOLDER_CLIENT_SUCCESS,
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
        type: ADD_FOLDER_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const removeToFolderClient = (id, data) => (dispatch) => {
  return FolderService.removeToFolderClient(id, data).then(
    (response) => {
      console.log(response);
      dispatch({
        type: REMOVE_FOLDER_CLIENT_SUCCESS,
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
        type: REMOVE_FOLDER_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const deleteFolder = (id) => (dispatch) => {
  return FolderService.deleteFolder(id).then(
    (response) => {
      dispatch({
        type: DELETE_FOLDER_SUCCESS,
        payload: response,
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
        type: DELETE_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
