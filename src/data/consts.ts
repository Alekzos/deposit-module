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

export const declensionsDays = ["день", "дня", "дней"];

export enum Currencies {
  rub = "rub",
  usd = "usd",
}
