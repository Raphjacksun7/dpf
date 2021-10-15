import { ACCOUNT_ACCESS_SUCCESS, ACCOUNT_ACCESS_FAIL } from "../actions/types";

const initialState = {};

const mailerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNT_ACCESS_SUCCESS:
      return { ...state };

    case ACCOUNT_ACCESS_FAIL:
      return { ...state };

    default:
      return state;
  }
};
export default mailerReducer;
