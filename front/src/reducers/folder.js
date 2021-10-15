import {
  FECTH_FOLDERS_SUCCESS,
  CREATE_FOLDER_SUCCESS,
  UPDATE_FOLDER_SUCCESS,
  UPDATE_FOLDER_FAIL,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAIL,
  CREATE_FOLDER_FAIL,
  FECTH_FOLDER_SUCCESS,
  REMOVE_FOLDER_USER_FAIL,
  REMOVE_FOLDER_USER_SUCCESS,
  ADD_FOLDER_USER_FAIL,
  ADD_FOLDER_USER_SUCCESS,
  ADD_FOLDER_CLIENT_SUCCESS,
  ADD_FOLDER_CLIENT_FAIL,
  REMOVE_FOLDER_CLIENT_SUCCESS,
  REMOVE_FOLDER_CLIENT_FAIL,
} from "../actions/types";

const initialState = {
  folders: [],
  folder: {},
};

const folderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FECTH_FOLDERS_SUCCESS:
      return {
        ...state,
        folders: payload.data,
      };

    case FECTH_FOLDER_SUCCESS:
      return {
        ...state,
        folder: payload,
      };

    case CREATE_FOLDER_SUCCESS:
      return { ...state, folders: [payload, ...state.folders] };

    case CREATE_FOLDER_FAIL:
      return {
        ...state,
      };

    case UPDATE_FOLDER_SUCCESS:
      return {
        ...state,
        folder: payload,
        folders: state.folders.map((folder) =>
          folder._id === payload._id ? (folder = payload) : folder
        ),
      };

    case UPDATE_FOLDER_FAIL:
      return {
        ...state,
      };

    case ADD_FOLDER_USER_SUCCESS:
      return {
        ...state,
        folder: payload,
        folders: state.folders.map((folder) =>
          folder._id === payload._id ? (folder = payload) : folder
        ),
      };

    case ADD_FOLDER_USER_FAIL:
      return {
        ...state,
      };

    case REMOVE_FOLDER_USER_SUCCESS:
      return {
        ...state,
        folder: payload,
        folders: state.folders.map((folder) =>
          folder._id === payload._id ? (folder = payload) : folder
        ),
      };

    case REMOVE_FOLDER_USER_FAIL:
      return {
        ...state,
      };

    case ADD_FOLDER_CLIENT_SUCCESS:
      return {
        ...state,
        folder: payload,
        folders: state.folders.map((folder) =>
          folder._id === payload._id ? (folder = payload) : folder
        ),
      };

    case ADD_FOLDER_CLIENT_FAIL:
      return {
        ...state,
      };

    case REMOVE_FOLDER_CLIENT_SUCCESS:
      return {
        ...state,
        folder: payload,
        folders: state.folders.map((folder) =>
          folder._id === payload._id ? (folder = payload) : folder
        ),
      };

    case REMOVE_FOLDER_CLIENT_FAIL:
      return {
        ...state,
      };

    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        folders: state.folders.filter((folder) => folder._id !== payload),
      };

    case DELETE_FOLDER_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default folderReducer;
