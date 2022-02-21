//рассчет процентов по депозиту
import { calcWithInterestСapitalization } from "./utils";

export const doCalc = (
  earlyTermination: number,
  withdrawals: number,
  interestСapitalization: boolean,
  currency: string,
  value: number,
  depositTerm: number
) => {
  //ключевые ставки ЦБ / ФРС
  const KeyRateRub = 9.5;
  const KeyRateUsd = 0.5;

  //штраф за активацию опций досрочного вывода / частичного снятия
  const depositEarlyTerminationRatio = 0.9;
  const withdrawalsRatio = 0.8;

  //console.log(paymentPeriods);
  // console.log(interestСapitalization);

  interestСapitalization = true;

  switch (currency) {
    case "rub":
      if (withdrawals && earlyTermination) {
        let interestRate = (
          KeyRateRub *
          depositEarlyTerminationRatio *
          withdrawalsRatio
        ).toFixed(2);
        return calcWithInterestСapitalization(
          value,
          depositTerm,
          interestRate,
          interestСapitalization
        );
      } else if (withdrawals && !earlyTermination) {
        let interestRate = (KeyRateRub * withdrawalsRatio).toFixed(2);
        return calcWithInterestСapitalization(
          value,
          depositTerm,
          interestRate,
          interestСapitalization
        );
      } else if (!withdrawals && earlyTermination) {
        let interestRate = (KeyRateRub * depositEarlyTerminationRatio).toFixed(
          2
        );
        return calcWithInterestСapitalization(
          value,
          depositTerm,
          interestRate,
          interestСapitalization
        );
      } else if (!withdrawals && !earlyTermination) {
        let interestRate = KeyRateRub.toFixed(2);
        return calcWithInterestСapitalization(
          value,
          depositTerm,
          interestRate,
          interestСapitalization
        );
      } else return 0;

    case "usd":
      return currency;
    default:
      return 0;
  }
};
