import axios from "axios";
import { IDeposit } from "../data/types";

export const getDataWithAxios = async (api: string) => {
  let apiReturn = await axios
    .get<IDeposit[]>(api)
    .then(async function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return apiReturn;
};
