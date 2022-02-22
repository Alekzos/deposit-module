//рассчет процентов по депозиту
import { calcWithinterestCapitalization } from "./utils";

export const doCalc = (
  earlyTermination: number,
  withdrawals: number,
  interestCapitalization: number,
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

  // console.log("doCalc");
  // console.log(earlyTermination);
  // console.log(withdrawals);
  // console.log(interestCapitalization);

  switch (currency) {
    case "rub":
      if (withdrawals && earlyTermination) {
        let interestRate = (
          KeyRateRub *
          depositEarlyTerminationRatio *
          withdrawalsRatio
        ).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (withdrawals && !earlyTermination) {
        let interestRate = (KeyRateRub * withdrawalsRatio).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (!withdrawals && earlyTermination) {
        let interestRate = (KeyRateRub * depositEarlyTerminationRatio).toFixed(
          2
        );
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (!withdrawals && !earlyTermination) {
        let interestRate = KeyRateRub.toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else return 0;

    case "usd":
      return currency;
    default:
      return 0;
  }
};
