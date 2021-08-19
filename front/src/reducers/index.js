import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import userReducer from "./user";
import clientReducer from "./client";
import folderReducer from "./folder";
import messageReducer from "./message";
import acteReducer from "./acte";
import dModelReducer from "./d-model";
import taskReducer from "./task";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  client: clientReducer,
  folder: folderReducer,
  acte: acteReducer,
  dModel: dModelReducer,
  task: taskReducer,
  message: messageReducer,
  form: formReducer,
});
