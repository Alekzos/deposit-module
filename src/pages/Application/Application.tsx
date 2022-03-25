import React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { addApplication } from "../../api/api";

import { numberWithSpaces, declOfNum } from "../../utils/utils";

import { Currencies, declensionsDays, pageURLs } from "../../data/consts";

import { useAppSelector } from "../../redux/hooks";

export const Application = () => {
  const { selectedProduct, selectedDepositSum, selectedDepositTerm } =
    useAppSelector((state) => state.productReducer);

  const { selectedUser } = useAppSelector((state) => state.userReducer);
  const { accounts, name, surname, patronymic, inn } = selectedUser;
  let applicationStatus = false;

  //если форма не заполнена (стор пуст), тогда редирект на выбор депозита.
  //признак пустоты стора - незаполненая валюта
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedProduct.currency) {
      navigate(pageURLs.productSelectionPage);
    }
  }, []);

  //выбор счета
  const [account, setAccount] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value as string);
  };

  //ограничение выбора счета в зависимости от валюты выбранного продукта
  const filteredAccounts = accounts.filter(
    (account: any) => account.currency === selectedProduct.currency
  );

  return (
    <div className="application">
      <Typography variant="h1">Заявление на открытие депозита</Typography>
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h6" component="div">
          Вклад «{selectedProduct.title}»
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {selectedProduct.description}
        </Typography>
        <Typography variant="body1">
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
          <Typography variant="h6">Дополнительные опции</Typography>
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
        <FormControl required>
          <Typography variant="h6">Cчёт для пополнения депозита </Typography>
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
        <Button
          variant="contained"
          component={Link}
          sx={{ mr: 2 }}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            addApplication(
              selectedProduct,
              selectedDepositSum,
              selectedDepositTerm,
              selectedUser,
              account,
              (applicationStatus = true)
            );
          }}
          to={pageURLs.applicationList}
        >
          Отправить
        </Button>

        <Button
          variant="outlined"
          component={Link}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            addApplication(
              selectedProduct,
              selectedDepositSum,
              selectedDepositTerm,
              selectedUser,
              account,
              (applicationStatus = false)
            );
          }}
          to={pageURLs.applicationList}
        >
          в черновик
        </Button>
      </Box>
    </div>
  );
};
