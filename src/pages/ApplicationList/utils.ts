import { IApplication } from "../../data/types";

export const filterApplications = (
  applications: void | IApplication[],
  fioSearch: string,
  accountSearch: string,
  currencySearch: string,
  innSearch: string
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

  return filteredApplications;
};
