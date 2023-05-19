import axios from "axios";
import { baseURL } from "./baseURL";

const login = async (email, password) => {
  try {
    const formData = { email, password };
    const response = await axios.post(`${baseURL}/user/signin`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.data;
    return { status: "success", payload: user };
  } catch (error) {
    return { status: "error", payload: error.response.data };
  }
};

const signup = async (username, email, password, dob) => {
  try {
    const date = new Date(dob);
    const newDob = date.toISOString();
    const formData = { username, email, password, dob: newDob };
    const response = await axios.post(`${baseURL}/user/signup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.data;
    return { status: "success", payload: user };
  } catch (error) {
    return { status: "error", payload: error.response.data };
  }
};

export { login, signup };
