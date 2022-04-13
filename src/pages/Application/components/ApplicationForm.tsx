import React from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { IProduct } from "../../ProductSelection/types";
import { IUser } from "../../Login/types";

import { SelectChangeEvent } from "@mui/material/Select";

import { numberWithSpaces, declOfNum } from "../../../utils/utils";
import { formatAccount } from "../utils";

import { Currencies, declensionsDays } from "../../../data/consts";
import { DocStatus } from "../consts";

type Props = {
  product: IProduct;
  user: IUser;
  account: any;
  status: any;
  handleChange: (event: SelectChangeEvent) => void;
};

export const ApplicationForm = ({
  product,
  user,
  account,
  handleChange,
  status,
}: Props) => {
  const { name, surname, patronymic, inn, accounts } = user;

  //ограничение выбора счета в зависимости от валюты выбранного продукта
  const filteredAccounts = accounts.filter(
    (account: any) => account.currency === product.currency
  );

  //добавил, чтобы избежать ошибку зависимостей,
  //просто formatAccount(account) не работает в рендере
  let formatedAccount = null;
  if (account) {
    formatedAccount = formatAccount(account);
  }

  return (
    <React.Fragment>
      <Typography variant="h1">Заявление на открытие депозита</Typography>

      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h6" component="div">
          Вклад «{product.title}»
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1">
          <>
            Cумма:{" "}
            <strong>
              {numberWithSpaces(product.selectedDepositSum)}{" "}
              {product.currency === Currencies.rub ? "₽" : "$"}
            </strong>
            <br />
          </>
          <>
            Cрок:{" "}
            <strong>
              {product.selectedDepositTerm}{" "}
              {product.selectedDepositTerm &&
                declOfNum(product.selectedDepositTerm, declensionsDays)}
            </strong>
            <br />
          </>
          {product.effectiveInterestRate ? (
            <>
              Эффективная ставка:{" "}
              <strong>{product.effectiveInterestRate}%</strong>
              <br />
            </>
          ) : (
            <>
              Cтавка:  <strong>{product.interestRate}%</strong>
              <br />
            </>
          )}
          Ваш доход: 
          <strong>
            {numberWithSpaces(product.futureValue)}{" "}
            {product.currency === Currencies.rub ? "₽" : "$"}
          </strong>
          <br />
          <br />
          <Typography variant="h6">Дополнительные опции</Typography>
          Частичное снятие и пополнение: 
          <strong>{product.withdrawals ? "да" : "нет"}</strong>
          <br />
          Досрочное расторжение: 
          <strong>{product.earlyTermination ? "да" : "нет"}</strong>
          <br />
          Капитализация: 
          <strong>{product.effectiveInterestRate ? "да" : "нет"}</strong>
          <br />
          <br />
          <Typography variant="h6">Информация о клиенте</Typography>
          ФИО:{" "}
          <strong>
            {surname} {name} {patronymic}
          </strong>
          <br />
          ИНН: <strong>{inn}</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6">Cчёт для пополнения депозита </Typography>
        {status === DocStatus.DRAFT || status === undefined ? (
          <FormControl required>
            <Select
              required
              sx={{ maxWidth: "500px" }}
              labelId="account-select-label"
              id="account"
              value={String(account)}
              onChange={handleChange}
            >
              {(filteredAccounts || []).map((filteredAccount: any) => {
                return (
                  <MenuItem
                    className="selectAccountItem"
                    key={filteredAccount.account}
                    value={String(filteredAccount.account)}
                  >
                    {formatAccount(filteredAccount.account)}
                    <span className="accountBalanceItem">
                      {numberWithSpaces(filteredAccount.balance)}

                      {filteredAccount.currency === Currencies.rub ? "₽" : "$"}
                    </span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : (
          <strong>{formatedAccount}</strong>
        )}
      </Box>
    </React.Fragment>
  );
};
