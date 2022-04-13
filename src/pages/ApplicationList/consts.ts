export interface IHeadCell {
  name: string;
  label: string;
}

export const headCells: readonly IHeadCell[] = [
  {
    name: "id",
    label: "№",
  },
  {
    name: "applicationDate",
    label: "Дата создания",
  },
  {
    name: "expirationDate",
    label: "Срок действия",
  },

  {
    name: "title",
    label: "Наименование вклада",
  },
  {
    name: "selectedDepositSum",
    label: "Сумма",
  },
  {
    name: "interestRate",
    label: "Ставка (%)",
  },
  {
    name: "applicationStatus",
    label: "Статус",
  },
];

export const productFields = ["title", "selectedDepositSum", "interestRate"];

export enum searchFields {
  fioSearch = "fioSearch",
  accountSearch = "accountSearch",
  currencySearch = "currencySearch",
  innSearch = "innSearch",
}

export const searchFieldsLabel = {
  [searchFields.fioSearch]: "поиск по ФИО",
  [searchFields.accountSearch]: "поиск по № счета",
  [searchFields.currencySearch]: "фильтр валюты",
  [searchFields.innSearch]: "поиск по ИНН",
};
