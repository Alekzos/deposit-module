import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import { addApplication } from "../../api/api";

import {
  getsessionStorageData,
  numberWithSpaces,
  declOfNum,
} from "../../utils/utils";

import { Currencies, declensionsDays, pageURLs } from "../../data/consts";

import { useAppSelector } from "../../redux/hooks";

export const Application = () => {
  const [account, setAccount] = useState("");
  const { selectedProduct, selectedDepositSum, selectedDepositTerm } =
    useAppSelector((state) => state.productReducer);

  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value as string);
  };

  const accounts = getsessionStorageData("accounts");
  const name = sessionStorage.getItem("name");
  const surname = sessionStorage.getItem("surname");
  const patronymic = sessionStorage.getItem("patronymic");
  const inn = sessionStorage.getItem("inn");
  let applicationStatus = false;

  const filteredAccounts = accounts.filter(
    (account: any) => account.currency === selectedProduct.currency
  );

  return (
    <div className="application">
      <Typography variant="h1">Заявление на открытие депозита</Typography>
      <Box sx={{ maxWidth: 500 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Вклад «{selectedProduct.title}»
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedProduct.description}
            </Typography>
            <Typography variant="body2">
              <>
                Cумма:{" "}
                <strong>
                  {numberWithSpaces(selectedDepositSum)}{" "}
                  {selectedProduct.currency === Currencies.rub ? "₽" : "$"}
                </strong>
                <br />
              </>
              <>
                Cрок:{" "}
                <strong>
                  {selectedDepositTerm}{" "}
                  {declOfNum(selectedDepositTerm, declensionsDays)}
                </strong>
                <br />
                <br />
              </>
              {selectedProduct.effectiveInterestRate ? (
                <>
                  Эффективная ставка:{" "}
                  <strong>{selectedProduct.effectiveInterestRate}%</strong>
                  <br />
                </>
              ) : (
                <>
                  Cтавка:  <strong>{selectedProduct.interestRate}%</strong>
                  <br />
                </>
              )}
              Ваш доход: 
              <strong>
                {numberWithSpaces(selectedProduct.futureValue)}{" "}
                {selectedProduct.currency === Currencies.rub ? "₽" : "$"}
              </strong>
              <br />
              <br />
              Частичное снятие и пополнение: 
              <strong>{selectedProduct.withdrawals ? "да" : "нет"}</strong>
              <br />
              Досрочное расторжение: 
              <strong>{selectedProduct.earlyTermination ? "да" : "нет"}</strong>
              <br />
              Капитализация: 
              <strong>
                {selectedProduct.effectiveInterestRate ? "да" : "нет"}
              </strong>
              <br />
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        ФИО:{" "}
        <strong>
          {surname} {name} {patronymic}
        </strong>
        <br />
        ИНН: <strong>{inn}</strong>
      </Box>
      <Box>
        <FormControl required>
          <InputLabel id="account-select-label">
            счёт для пополнения депозита
          </InputLabel>
          <Select
            required
            sx={{ maxWidth: "500px" }}
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
      <Box>
        <CardActions>
          <Link to={pageURLs.applicationList}>
            <Button
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                addApplication(
                  selectedProduct,
                  selectedDepositSum,
                  selectedDepositTerm,
                  name,
                  surname,
                  patronymic,
                  inn,
                  account,
                  (applicationStatus = false)
                );
              }}
              size="small"
            >
              Черновик
            </Button>
          </Link>
          <Link to={pageURLs.applicationList}>
            <Button
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                addApplication(
                  selectedProduct,
                  selectedDepositSum,
                  selectedDepositTerm,
                  name,
                  surname,
                  patronymic,
                  inn,
                  account,
                  (applicationStatus = true)
                );
              }}
              size="small"
            >
              Отправить
            </Button>
          </Link>
        </CardActions>
      </Box>
    </div>
  );
};
