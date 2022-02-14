export enum Currencies {
  rub = "rub",
  usd = "usd",
}

export enum paymentPeriods {
  startOfTerm = "startOfTerm",
  monthly = "monthly",
  endOfTerm = "endOfTerm",
}

//json
export const depositsDataURL = "http://localhost:8000/deposits";

//метки для бегунка с датами
export const marksSliderDepositTerm = [
  {
    value: 1,
    label: "1 д.",
  },
  {
    value: 180,
    label: "6 м.",
  },
  {
    value: 365,
    label: "1 г.",
  },
  {
    value: 548,
    label: "1.5 г.",
  },
  {
    value: 730,
    label: "2 г.",
  },
  {
    value: 913,
    label: "2.5 г.",
  },
  {
    value: 1095,
    label: "3 г.",
  },
];

export const declensionsDays = ["день", "дня", "дней"];
