//добавление пробелов между числами для форматирования компонента ввода суммы депозита
export function numberWithSpaces(val: any) {
  val = Number(val.toString().replace(" ", ""));
  let formatedNumber = val.toLocaleString();
  return formatedNumber;
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

export const calcWithInterestСapitalization = (
  value: number,
  depositTerm: number,
  interestRate: string,
  interestСapitalization: boolean
) => {
  if (interestСapitalization) {
    console.log("Депозит");
    console.log("До " + String(value));
    let futureValue =
      value * (1 + Number(interestRate) / 100 / 12) ** (depositTerm / 30);
    console.log("После " + futureValue);
    //
    console.log("Ставка");
    console.log("До " + String(interestRate));
    let effective =
      value * (1 + Number(interestRate) / 100 / 12) ** (depositTerm / 30);
    console.log("После " + effective);
  } else {
    console.log("Не капитализируем " + interestRate);
  }

  return interestRate;
};

//вероятно уже не надо и надо удалить будет
// //функция для перевода имени поля в человеко-понятный текст
// export const switchPaymentPeriods = (paymentPeriods: string) => {
//   switch (paymentPeriods) {
//     case "startOfTerm":
//       return <strong>в начале срока</strong>;
//     case "monthly":
//       return <strong>ежемесячно</strong>;
//     case "endOfTerm":
//       return <strong>в конце срока</strong>;
//     default:
//       return <strong>paymentPeriods</strong>;
//   }
// };
