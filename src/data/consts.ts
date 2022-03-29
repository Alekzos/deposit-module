export enum Currencies {
  rub = "rub",
  usd = "usd",
}
//json data
const baseBackendUrl = "http://localhost:8000";
export const jsonDataURLs = {
  products: `${baseBackendUrl}/products`,
  users: `${baseBackendUrl}/users`,
  applications: `${baseBackendUrl}/applications`,
};

export const pageURLs = {
  homePage: "/",
  productSelectionPage: "/calc",
  applicationPage: "/application",
  applicationList: "/applicationlist",
};

export const maxInputSum = 1000000000;
export const stepInputSum = maxInputSum / 200;
export const maxInputTerm = 1095;

export const declensionsDays = ["день", "дня", "дней"];

//ключевые ставки ЦБ / ФРС
export const KeyRateRub = 9.5;
export const KeyRateUsd = 0.5;

//штраф за активацию опций досрочного вывода / частичного снятия
export const depositEarlyTerminationRatio = 0.9;
export const withdrawalsRatio = 0.8;

export const userInitialValue = {
  id: 0,
  login: "",
  password: "",
  usd: [],
  rub: [],
  name: "",
  surname: "",
  patronymic: "",
  inn: "",
  role: "",
  accounts: [
    {
      account: "",
      balance: 0,
      currency: "",
    },
  ],
};
