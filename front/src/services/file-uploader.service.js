import axios from "axios";
import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../constants";

export const get = (data) => {
  const formData = new FormData();
  formData.append("file", data.file.originFileObj);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUDINARY_NAME);
  try {
    return axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
      formData
    );
  } catch (error) {
    return error;
  }
};

export const send = async (data) => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUDINARY_NAME);
  try {
    return axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
      formData
    );
  } catch (error) {
    return error;
  }
};

export const replace = async (id, data) => {
  const formData = new FormData();
  formData.append("file", data.file.originFileObj);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUDINARY_NAME);
  try {
    return axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
      formData
    );
  } catch (error) {
    return error;
  }
};

export const remove = async (id, data) => {
  const formData = new FormData();
  formData.append("file", data.file.originFileObj);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUDINARY_NAME);
  try {
    return axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/delete_by_token `,
      formData
    );
  } catch (error) {
    return error;
  }
};
