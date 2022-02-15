import React from "react";
import DepositItem from "./DepositItem";
import { IDeposit } from "../data/types";

import Stack from "@mui/material/Stack";
interface DepositListProps {
  deposits: void | IDeposit[];
  currency: string;
  paymentPeriod: string;
  depositTerm: number;
  depositOptions: any;
  value: number;
}

//компонент для вывода списка депозитов
const DepositList: React.FC<DepositListProps> = ({
  deposits,
  currency,
  paymentPeriod,
  depositTerm,
  depositOptions,
  value,
}) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      {(deposits || [])
        .filter(
          (deposit) =>
            deposit.currency === currency &&
            deposit.paymentPeriods === paymentPeriod &&
            (depositTerm <= deposit.maxTerm || deposit.maxTerm === 0) &&
            depositTerm <= deposit.maxTerm &&
            depositTerm >= deposit.minTerm &&
            (value <= deposit.maxSum || deposit.maxSum === 0) &&
            value >= deposit.minSum &&
            deposit.withdrawals === Number(depositOptions.checkWithdrawals) &&
            deposit.earlyTermination ===
              Number(depositOptions.checkEarlyTermination)
        )
        .map((filteredDeposit) => {
          // console.log(Number(depositOptions.checkWithdrawals));
          // console.log(filteredDeposit.withdrawals);
          return (
            <DepositItem
              key={filteredDeposit.id}
              deposit={filteredDeposit}
              value={value}
              depositTerm={depositTerm}
            />
          );
        })}
      {/* // .map((filteredDeposit) => (
        //   <DepositItem key={filteredDeposit.id} deposit={filteredDeposit} />
        // ))} */}
    </Stack>
  );
};

export default DepositList;
