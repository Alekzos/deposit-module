import axios from "axios";
import { IUser } from "../../src/data/types";
import { userDataURL } from "../../src/data/consts";

//получение пользователей и фильтрация по выбранному
export const getUsers = async (userDataURL: string) => {
  let users = await axios
    .get<IUser[]>(userDataURL)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
