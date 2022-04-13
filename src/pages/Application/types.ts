import { DocStatus } from "./consts";
import { IProduct } from "../ProductSelection/types";

export interface IApplication {
  product: IProduct;
  selectedDepositSum: number;
  selectedDepositTerm: number;
  name: string;
  surname: string;
  patronymic: string;
  inn: string;
  account?: string;
  applicationStatus: DocStatus;
  id: number;
  applicationDate: string;
  expirationDate: string;
  depositSum: number;
  depositTerm: number;
}
