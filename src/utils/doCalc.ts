//рассчет процентов по депозиту
export const doCalc = (
  earlyTermination: Number,
  withdrawals: number,
  paymentPeriods: String,
  currency: String,
  value: Number,
  depositTerm: Number
) => {
  //ключевые ставки ЦБ / ФРС
  const KeyRateRub = 9.5;
  const KeyRateUsd = 0.5;

  //штраф за активацию опций досрочного вывода / частичного снятия
  const depositEarlyTerminationRatio = 0.9;
  const withdrawalsRatio = 100000;

  //console.log(paymentPeriods);
  console.log(earlyTermination);
  //   paymentPeriods.startOfTerm
  //   paymentPeriods.monthly
  //   paymentPeriods.endOfTerm

  switch (currency) {
    case "rub":
      if (withdrawals) {
        if (earlyTermination != 1) {
          let interestRate = (
            KeyRateRub *
            withdrawalsRatio *
            depositEarlyTerminationRatio
          ).toFixed(2);
          return 1 + "  " + interestRate;
        } else {
          let interestRate = (KeyRateRub * withdrawalsRatio).toFixed(2);
          return 2 + "  " + interestRate;
        }
      } else if (earlyTermination) {
        let interestRate = (KeyRateRub * depositEarlyTerminationRatio).toFixed(
          2
        );
        return 3 + "  " + interestRate;
      } else {
        let interestRate = KeyRateRub.toFixed(2);
        return 4 + "  " + interestRate;
      }

    case "usd":
      return currency;
    default:
      return 0;
  }
};
