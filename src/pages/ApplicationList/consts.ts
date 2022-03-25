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
