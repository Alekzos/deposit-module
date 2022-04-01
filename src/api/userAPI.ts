import axios from "axios";
import { IUser } from "../data/types";
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

// export const getUser = async () => {
//   let response = await getUsers();

//   const user = (response || []).filter(
//     (user) => user.login === sessionStorage.getItem("login")
//   );
//   return user;
// };
