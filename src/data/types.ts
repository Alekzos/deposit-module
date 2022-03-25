export interface IProduct {
  id: number;
  title: string;
  description: string;
  interest: string;
  minSum: number;
  maxSum: number;
  minTerm: number;
  maxTerm: number;
  sumDescription: string;
  termDescription: string;
  currency: string;
  paymentPeriods: string;
  withdrawals: number;
  earlyTermination: number;
  depositRate: any;
  interestCapitalization: number;
  futureValue?: any;
  effectiveInterestRate?: any;
  interestRate?: any;
  selectedDepositSum?: number;
  selectedDepositTerm?: number;
}

export interface ISliderWithTextFieldProps {
  Currencies?: any;
  currency?: string;
  days?: boolean;
  step: number;
  min: number;
  max: number;
  value: number;
  caption: string;
  handleInputChange?: any;
  handleSliderChange?: any;
}

export interface IApplication {
  product: IProduct;
  selectedDepositSum: number;
  selectedDepositTerm: number;
  name: string;
  surname: string;
  patronymic: string;
  inn: string;
  account: string;
  applicationStatus: boolean;
  id: number;
  applicationDate: string;
  expirationDate: string;
  depositSum: number;
  depositTerm: number;
}
export interface IUser {
  id: number;
  login: string;
  password: string;
  accounts: any;
  usd: Array<number>;
  rub: Array<number>;
  name: string;
  surname: string;
  patronymic: string;
  inn: string;
  role: string;
}

export interface IUserLogin {
  login: string;
  password: string;
  showPassword: boolean;
}

//типы для redux
export interface userState {
  user: any[];
  loading: boolean;
  isUserLogged: boolean;
  error: null | string;
}

export enum userActionTypes {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
}
interface userAction {
  type: userActionTypes.LOGIN;
}
interface userSuccessAction {
  type: userActionTypes.LOGIN_SUCCESS;
  payload: any[];
}
interface userErrorAction {
  type: userActionTypes.LOGIN_ERROR;
  payload: string;
}

export type UserAction = userAction | userSuccessAction | userErrorAction;
