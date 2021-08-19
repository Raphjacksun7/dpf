import {
  FECTH_TASKS_SUCCESS,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  CREATE_TASK_FAIL,
  FECTH_TASK_SUCCESS,
  FECTH_SENDER_TASK_SUCCESS,
  FECTH_RECIEVER_TASK_SUCCESS,
} from "../actions/types";

const initialState = {
  tasks: [],
  task: {},
  sender: [],
  reciever: [],
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FECTH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload.data,
      };

    case FECTH_TASK_SUCCESS:
      return {
        ...state,
        task: payload,
      };

    case FECTH_SENDER_TASK_SUCCESS:
      return {
        ...state,
        sender: payload,
      };

    case FECTH_RECIEVER_TASK_SUCCESS:
      return {
        ...state,
        reciever: payload,
      };

    case CREATE_TASK_SUCCESS:
      return { ...state, tasks: [payload, ...state.tasks] };

    case CREATE_TASK_FAIL:
      return {
        ...state,
      };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? (task = payload) : task
        ),
      };

    case UPDATE_TASK_FAIL:
      return {
        ...state,
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
      };

    case DELETE_TASK_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default taskReducer;
