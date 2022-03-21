import { inRange } from "../utils/utils";

export enum Currencies {
  rub = "rub",
  usd = "usd",
}

export enum paymentPeriods {
  startOfTerm = "startOfTerm",
  monthly = "monthly",
  endOfTerm = "endOfTerm",
}

//json data
export const jsonDataURLs = {
  products: "http://localhost:8000/products",
  users: "http://localhost:8000/users",
  applications: "http://localhost:8000/applications",
};

export const pageURLs = {
  homePage: "/",
  productSelectionPage: "/calc",
  applicationPage: "/application",
  applicationList: "/applicationlist",
};

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

export const maxInputSum = 1000000000;
export const stepInputSum = maxInputSum / 200;
export const maxInputTerm = 1095;

export const declensionsDays = ["день", "дня", "дней"];

//рассчет бонуса за размер депозита

export const calcValueKf = (value: number, currency: string): any => {
  let valueKf = 1;

  switch (currency) {
    case "rub":
      if (inRange(value, 50000000, 100000000)) {
        valueKf = 1.01;
      } else if (inRange(value, 100000000, 300000000)) {
        valueKf = 1.02;
      } else if (inRange(value, 300000000, 500000000)) {
        valueKf = 1.03;
      } else if (inRange(value, 500000000, 700000000)) {
        valueKf = 1.04;
      } else if (inRange(value, 700000000, 1000000000000)) {
        valueKf = 1.05;
      } else {
        valueKf = 1;
      }
      return valueKf;
    case "usd":
      if (inRange(value, 5000000, 10000000)) {
        valueKf = 1.01;
      } else if (inRange(value, 10000000, 3000000)) {
        valueKf = 1.02;
      } else if (inRange(value, 30000000, 50000000)) {
        valueKf = 1.03;
      } else if (inRange(value, 50000000, 70000000)) {
        valueKf = 1.04;
      } else if (inRange(value, 70000000, 1000000000000)) {
        valueKf = 1.05;
      } else {
        valueKf = 1;
      }
      return valueKf;
  }
};

//ключевые ставки ЦБ / ФРС
export const KeyRateRub = 9.5;
export const KeyRateUsd = 0.5;

//штраф за активацию опций досрочного вывода / частичного снятия
export const depositEarlyTerminationRatio = 0.9;
export const withdrawalsRatio = 0.8;

export const loginErrMessages = {
  loginEmpty: "введите логин",
  PasswordEmpty: "введите пароль",
  PasswordNotFound: "пароль не подходит",
  LoginNotFound: "пользователь не найден",
};
