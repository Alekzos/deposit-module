import React from "react";
import { useState, useEffect } from "react";
import DepositItem from "./DepositItem";

import { IDeposit } from "../data/types";

interface DepositListProps {
  deposits: IDeposit[];
}

const DepositList: React.FC<DepositListProps> = ({ deposits }) => {
  return (
    <div>
      {deposits.map((deposit) => (
        <DepositItem key={deposit.id} deposit={deposit} />
      ))}
    </div>
  );
};

export default DepositList;
