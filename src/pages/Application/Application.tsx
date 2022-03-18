import React from "react";
import { useState } from "react";

import "../../styles/application.css";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { useLocation } from "react-router-dom";

import { getsessionStorageData, numberWithSpaces } from "../../utils/utils";

import { Currencies } from "../../data/consts";

export const Application = () => {
  const [account, setAccount] = useState("");
  // const depositSum = location.state;
  const location = useLocation();
  const product1 = location.state;

  console.log("location.state");
  console.log(product1);
  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value as string);
  };

  const product = getsessionStorageData("product");
  const accounts = getsessionStorageData("accounts");

  const filteredAccounts = accounts.filter(
    (account: any) => account.currency === product.currency
  );

  return (
    <div className="application">
      <Typography variant="h1">Заявление на открытие депозита</Typography>
      Страница депозитной заявки Содержит - заголовок и статус - информацию,
      полученную со страницы калькулятора - выбор счета - информацию о клиенте -
      кнопки Сохранить и Отправить (для клиента)
      <Box sx={{ maxWidth: 500 }}>
        <FormControl required>
          <InputLabel id="account-select-label">
            счёт для пополнения депозита
          </InputLabel>
          <Select
            labelId="account-select-label"
            id="account"
            value={account}
            label="счёт"
            onChange={handleChange}
          >
            {filteredAccounts.map((filteredAccount: any) => {
              return (
                <MenuItem
                  className="selectAccountItem"
                  key={filteredAccount.account}
                  value={filteredAccount.account}
                >
                  {filteredAccount.account}
                  <span className="accountBalanceItem">
                    {numberWithSpaces(filteredAccount.balance)}

                    {filteredAccount.currency === Currencies.rub ? "₽" : "$"}
                  </span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
