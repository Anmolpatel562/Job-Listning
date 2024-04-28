import axios from "axios";
import { toast } from "react-toastify";

const backendURL = "https://job-listing-backend-1.onrender.com/";

export const registerUser = async ({ name, email, password, phone }) => {
  try {
    console.log(backendURL)
    const response = await axios.post(`${backendURL}register`, {
      name,
      email,
      password,
      phone,
    });
    return response;
  } catch (error) {
    console.log(error.response.data.message);
    toast(error.response.data.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${backendURL}login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    toast(error.response.data.message);
  }
};
