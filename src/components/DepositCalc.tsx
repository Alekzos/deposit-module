import React from 'react';

import { useState } from 'react';

import './style.css';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Box from '@mui/material/Box'

import {numberWithoutSpaces} from './utils';

import SliderWithTextField from './SliderWithTextField'




//main
const DepositCalc = () => {

  enum Currency { 
    rub = "rub", 
    usd = "usd",
  };

  enum paymentPeriods { 
    startOfTerm = "startOfTerm", 
    monthly = "monthly",
    endOfTerm = "endOfTerm",
  };
  

  //переключатель валюты
  const [currency, setCurrency] = useState<string>(Currency.rub);

  const handleCurrency = (
    event: React.MouseEvent<HTMLElement>,
    newCurrency: string,
  ) => {
    setCurrency(newCurrency);
  };

  //выбор периода платежей
  const [paymentPeriod, setPaymentPeriod] = useState<string>(paymentPeriods.startOfTerm);;

  const handlePaymentPeriod = (
    event: React.MouseEvent<HTMLElement>,
    newPeriod: string,
  ) => {
    setPaymentPeriod(newPeriod);
  };



  // выбор суммы вклада 
  const [value, setValue] = useState<number>(0,);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(+newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : numberWithoutSpaces(event.target.value, 100000000));
  };


  //выбор срока депозита
  const [depositTerm, setdepositTerm] = useState<number>(1,);


  const handleInputDepositTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : numberWithoutSpaces(event.target.value, 1095));
  };

  const handleSliderDepositTerm = (event: Event, newValue: number | number[]) => {
    setdepositTerm(+newValue);
  };


    
  const days: boolean = true;

    return (
    <>
    <StyledEngineProvider injectFirst>
      <Typography variant="h1">Депозитный калькулятор</Typography>
      <Typography paragraph>Введите параметры и подберите подходящий продукт</Typography>
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
              <ToggleButton  value="rub">Рубли</ToggleButton>     
              <ToggleButton  value="usd">Доллары США</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <SliderWithTextField 
            caption={'Сумма'}
            Currency={Currency}
            currency={currency} 
            step={500}
            min= {0}
            max = {100000000}
            value= {value}
            handleInputChange = {handleInputChange}
            handleSliderChange = {handleSliderChange}
          />

 
          <SliderWithTextField 
            caption={'Срок'}
            days
            Currency={Currency}
            step={1}
            min= {1}
            max = {1095}
            value= {depositTerm}
            handleInputChange = {handleInputDepositTerm}
            handleSliderChange = {handleSliderDepositTerm}
          />

          <Box>
          <Typography variant='caption'>Выплата процентов</Typography>  
          <ToggleButtonGroup
            value={paymentPeriod}
            exclusive
            onChange={handlePaymentPeriod }
            aria-label="period-payment"
            color="primary"
            fullWidth
          >
            <ToggleButton  value="startOfTerm">В начале срока</ToggleButton>     
            <ToggleButton  value="monthly">Ежемесячно</ToggleButton>
            <ToggleButton  value="endOfTerm">В конце срока</ToggleButton>
          </ToggleButtonGroup>
          </Box>
        
        
        <br></br>
        
        опции<br></br>
        сохранить расчет
        </Grid>
           
        <Grid item xs={6}>
          <Box>
            Варианты вкладов<br></br>
            авансовый<br></br>
            универсальный<br></br>
            фиксированный<br></br>
            гибкий
            </Box>
        </Grid>
      </Grid>
      </StyledEngineProvider>
    </>
    )};

export default DepositCalc;