import {
  FECTH_FOLDERS_SUCCESS,
  CREATE_FOLDER_SUCCESS,
  UPDATE_FOLDER_SUCCESS,
  UPDATE_FOLDER_FAIL,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAIL,
  CREATE_FOLDER_FAIL,
  FECTH_FOLDER_SUCCESS,
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
        folders: state.folders.map((folder) =>
          folder.id === payload.id ? (folder = payload) : folder
        ),
      };

    case UPDATE_FOLDER_FAIL:
      return {
        ...state,
      };

    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        folders: state.folders.filter((folder) => folder.id !== payload),
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
