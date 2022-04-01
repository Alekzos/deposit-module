export const loginErrMessages = {
  loginEmpty: "введите логин",
  PasswordEmpty: "введите пароль",
  PasswordNotFound: "пароль не подходит",
  LoginNotFound: "пользователь не найден",
};

export enum userRoles {
  user = "user",
  admin = "admin",
}

export const userInitialValue = {
  id: 0,
  login: "",
  password: "",
  accounts: [],
  account: "",
  usd: [],
  rub: [],
  name: "",
  surname: "",
  patronymic: "",
  inn: "",
  role: "",
};

// export const userInitialValue = {
//   id: 0,
//   login: "",
//   password: "",
//   usd: [],
//   rub: [],
//   name: "",
//   surname: "",
//   patronymic: "",
//   inn: "",
//   role: "",
//   accounts: [
//     {
//       account: "",
//       balance: 0,
//       currency: "",
//     },
//   ],
// };
