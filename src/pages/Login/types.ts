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
  account?: string;
}

export interface IUserLogin {
  login: string;
  password: string;
  showPassword: boolean;
}
