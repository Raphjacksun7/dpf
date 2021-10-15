import {
  FECTH_CLIENTS_SUCCESS,
  FECTH_CLIENTS_FAIL,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  FECTH_CLIENT_SUCCESS,
  REMOVE_CLIENT_FOLDER_SUCCESS,
  REMOVE_CLIENT_FOLDER_FAIL,
  ADD_CLIENT_FOLDER_SUCCESS,
  ADD_CLIENT_FOLDER_FAIL,
  UPDATE_CLIENT_RESSOURCES_SUCCESS,
  UPDATE_CLIENT_RESSOURCES_FAIL,
} from "../actions/types";

const initialState = {
  clients: [],
  client: {},
};

const clientReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FECTH_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: payload.data,
      };

    case FECTH_CLIENT_SUCCESS:
      return {
        ...state,
        client: payload,
      };

    case CREATE_CLIENT_SUCCESS:
      return { ...state, clients: [payload, ...state.clients] };

    case CREATE_CLIENT_FAIL:
      return {
        ...state,
      };

    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        client: payload,
        clients: state.clients.map((client) =>
          client._id === payload._id ? (client = payload) : client
        ),
      };

    case UPDATE_CLIENT_FAIL:
      return {
        ...state,
      };

    case UPDATE_CLIENT_RESSOURCES_SUCCESS:
      return {
        ...state,
        client: payload,
        clients: state.clients.map((client) =>
          client._id === payload._id ? (client = payload) : client
        ),
      };

    case UPDATE_CLIENT_RESSOURCES_FAIL:
      return {
        ...state,
      };

    case ADD_CLIENT_FOLDER_SUCCESS:
      return {
        ...state,
        client: payload,
        clients: state.clients.map((client) =>
          client._id === payload._id ? (client = payload) : client
        ),
      };

    case ADD_CLIENT_FOLDER_FAIL:
      return {
        ...state,
      };

    case REMOVE_CLIENT_FOLDER_SUCCESS:
      return {
        ...state,
        client: payload,
        clients: state.clients.map((client) =>
          client._id === payload._id ? (client = payload) : client
        ),
      };

    case REMOVE_CLIENT_FOLDER_FAIL:
      return {
        ...state,
      };

    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter((client) => client._id !== payload),
      };

    case DELETE_CLIENT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default clientReducer;
