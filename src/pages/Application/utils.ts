//вставка строки в строку
let insert = (str: string, substr: string, pos: number = 0) =>
  substr === undefined ? str : str.slice(0, pos) + substr + str.slice(pos);

//форматирование номера счета по банковской логике
export const formatAccount = (account: string) => {
  let formatedAccount = insert(account, " ", 3);
  formatedAccount = insert(formatedAccount, " ", 6);
  formatedAccount = insert(formatedAccount, " ", 10);
  formatedAccount = insert(formatedAccount, " ", 13);
  formatedAccount = insert(formatedAccount, " ", 18);
  return formatedAccount;
};
