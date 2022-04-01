import { inRange } from "../../utils/utils";

//рассчет процентов по депозиту

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

//рассчет бонуса за размер депозита
export const calcValueKf = (value: number, currency: string): any => {
  let valueKf = 1;

  switch (currency) {
    case "rub":
      if (inRange(value, 50000000, 100000000)) {
        valueKf = 1.01;
      } else if (inRange(value, 100000000, 300000000)) {
        valueKf = 1.02;
      } else if (inRange(value, 300000000, 500000000)) {
        valueKf = 1.03;
      } else if (inRange(value, 500000000, 700000000)) {
        valueKf = 1.04;
      } else if (inRange(value, 700000000, 1000000000000)) {
        valueKf = 1.05;
      } else {
        valueKf = 1;
      }
      return valueKf;
    case "usd":
      if (inRange(value, 5000000, 10000000)) {
        valueKf = 1.01;
      } else if (inRange(value, 10000000, 3000000)) {
        valueKf = 1.02;
      } else if (inRange(value, 30000000, 50000000)) {
        valueKf = 1.03;
      } else if (inRange(value, 50000000, 70000000)) {
        valueKf = 1.04;
      } else if (inRange(value, 70000000, 1000000000000)) {
        valueKf = 1.05;
      } else {
        valueKf = 1;
      }
      return valueKf;
  }
};
