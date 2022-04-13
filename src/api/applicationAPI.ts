import axios from "axios";
import { IApplication } from "../pages/Application/types";
import { IProduct } from "../pages/ProductSelection/types";
import { IUser } from "../pages/Login/types";

import { jsonDataURLs } from "../data/consts";

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
  account: string | undefined,
  applicationStatus: string
) => {
  const { name, surname, patronymic, inn } = selectedUser;

  const applicationDate = new Date();
  const date = new Date();
  const expirationDate = new Date(
    date.setDate(date.getDate() + (selectedProduct.selectedDepositTerm || 0))
  );

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

export const getApplication = (id: number) => {
  const response = getApplications();
  return response;
};

//обновить статус заявки
export const patchApplication = async (
  id: number,
  applicationStatus: string,
  account?: string
) => {
  return await axios.patch(`${jsonDataURLs.applications}/${id}`, {
    applicationStatus: applicationStatus,
    account: account,
  });
};
