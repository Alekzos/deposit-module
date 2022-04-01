import { userRoles } from "./consts";
import { useNavigate } from "react-router-dom";

export const getUserLogin = () => {
  return sessionStorage.getItem("login");
};

export const isAdmin = () => {
  return sessionStorage.getItem("role") === userRoles.admin;
};

export const logout = () => {
  sessionStorage.removeItem("login");
  sessionStorage.removeItem("role");
};

export const setUsertoSessionStorage = (login: string, role: string) => {
  sessionStorage.setItem("login", login);
  sessionStorage.setItem("role", role);
};
