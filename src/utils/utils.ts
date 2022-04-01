//добавление пробелов между числами для форматирования компонента ввода суммы депозита
export function numberWithSpaces(val: number | undefined) {
  if (val) {
    val = Number(val.toString().replace(" ", ""));
    let formatedNumber = val.toLocaleString();
    return formatedNumber;
  }
}

//преобразование отформатированного числа с пробелами в число без пробелов
// при превышении лимита установить макс значение
export function numberWithoutSpaces(val: any, maxVal?: any) {
  val = Number(val.toLocaleString().replace(/\D/g, ""));
  if (val >= maxVal) {
    val = maxVal;
  }
  return val;
}

//форматирование склонения времени
export function declOfNum(number: number, words: string[]) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}

//рассчет эффективной процентной ставки, а так же суммы депозита на конец периода с и без капитализации
export const calcWithinterestCapitalization = (
  value: number,
  depositTerm: number,
  interestRate: string,
  interestCapitalization: number
): any => {
  if (interestCapitalization) {
    let futureValue = (
      Number(
        value * (1 + Number(interestRate) / 100 / 12) ** (depositTerm / 30)
      ) - value
    ).toFixed(2);

    let effectiveInterestRate = (
      ((((1 + Number(interestRate) / 100 / 12) ** (depositTerm / 30) - 1) *
        12) /
        (depositTerm / 30)) *
      100
    ).toFixed(2);
    return [interestRate, futureValue, effectiveInterestRate];
  } else {
    let futureValue = Number(
      (value * Number(interestRate) * depositTerm) / 365 / 100
    ).toFixed(2);

    let effectiveInterestRate = 0;
    return [interestRate, futureValue, effectiveInterestRate];
  }
};

export const inRange = (val: number, min: number, max: number) => {
  return val >= min && val <= max;
};

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
