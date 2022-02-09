import React from 'react';
import { useState, useEffect } from 'react';

import './style.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { StylesProvider } from '@mui/styles';
import { withStyles } from '@mui/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import customStyles from './styles'
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MuiInput from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';



//main
const DepositCalc = () => {
  type Nullable<T> = T | undefined | null;

  //переключатель валюты
  const [currency, setCurrency] = useState<string | null | undefined>('ruble');
  const handleCurrency = (
    event: React.MouseEvent<HTMLElement>,
    newCurrency: string | null | undefined,
  ) => {
    setCurrency(newCurrency);
    console.log(newCurrency)
  };


  // выбор суммы вклада 
  const [value, setValue] = useState<number | string | Array<number | string>>(
    0,
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  function numberWithSpaces(val: any) {
    val = Number(val.toString().replace(' ', ''));
    let formatedNumber = val.toLocaleString();
    return formatedNumber;
  }

  function numberWithoutSpaces(val: any) {
      val = Number(val.toLocaleString().replace(/\D/g,''));
      if (val >= 100000000) {val = 100000000} // пре превышении лимита установить макс значение
    return val;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : numberWithoutSpaces(event.target.value));
  };

  const marksSliderDeposit = [
    {
      value: 0,
      label: `0 ${(currency === 'ruble'? '₽' : '$')}`,
    },
    {
      value: 100000000,
      label: `∞ ${(currency === 'ruble'? '₽' : '$')}`,
    },
  ];


  //выбор срока депозита
  const [depositTerm, setdepositTerm] = useState<number | string | Array<number | string | null | undefined>>(
    1,
  );

  const handleSliderDepositTerm = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };
  
  const marksSliderDepositTerm = [
    {
      value: 1,
      label: '1 день',
    },
    {
      value: 1095,
      label: '3 года',
    },
  ];


  
  
    return (
    <>
    <StyledEngineProvider injectFirst>
      <Typography variant="h1">Депозитный калькулятор</Typography>
      <Typography paragraph>Введите параметры и подберите подходящий продукт</Typography>
      <Grid container>
        <Grid item xs={6}> 
          <ToggleButtonGroup
            value={currency}
            exclusive
            onChange={handleCurrency}
            aria-label="currency"
            color="primary"
            fullWidth
          >
            <ToggleButton  value="ruble">Рубли</ToggleButton>
            <Divider variant="middle" />        
            <ToggleButton  value="dollar">Доллары США</ToggleButton>
          </ToggleButtonGroup>

          <Box>
            <Typography variant='caption'>Сумма</Typography>   
            <TextField
              hiddenLabel
              id="outlined-number"
              defaultValue="0"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={numberWithSpaces(value)}
              //value={numberWithSpaces(value) + '<p className={"currency"}> ₽</p>'}
              onChange={handleInputChange}
              inputProps={{
                step: 500,
                min: 0,
                'aria-labelledby': 'input-slider',
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">{(currency === 'ruble'? '₽' : '$')}</InputAdornment>, 
              }}

            /> 

            <Slider
              value={typeof value === 'number' ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              min={0}
              max = {100000000}
              step={500}
              valueLabelFormat={numberWithSpaces(value) + (currency === 'ruble'? ' ₽' : ' $')}
              valueLabelDisplay="auto"
              marks={marksSliderDeposit}    
 
            />
          </Box>

          <Box>
            <Typography variant='caption'>Срок</Typography>   
            <Slider
              value={typeof depositTerm === 'number' ? value : 1}
              //value={1}
              onChange={handleSliderDepositTerm}
              aria-labelledby="DepositTermSlider"
              min={1}
              max = {1095}
              step={1}
              //valueLabelFormat={numberWithSpaces(value) + (currency === 'ruble'? ' ₽' : ' $')}
              valueLabelDisplay="auto"
              marks={marksSliderDepositTerm} 
            />
          </Box>
        
        <br></br>
        выплата процентов<br></br>
        опции<br></br>
        сохранить расчет
        </Grid>
           
        <Grid item xs={6}>
            Варианты вкладов<br></br>

            авансовый<br></br>
            универсальный<br></br>
            фиксированный<br></br>
            гибкий

        </Grid>
      </Grid>
      
       


      
      </StyledEngineProvider>
    </>
    )};

export default DepositCalc;