import axios from "axios";
import authHeader from "../utils/authHeader";

const login = async (user) => {
  try {
    const response = await axios.post("auth/login", user);
    if (response.data.token) {
      localStorage.setItem("jobSearchToken", response.data.token);
      return response;
    }
  } catch (error) {
    return error.response;
  }
};

const register = async (user) => {
  try {
    const response = await axios.post("auth/signup", user);
    if (response.data.token) {
      localStorage.setItem("jobSearchToken", response.data.token);
      return response;
    }
  } catch (error) {
    return error.response;
  }
};

const validate = async () => {
  try {
    const response = await axios.post(
      "auth/validate",
      {},
      { headers: authHeader() }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const logout = () => {
  localStorage.removeItem("jobSearchToken");
};

const auth = {
  login,
  register,
  logout,
  validate,
};

export default auth;
