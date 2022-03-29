import { IApplication, IUser } from "../../data/types";
import { applicationStatuses } from "../Application/consts";
import { userRoles } from "../Login/consts";
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

  // фильтрация по номеру счета
  filteredApplications = (filteredApplications || []).filter((application) =>
    application.account.toLowerCase().includes(accountSearch.toLowerCase())
  );

  // фильтрация по ИНН
  filteredApplications = (filteredApplications || []).filter((application) =>
    application.inn.includes(innSearch)
  );

  // фильтрация по валюте
  filteredApplications = (filteredApplications || []).filter((application) =>
    application.product.currency.includes(currencySearch)
  );

  //ограничение видимости для разных пользователей
  if (user.role === userRoles.user) {
    filteredApplications = (filteredApplications || []).filter(
      (application) => application.inn === user.inn
    );
  }

  if (user.role === userRoles.admin) {
    filteredApplications = (filteredApplications || []).filter(
      (application) => application.applicationStatus !== 0
    );
  }

  return filteredApplications;
};

export const switchApplicationStatus = (applicationStatus: number) => {
  let status = "";
  switch (applicationStatus) {
    case 0:
      status = applicationStatuses[0];
      break;
    case 1:
      status = applicationStatuses[1];
      break;
    case 2:
      status = applicationStatuses[2];
      break;
    case 3:
      status = applicationStatuses[3];
      break;
  }
  return status;
};
