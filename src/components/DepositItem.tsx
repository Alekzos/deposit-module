import React from "react";

import { IDeposit } from "../data/types";
import { switchPaymentPeriods, declOfNum } from "../utils/utils";
import { doCalc } from "../utils/doCalc";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface DepositItemProps {
  deposit: IDeposit;
  depositTerm: number;
  value: number;
}

//компонент для вывода самой карточки
const DepositItem: React.FC<DepositItemProps> = ({
  deposit,
  depositTerm,
  value,
}) => {
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {deposit.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {deposit.description}
          </Typography>
          <Typography variant="body2">
            Ставка:{" "}
            <strong>
              {doCalc(
                deposit.earlyTermination,
                deposit.withdrawals,
                deposit.paymentPeriods,
                deposit.currency,
                value,
                depositTerm
              )}
            </strong>
            <br />
            Срок: <strong>{deposit.termDescription}</strong>
            <br />
            Сумма: 
            <strong>{deposit.sumDescription}</strong>
            <br />
            {/* Валюта: {deposit.currency}
            <br />
            Сумма: {deposit.minSum} - {deposit.maxSum ? 1 : "∞"}
            <br /> */}
            {/* Срок: {deposit.minTerm} - {deposit.maxTerm} 
            {declOfNum(deposit.maxTerm, ["день", "дня", "дней"])}
            <br /> */}
            Выплата процентов: 
            {switchPaymentPeriods(deposit.paymentPeriods)}
            <br />
            Частичное снятие и пополнение: 
            <strong>{deposit.withdrawals ? "да" : "нет"}</strong>
            <br />
            Досрочное расторжение: 
            <strong>{deposit.earlyTermination ? "да" : "нет"}</strong>
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Оформить</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default DepositItem;
