import { IUser, IUserLogin } from "./types";
import { loginErrMessages } from "./consts";

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

//проверка логина
export const checkUserLogin = (user: Array<IUser>, values: IUserLogin) => {
  //если логин не введен
  if (!values.login) {
    return loginErrMessages.loginEmpty;
  } else {
    //если введен, но не найден
    if (!user[0]) {
      return loginErrMessages.LoginNotFound;
    } else {
      //введен и найден
      return "";
    }
  }
};

//проверка пароля
export const checkUserPassword = (user: Array<IUser>, values: IUserLogin) => {
  //если пароль не введен
  if (!values.password) {
    return loginErrMessages.PasswordEmpty;
  } else {
    if (user.length > 0) {
      //если введен, но не совпадает
      if (values.password !== user[0].password) {
        return loginErrMessages.PasswordNotFound;
      } else {
        return "ok";
      }
    } else {
      return "";
    }
  }
};
