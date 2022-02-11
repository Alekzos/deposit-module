import React from 'react';

import { useState, useEffect } from 'react';

import axios from "axios";

import './style.css';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { Tooltip } from '@mui/material';
import HelpOutline from '@mui/icons-material/HelpOutline';

import {numberWithoutSpaces} from './utils';

import DepositsList from './DepositsList';
import {IDeposit} from '../../data/types';

import SliderWithTextField from './SliderWithTextField'


//main
const DepositCalc = () => {



  const [deposits, setDeposits] = useState<IDeposit[]>();
  const baseURL = "";

  useEffect(() => {
    fetchDeposits()
}, [])


  
  async function fetchDeposits() {
    try {
        const response = await axios.get<IDeposit[]>('http://localhost:8000/deposits')
        setDeposits(response.data)
    } catch (e) {
        alert(e)
    }
}



  enum Currencies  { 
    rub = "rub", 
    usd = "usd",
  };

  enum paymentPeriods { 
    startOfTerm = "startOfTerm", 
    monthly = "monthly",
    endOfTerm = "endOfTerm",
  };
  

  //переключатель валюты
  const [currency, setCurrency] = useState<string>(Currencies.rub);

  const handleCurrency = (
    event: React.MouseEvent<HTMLElement>,
    newCurrency: string,
  ) => {
    setCurrency(newCurrency);
  };

  //выбор периода платежей
  const [paymentPeriod, setPaymentPeriod] = useState<string>(paymentPeriods.startOfTerm);

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


  //опции депозита (чекбоксы)
  const [depositOptions, setDepositOptions] = useState({
    checkEarlyTermination: false,
    checkWithdrawals: false,
    interestСapitalization: false,
  });


  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepositOptions({
      ...depositOptions,
      [event.target.name]: event.target.checked,
    });
    console.log(depositOptions)
  };

  const { checkEarlyTermination, checkWithdrawals, interestСapitalization } = depositOptions;
    

    return (
    <>
    <StyledEngineProvider injectFirst>
      <Typography variant="h1">Депозитный калькулятор</Typography>
      <Typography paragraph>Введите параметры и подберите подходящий продукт</Typography>
     
      <DepositList props={deposits} />

      
      
      
      
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
            Currencies={Currencies}
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
            Currencies={Currencies}
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
        
          <Box> 
          
          <FormGroup>
            <FormControlLabel 
              control={ 
                <Checkbox  
                  checked={checkEarlyTermination} 
                  onChange={handleChangeCheckBox} 
                  name="checkEarlyTermination" 
                  icon={<ToggleOffIcon fontSize="large"/>} 
                  checkedIcon={<ToggleOnIcon fontSize="large"/>} 
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 60 } }}
                />} 
                label="Досрочное расторжение" 
            />
              
            <FormControlLabel 
              control={ 
                <Checkbox 
                  checked={checkWithdrawals} 
                  onChange={handleChangeCheckBox} 
                  icon={<ToggleOffIcon />} 
                  checkedIcon={<ToggleOnIcon />} 
                  name="checkWithdrawals"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 60 } }}                  
                />} 
              label="Частичное снятие и пополнение"  
              />
              <Tooltip title="Информация об условиях частичного снятия" className="checkWithdrawalsHelp">
                  <HelpOutline />
              </Tooltip>
              

              {/* увидел в задании, что после пункта досрочного расторжения
               идет капитализации - и добавил ее,
               как потом понял, что я уже ее сделал выше. Пока не удалил, можно добавить доп. опцию, 
               например "специальные вклады" (пенсионные / инвестиционные / страховые / детские и т.п)
              */}
              {/* <FormControlLabel 
              control={ 
                <Checkbox 
                  checked={interestСapitalization} 
                  onChange={handleChangeCheckBox} 
                  icon={<ToggleOffIcon />} 
                  checkedIcon={<ToggleOnIcon />} 
                  name="interestСapitalization"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 60 } }}                  
                />} 
              label="Капитализации процентов"  
              />
              <Tooltip title="Информация про капитализацию процентов" className="interestСapitalizationHelp" >
                  <HelpOutline />
              </Tooltip>     */}
          </FormGroup>

          
  

        </Box> 
        </Grid>
           
        <Grid item xs={6}>
          <Box>
          {/* if (!deposits) return null; */}


    {/* <div>
      <h1>{deposits.title}</h1>
      <p>{deposits.description}</p>
    </div> */}
            </Box>
        </Grid>
      </Grid>
      </StyledEngineProvider>
    </>
    )};

export default DepositCalc;