import {
  FECTH_DMODELS_SUCCESS,
  CREATE_DMODEL_SUCCESS,
  UPDATE_DMODEL_SUCCESS,
  UPDATE_DMODEL_FAIL,
  DELETE_DMODEL_SUCCESS,
  DELETE_DMODEL_FAIL,
  CREATE_DMODEL_FAIL,
  FECTH_DMODEL_SUCCESS,
  FECTH_FOLDER_DMODELS_SUCCESS,
} from "../actions/types";

const initialState = {
  dModels: [],
  dModel: {},
  folderDModels: [],
};

const dModelReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FECTH_DMODELS_SUCCESS:
      return {
        ...state,
        dModels: payload.data,
      };

    case FECTH_DMODEL_SUCCESS:
      return {
        ...state,
        dModel: payload,
      };

    case FECTH_FOLDER_DMODELS_SUCCESS:
      return {
        ...state,
        folderDModels: payload,
      };

    case CREATE_DMODEL_SUCCESS:
      return { ...state, dModels: [payload, ...state.dModels] };

    case CREATE_DMODEL_FAIL:
      return {
        ...state,
      };

    case UPDATE_DMODEL_SUCCESS:
      return {
        ...state,
        dModel: payload,
        dModels: state.dModels.map((dModel) =>
          dModel._id === payload._id ? (dModel = payload) : dModel
        ),
      };

    case UPDATE_DMODEL_FAIL:
      return {
        ...state,
      };

    case DELETE_DMODEL_SUCCESS:
      return {
        ...state,
        dModels: state.dModels.filter((dModel) => dModel._id !== payload),
      };

    case DELETE_DMODEL_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default dModelReducer;
