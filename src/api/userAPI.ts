import axios from "axios";
import { IUser } from "../pages/Login/types";
import { getUserLogin } from "../pages/Login/utils";
import { jsonDataURLs } from "../data/consts";

export const getUsers = () => {
  return axios
    .get<IUser[]>(jsonDataURLs.users)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getUser = async () => {
  const response = await getUsers();
  const user = (response || []).filter((user) => user.login === getUserLogin());
  return user;
};

export const getUserByInn = async (appinn: string) => {
  const response = await getUsers();
  const user = (response || []).filter((user) => user.inn === appinn);
  return user;
};
