import {
  FECTH_CLIENTS_SUCCESS,
  FECTH_CLIENTS_FAIL,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAIL,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
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

    case CREATE_CLIENT_SUCCESS:
      return { ...state, clients: [payload, ...state.clients] };

    case CREATE_CLIENT_FAIL:
      return {
        ...state,
      };

    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id === payload.id ? (client = payload) : client
        ),
      };

    case UPDATE_CLIENT_FAIL:
      return {
        ...state,
      };

    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== payload),
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
