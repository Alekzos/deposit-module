import { IUser } from "../data/types";
import { loginErrMessages } from "../pages//Login/consts";

//проверка логина
export const checkUserLogin = (user: Array<IUser>, values: any) => {
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
export const checkUserPassword = (user: Array<IUser>, values: any) => {
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
