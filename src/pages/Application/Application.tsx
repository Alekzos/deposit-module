import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { getsessionStorageData } from "../../utils/utils";
export const Application = () => {
  const [account, setAccount] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value as string);
  };

  const product = getsessionStorageData("product");

  let accounts = [];

  // let accountsEUR = getsessionStorageData("accountsEUR");
  // console.log(accountsEUR);

  if (product.currency === "usd") {
    accounts = getsessionStorageData("accountsUSD");
  } else {
    accounts = getsessionStorageData("accountsRUB");
  }

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
            {accounts.map((account: []) => {
              return (
                <MenuItem key={account.toString()} value={account}>
                  {account}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
