import API from "./api";
import { setToken, removeToken } from "../utils/token";

export const loginAdmin = async (data) => {
  const res = await API.post("/api/auth/login", data); // ✅ FIXED
  setToken(res.data);
  return res.data;
};

export const logoutAdmin = () => {
  removeToken();
};