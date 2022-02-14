import React from "react";
import { IDeposit } from "../data/types";

interface DepositItemProps {
  deposit: IDeposit;
}

const DepositItem: React.FC<DepositItemProps> = ({ deposit }) => {
  return (
    <div>
      {deposit.title}

      {
        //сделал по аналогии с учебным примером, но не работает так:
        /*<ul> 
           {deposit.map(item => 
            (<li>
                {item.title}
            </li>))}
      </ul> */
      }
    </div>
  );
};

export default DepositItem;
