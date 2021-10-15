import {
  CREATE_DMODEL_FAIL,
  CREATE_DMODEL_SUCCESS,
  DELETE_DMODEL_FAIL,
  DELETE_DMODEL_SUCCESS,
  FECTH_DMODELS_FAIL,
  FECTH_DMODELS_SUCCESS,
  FECTH_DMODEL_FAIL,
  FECTH_DMODEL_SUCCESS,
  FECTH_FOLDER_DMODELS_SUCCESS,
  FECTH_FOLDER_DMODELS_FAIL,
  SET_MESSAGE,
  UPDATE_DMODEL_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_DMODEL_SUCCESS,
} from "./types";

import * as DModelService from "../services/d-model.service";

export const getDModels = () => (dispatch) => {
  return DModelService.getDModels().then(
    (response) => {
      dispatch({
        type: FECTH_DMODELS_SUCCESS,
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
        type: FECTH_DMODELS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getDModel = (id) => (dispatch) => {
  return DModelService.getDModel(id).then(
    (response) => {
      dispatch({
        type: FECTH_DMODEL_SUCCESS,
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
        type: FECTH_DMODEL_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getDModelsByFolder = (id) => (dispatch) => {
  return DModelService.getDModelsByFolder(id).then(
    (response) => {
      dispatch({
        type: FECTH_FOLDER_DMODELS_SUCCESS,
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
        type: FECTH_FOLDER_DMODELS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const createDModel = (data) => (dispatch) => {
  return DModelService.createDModel(data).then(
    (response) => {
      dispatch({
        type: CREATE_DMODEL_SUCCESS,
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
        type: CREATE_DMODEL_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateDModel = (id, data) => (dispatch) => {
  return DModelService.updateDModel(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_DMODEL_SUCCESS,
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
        type: UPDATE_DMODEL_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteDModel = (id) => (dispatch) => {
  return DModelService.deleteDModel(id).then(
    (response) => {
      dispatch({
        type: DELETE_DMODEL_SUCCESS,
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
        type: DELETE_DMODEL_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
