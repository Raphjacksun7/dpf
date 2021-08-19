import {
  CREATE_ACTE_FAIL,
  CREATE_ACTE_SUCCESS,
  DELETE_ACTE_FAIL,
  DELETE_ACTE_SUCCESS,
  FECTH_ACTES_FAIL,
  FECTH_ACTES_SUCCESS,
  FECTH_ACTE_FAIL,
  FECTH_ACTE_SUCCESS,
  FECTH_FOLDER_ACTE_FAIL,
  FECTH_FOLDER_ACTE_SUCCESS,
  SET_MESSAGE,
  UPDATE_ACTE_FAIL,
  UPDATE_USER_SUCCESS,
} from "./types";

import * as ActeService from "../services/acte.service";

export const getActes = () => (dispatch) => {
  return ActeService.getActes().then(
    (response) => {
      dispatch({
        type: FECTH_ACTES_SUCCESS,
        payload:  response.data,
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
        type: FECTH_ACTES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getActe = (id) => (dispatch) => {
  return ActeService.getActe(id).then(
    (response) => {
      dispatch({
        type: FECTH_ACTE_SUCCESS,
        payload:  response.data,
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
        type: FECTH_ACTE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const getActesByFolder = (id) => (dispatch) => {
  return ActeService.getActesByFolder(id).then(
    (response) => {
      dispatch({
        type: FECTH_FOLDER_ACTE_SUCCESS,
        payload:  response.data,
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
        type: FECTH_FOLDER_ACTE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const createActe = (data) => (dispatch) => {
  return ActeService.createActe(data).then(
    (response) => {
      dispatch({
        type: CREATE_ACTE_SUCCESS,
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
        type: CREATE_ACTE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateActe = (id, data) => (dispatch) => {
  return ActeService.updateActe(id, data).then(
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
        type: UPDATE_ACTE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteActe = (id) => (dispatch) => {
  return ActeService.deleteActe(id).then(
    (response) => {
      dispatch({
        type: DELETE_ACTE_SUCCESS,
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
        type: DELETE_ACTE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


