//добавление пробелов между числами для форматирования компонента ввода суммы депозита
export function numberWithSpaces(val: any) {
  val = Number(val.toString().replace(" ", ""));
  let formatedNumber = val.toLocaleString();
  return formatedNumber;
}

//преобразование отформатированного числа с пробелами в число без пробелов
export function numberWithoutSpaces(val: any, maxVal?: any) {
  val = Number(val.toLocaleString().replace(/\D/g, ""));
  if (val >= maxVal) {
    val = maxVal;
  } // пре превышении лимита установить макс значение
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

//функция для перевода имени поля в человеко-понятный текст
export const switchPaymentPeriods = (paymentPeriods: string) => {
  switch (paymentPeriods) {
    case "startOfTerm":
      return <strong>в начале срока</strong>;
    case "monthly":
      return <strong>ежемесячно</strong>;
    case "endOfTerm":
      return <strong>в конце срока</strong>;
    default:
      return <strong>paymentPeriods</strong>;
  }
};
