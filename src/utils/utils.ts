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

//тайпскрипт выдает ошибку, что там Null или String, для ее обхода такой вариант работает:

export const getsessionStorageData = (itemName: string) => {
  let item = sessionStorage.getItem(itemName);
  if (item) {
    return JSON.parse(item);
  }
};

//выводит сообщение, что данные могут стерется (на случай если нажмет обновить страницу)
export const onLeavePage = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };
};
