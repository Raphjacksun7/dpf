import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import * as AuthService from "../services/auth.service";

export const register =
  (...createUserdata) =>
  (dispatch) => {
    return AuthService.signup(...createUserdata).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
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
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const login =
  (...loginCredential) =>
  (dispatch) => {
    console.log(loginCredential);
    return AuthService.signin(...loginCredential).then(
      (response) => {
        dispatch({
          type: LOGIN_SUCCESS,
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
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch) => {
  AuthService.signout();
  dispatch({
    type: LOGOUT,
  });
};

