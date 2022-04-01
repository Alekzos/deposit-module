//рассчет процентов по депозиту
import {
  calcWithinterestCapitalization,
  calcValueKf,
} from "../../pages/ProductSelection/utils";
import {
  KeyRateRub,
  KeyRateUsd,
  depositEarlyTerminationRatio,
  withdrawalsRatio,
} from "../../data/consts";

export const doCalc = (
  earlyTermination: number,
  withdrawals: number,
  interestCapitalization: number,
  currency: string,
  value: number,
  depositTerm: number
) => {
  let valueKf = calcValueKf(value, currency);

  switch (currency) {
    case "rub":
      if (withdrawals && earlyTermination) {
        let interestRate = (
          KeyRateRub *
          depositEarlyTerminationRatio *
          valueKf *
          withdrawalsRatio
        ).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (withdrawals && !earlyTermination) {
        let interestRate = (KeyRateRub * valueKf * withdrawalsRatio).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (!withdrawals && earlyTermination) {
        let interestRate = (
          KeyRateRub *
          valueKf *
          depositEarlyTerminationRatio
        ).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (!withdrawals && !earlyTermination) {
        let interestRate = (valueKf * KeyRateRub).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else return 0;

    case "usd":
      if (withdrawals && earlyTermination) {
        let interestRate = (
          KeyRateUsd *
          depositEarlyTerminationRatio *
          valueKf *
          withdrawalsRatio
        ).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (withdrawals && !earlyTermination) {
        let interestRate = (KeyRateUsd * valueKf * withdrawalsRatio).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (!withdrawals && earlyTermination) {
        let interestRate = (
          KeyRateUsd *
          valueKf *
          depositEarlyTerminationRatio
        ).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else if (!withdrawals && !earlyTermination) {
        let interestRate = (valueKf * KeyRateUsd).toFixed(2);
        return calcWithinterestCapitalization(
          value,
          depositTerm,
          interestRate,
          interestCapitalization
        );
      } else return 0;
  }
};
