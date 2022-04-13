import { IApplication } from "../../pages/Application/types";
import { IUser } from "../../pages/Login/types";

import { DocStatus, applicationStatusText } from "../Application/consts";
export const filterApplications = (
  applications: void | IApplication[],
  fioSearch: string,
  accountSearch: string,
  currencySearch: string,
  innSearch: string,
  user: IUser
) => {
  // фильтрация по имени
  let filteredApplications = (applications || []).filter((application) =>
    (application.surname + application.name + application.patronymic)
      .toLowerCase()
      .includes(fioSearch.toLowerCase())
  );

  //фильтрация по номеру счета
  //столько ифов, чтобы убрать ошибку undefined и белый экран
  if (accountSearch) {
    filteredApplications = (filteredApplications || []).filter(
      (application) => {
        if (application.account) {
          application.account
            .toLowerCase()
            .includes(accountSearch.toLowerCase());
        }
      }
    );
  }

  // фильтрация по ИНН
  filteredApplications = (filteredApplications || []).filter((application) =>
    application.inn.includes(innSearch)
  );

  // фильтрация по валюте
  filteredApplications = (filteredApplications || []).filter((application) =>
    application.product.currency.includes(currencySearch)
  );

  return filteredApplications;
};

export const getApplicationStatusText = (applicationStatus: DocStatus) => {
  return applicationStatusText[applicationStatus];
};
