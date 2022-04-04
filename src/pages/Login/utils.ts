import { userRoles } from "./consts";
export const getUserLogin = () => {
  return sessionStorage.getItem("login");
};

export const isAdmin = () => {
  return sessionStorage.getItem("role") === userRoles.admin;
};

export const onLogout = () => {
  sessionStorage.removeItem("login");
  sessionStorage.removeItem("role");
};

export const setUsertoSessionStorage = (login: string, role: string) => {
  sessionStorage.setItem("login", login);
  sessionStorage.setItem("role", role);
};
