import {
  FECTH_ACTES_SUCCESS,
  CREATE_ACTE_SUCCESS,
  UPDATE_ACTE_SUCCESS,
  UPDATE_ACTE_FAIL,
  DELETE_ACTE_SUCCESS,
  DELETE_ACTE_FAIL,
  CREATE_ACTE_FAIL,
  FECTH_ACTE_SUCCESS,
  FECTH_FOLDER_ACTE_SUCCESS,
} from "../actions/types";

const initialState = {
  actes: [],
  acte: {},
  folderActes:[],
};

const acteReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FECTH_ACTES_SUCCESS:
      return {
        ...state,
        actes: payload.data,
      };

    case FECTH_ACTE_SUCCESS:
      return {
        ...state,
        acte: payload,
      };

      case FECTH_FOLDER_ACTE_SUCCESS:
        return {
          ...state,
          folderActes: payload,
        };

    case CREATE_ACTE_SUCCESS:
      return { ...state, actes: [payload, ...state.actes] };

    case CREATE_ACTE_FAIL:
      return {
        ...state,
      };

    case UPDATE_ACTE_SUCCESS:
      return {
        ...state,
        actes: state.actes.map((acte) =>
          acte.id === payload.id ? (acte = payload) : acte
        ),
      };

    case UPDATE_ACTE_FAIL:
      return {
        ...state,
      };

    case DELETE_ACTE_SUCCESS:
      return {
        ...state,
        actes: state.actes.filter((acte) => acte.id !== payload),
      };

    case DELETE_ACTE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default acteReducer;
