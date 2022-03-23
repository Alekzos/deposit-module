import axios from "axios";
import { IUser, IProduct, IApplication } from "../data/types";
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

export const getApplications = () => {
  return axios
    .get<IApplication[]>(jsonDataURLs.applications)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addApplication = async (
  selectedProduct: IProduct | null,
  selectedDepositSum: number | null,
  selectedDepositTerm: number,
  name: string | null,
  surname: string | null,
  patronymic: string | null,
  inn: string | null,
  account: string | null,
  applicationStatus: boolean
) => {
  let applicationDate = new Date().toLocaleDateString();
  let date = new Date();
  let expirationDate = new Date(
    date.setDate(date.getDate() + selectedDepositTerm)
  ).toLocaleDateString();

  return await axios.post(jsonDataURLs.applications, {
    product: { ...selectedProduct },
    selectedDepositSum,
    selectedDepositTerm,
    name,
    surname,
    patronymic,
    inn,
    account,
    applicationStatus,
    applicationDate,
    expirationDate,
  });
};
