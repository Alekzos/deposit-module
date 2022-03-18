import axios from "axios";
import { IUser } from "../data/types";
import { userDataURL } from "../data/consts";

//получение пользователей и фильтрация по выбранному
export const getUsers = (userDataURL: string) => {
  return axios
    .get<IUser[]>(userDataURL)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
