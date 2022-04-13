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
export function numberWithoutSpaces(val: string, maxVal: number) {
  let NumVal = Number(val.toLocaleString().replace(/\D/g, ""));
  if (Number(val) >= maxVal) {
    NumVal = Number(maxVal);
  }
  return NumVal;
}

//форматирование склонения времени
export function declOfNum(number: number, words: string[]) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}

export const inRange = (val: number, min: number, max: number) => {
  return val >= min && val <= max;
};
