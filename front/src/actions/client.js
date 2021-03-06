import {
  SET_MESSAGE,
  FECTH_CLIENTS_SUCCESS,
  FECTH_CLIENTS_FAIL,
  FECTH_CLIENT_SUCCESS,
  FECTH_CLIENT_FAIL,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  REMOVE_CLIENT_FOLDER_SUCCESS,
  REMOVE_CLIENT_FOLDER_FAIL,
  ADD_CLIENT_FOLDER_FAIL,
  ADD_CLIENT_FOLDER_SUCCESS,
  UPDATE_CLIENT_RESSOURCES_SUCCESS,
  UPDATE_CLIENT_RESSOURCES_FAIL,
} from "./types";

import * as ClientService from "../services/client.service";

export const getClients = () => (dispatch) => {
  return ClientService.getClients().then(
    (response) => {
      dispatch({
        type: FECTH_CLIENTS_SUCCESS,
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
        type: FECTH_CLIENTS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getClient = (id) => (dispatch) => {
  return ClientService.getClient(id).then(
    (response) => {
      dispatch({
        type: FECTH_CLIENT_SUCCESS,
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
        type: FECTH_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const createClient = (data) => (dispatch) => {
  return ClientService.createClient(data).then(
    (response) => {
      dispatch({
        type: CREATE_CLIENT_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve(response.data.message);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: CREATE_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const updateClient = (id, data) => (dispatch) => {
  return ClientService.updateClient(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_CLIENT_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
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
        type: UPDATE_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateRessource = (id, data) => (dispatch) => {
  return ClientService.updateRessource(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_CLIENT_RESSOURCES_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
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
        type: UPDATE_CLIENT_RESSOURCES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const addClientFolder = (id, data) => (dispatch) => {
  return ClientService.addClientFolder(id, data).then(
    (response) => {
      dispatch({
        type: ADD_CLIENT_FOLDER_SUCCESS,
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
        type: ADD_CLIENT_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const removeClientFolder = (id, data) => (dispatch) => {
  return ClientService.removeClientFolder(id, data).then(
    (response) => {
      console.log(response);
      dispatch({
        type: REMOVE_CLIENT_FOLDER_SUCCESS,
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
        type: REMOVE_CLIENT_FOLDER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteClient = (id) => (dispatch) => {
  return ClientService.deleteClient(id).then(
    (response) => {
      dispatch({
        type: DELETE_CLIENT_SUCCESS,
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
        type: DELETE_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
