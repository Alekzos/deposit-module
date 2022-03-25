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
  selectedProduct: IProduct,
  selectedUser: IUser,
  account: string,
  applicationStatus: boolean
) => {
  const { name, surname, patronymic, inn } = selectedUser;

  let applicationDate = new Date().toLocaleDateString();
  let date = new Date();
  let expirationDate = new Date(
    date.setDate(date.getDate() + (selectedProduct.selectedDepositTerm || 0))
  ).toLocaleDateString();

  return await axios.post(jsonDataURLs.applications, {
    product: { ...selectedProduct },
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
