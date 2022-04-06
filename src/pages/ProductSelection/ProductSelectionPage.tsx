import React from "react";

import { useState, useEffect, useCallback } from "react";

import {
  Currencies,
  maxInputSum,
  maxInputTerm,
  stepInputSum,
  jsonDataURLs,
} from "../../data/consts";

import { IProduct } from "../../data/types";

import { numberWithoutSpaces } from "../../utils/utils";
import { debounce } from "lodash";
import { getProducts } from "../../api/productAPI";
import { getUser } from "../../api/userAPI";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { Tooltip } from "@mui/material";
import HelpOutline from "@mui/icons-material/HelpOutline";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import ProductList from "./components/ProductList";
import SliderWithTextField from "./components/SliderWithTextField";
import { useAppSelector } from "../../redux/hooks";
import { Spinner } from "../../components/Spinner/Spinner";
//main
const ProductSelection = () => {
  const [products, setProducts] = useState<void | IProduct[]>([]);
  const [currency, setCurrency] = useState<string>(Currencies.rub);
  const [depositSum, setDepositSum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedUser } = useAppSelector((state) => state.userReducer);
  const [messageProductNotFound, setMessageProductNotFound] =
    useState<string>("");

  const [depositTerm, setdepositTerm] = useState<number>(1);

  const [depositOptions, setDepositOptions] = useState({
    earlyTermination: false,
    withdrawals: false,
    interestCapitalization: false,
  });

  //pending вместо юзера
  const user = getUser();
  console.log(user);

  useEffect(() => {
    setIsLoading(true);
    getProductsWithDebounce({
      currency,
      depositTerm,
      depositOptions,
      depositSum,
    });
  }, [currency, depositTerm, depositOptions, depositSum]);

  //задержка для ввода, чтобы запрос не сразу отправлялся при изменении данных
  const getProductsWithDebounce = useCallback(
    debounce(({ currency, depositTerm, depositOptions, depositSum }) => {
      const fetchData = async (productsDataURL: string) => {
        let response = await getProducts(
          currency,
          depositTerm,
          depositOptions,
          depositSum
        );
        setProducts(response);
        if (depositSum > 0) {
          setMessageProductNotFound(
            "Продукты c заданными условиями не найдены"
          );
        } else setMessageProductNotFound("");
      };
      fetchData(jsonDataURLs.products);
      setIsLoading(false);
    }, 500),

    []
  );

  //переключатель валюты
  const handleCurrency = (
    event: React.ChangeEvent<HTMLInputElement>,
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
      setDepositSum(+newValue);
    }
    if (e.target.name === "termSlider") {
      setdepositTerm(+newValue);
    }
    if (e.target.name === "depositInput") {
      setDepositSum(numberWithoutSpaces(e.target.value, maxInputSum));
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
  };
  const { earlyTermination, withdrawals, interestCapitalization } =
    depositOptions;

  const renderProductList = (
    <React.Fragment>
      {products?.length ? (
        <ProductList
          products={products}
          depositSum={depositSum}
          depositTerm={depositTerm}
        />
      ) : (
        <Typography variant="h6" component="div">
          {messageProductNotFound
            ? messageProductNotFound
            : messageProductNotFound}
        </Typography>
      )}
    </React.Fragment>
  );

  return (
    <div className="calcPage">
      <Typography variant="h1">Депозитный калькулятор</Typography>
      <Typography paragraph>
        Введите параметры и подберите подходящий продукт
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Box>
            <FormControl>
              <RadioGroup
                value={currency}
                onChange={handleCurrency}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="rub"
                  control={<Radio />}
                  label="Рубли"
                />
                <FormControlLabel
                  value="usd"
                  control={<Radio />}
                  label="Доллары США"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <SliderWithTextField
            caption={"Сумма"}
            currency={currency}
            step={stepInputSum}
            min={0}
            max={maxInputSum}
            value={depositSum}
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
                    checked={interestCapitalization}
                    onChange={handleChangeCheckBox}
                    name="interestCapitalization"
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
          <Box>{isLoading ? <Spinner /> : renderProductList}</Box>
        </Grid>
      </Grid>
    </div>
  );
};

export { ProductSelection };
