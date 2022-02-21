import React from "react";

import { useState, useEffect, useMemo, useCallback } from "react";

import {
  Currencies,
  productsDataURL,
  maxInputSum,
  maxInputTerm,
  stepInputSum,
} from "../../data/consts";

import { IProduct } from "../../data/types";

import { numberWithoutSpaces } from "../../utils/utils";

import "../../styles/style.css";

import { debounce } from "lodash";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { Tooltip } from "@mui/material";
import HelpOutline from "@mui/icons-material/HelpOutline";

import ProductList from "./components/ProductList";
import SliderWithTextField from "./components/SliderWithTextField";
import { getProducts } from "./components/getProducts";

//main
const ProductSelection = () => {
  const [products, setProducts] = useState<void | IProduct[]>([]);
  const [currency, setCurrency] = useState<string>(Currencies.rub);
  const [value, setValue] = useState<number>(0);
  const [depositTerm, setdepositTerm] = useState<number>(1);
  const [depositOptions, setDepositOptions] = useState({
    earlyTermination: false,
    withdrawals: false,
    interestСapitalization: false,
  });

  useEffect(() => {
    getProductsWithDebounce();
  }, [currency, depositTerm, depositOptions, value]);

  //задержка для ввода, чтобы запрос не сразу отправлялся при изменении данных
  const getProductsWithDebounce = useCallback(
    debounce(() => {
      const fetchData = async (productsDataURL: string) => {
        let response = await getProducts(
          productsDataURL,
          currency,
          depositTerm,
          depositOptions,
          value
        );
        setProducts(response);
      };
      fetchData(productsDataURL);
    }, 200),
    []
  );

  //переключатель валюты
  const handleCurrency = (
    event: React.MouseEvent<HTMLElement>,
    newCurrency: string
  ) => {
    setCurrency(newCurrency);
  };

  //обработчик слайдера суммы депозита и срока вклада
  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number | number[]
  ) => {
    if (e.target.name === "depositSlider") {
      setValue(+newValue);
    }
    if (e.target.name === "termSlider") {
      setdepositTerm(+newValue);
    }
    if (e.target.name === "depositInput") {
      setValue(numberWithoutSpaces(e.target.value, maxInputSum));
    }
    if (e.target.name === "termInput") {
      setdepositTerm(numberWithoutSpaces(e.target.value, maxInputTerm));
    }
  };

  //опции депозита (чекбоксы)
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepositOptions({
      ...depositOptions,
      [event.target.name]: event.target.checked,
    });
    console.log(depositOptions);
  };
  const { earlyTermination, withdrawals, interestСapitalization } =
    depositOptions;

  return (
    <>
      <Typography variant="h1">Депозитный калькулятор</Typography>
      <Typography paragraph>
        Введите параметры и подберите подходящий продукт
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Box>
            <ToggleButtonGroup
              value={currency}
              exclusive
              onChange={handleCurrency}
              aria-label="currency"
              color="primary"
              fullWidth
            >
              <ToggleButton value="rub">Рубли</ToggleButton>
              <ToggleButton value="usd">Доллары США</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <SliderWithTextField
            caption={"Сумма"}
            currency={currency}
            step={stepInputSum}
            min={0}
            max={maxInputSum}
            value={value}
            // handleInputChange={handleInputChange}
            handleSliderChange={handleSliderChange}
          />

          <SliderWithTextField
            caption={"Срок"}
            days
            Currencies={Currencies}
            step={1}
            min={1}
            max={maxInputTerm}
            value={depositTerm}
            handleSliderChange={handleSliderChange}
          />

          <Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={earlyTermination}
                    onChange={handleChangeCheckBox}
                    name="earlyTermination"
                    icon={<ToggleOffIcon fontSize="large" />}
                    checkedIcon={<ToggleOnIcon fontSize="large" />}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 60 } }}
                  />
                }
                label="Досрочное расторжение"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={withdrawals}
                    onChange={handleChangeCheckBox}
                    icon={<ToggleOffIcon />}
                    checkedIcon={<ToggleOnIcon />}
                    name="withdrawals"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 60 } }}
                  />
                }
                label={
                  <>
                    Частичное снятие и пополнение{" "}
                    <Tooltip
                      title="Информация об условиях частичного снятия"
                      className="checkWithdrawalsHelp"
                    >
                      <HelpOutline />
                    </Tooltip>
                  </>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={interestСapitalization}
                    onChange={handleChangeCheckBox}
                    name="interestСapitalization"
                    icon={<ToggleOffIcon fontSize="large" />}
                    checkedIcon={<ToggleOnIcon fontSize="large" />}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 60 } }}
                  />
                }
                label={
                  <>
                    Капитализация процентов
                    <Tooltip
                      title="ежемесячная"
                      className="checkWithdrawalsHelp"
                    >
                      <HelpOutline />
                    </Tooltip>
                  </>
                }
              />
            </FormGroup>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>
            <ProductList
              products={products}
              currency={currency}
              depositTerm={depositTerm}
              depositOptions={depositOptions}
              value={value}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export { ProductSelection };
