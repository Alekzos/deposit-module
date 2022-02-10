import React from "react";

import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Tooltip } from '@mui/material';
import HelpOutline from '@mui/icons-material/HelpOutline';

import {numberWithSpaces} from './utils';


interface SliderWithTextFieldProps {
    Currency?: any,
    currency?:string,
    days?:boolean,
    step: number,
    min: number,
    max: number,
    value: number,
    caption:string,
    handleInputChange?: any,
    handleSliderChange?: any,
}

const SliderWithTextField: React.FC<SliderWithTextFieldProps> = (
    {caption, Currency, currency, days, step, min, max, value, handleInputChange, handleSliderChange}) => {
               

        //метки для бегунка с датами
        const marksSliderDepositTerm = [
            {
                value: 1,
                label: '1 день',
            },
            {
                value: 180,
                label: 'Полгода',
            },
            {
                value: 365,
                label: '1 год',
            },
            {
                value: 548,
                label: '1.5 года',
            },
            {
                value: 730,
                label: '2 года',
            },
            {
                value: 913,
                label: '2.5 года',
            },
            {
                value: 1095,
                label: '3 года',
            },
        ];

        //метки для бегунка с валютой
        const marksSliderDeposit = [
            {
                value: 0,
                label: `0 ${(currency === Currency.rub? '₽' : '$')}`,
            },
            {
                value: 100000000,
                label: `∞ ${(currency === Currency.rub? '₽' : '$')}`,
            },
            ];
        
            
  
    return(
        <Box>         
            <Typography variant='caption'>{caption}</Typography>  

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
              onChange={handleInputChange}
              inputProps={{
                step: {step},
                min: {min},
                'aria-labelledby': 'input-slider',
              }}
              InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                    {(days)? "дней"  : (currency === Currency.rub? '₽' : '$')} 

                    {(days)? 
                    <Tooltip title="Информация о сроках">
                       <HelpOutline />
                    </Tooltip> : ''}  
                 </InputAdornment>,


            }}

            /> 

            {/* бегунок */}
            <Slider
              value={value}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              min={min}
              max = {max}
              step= {step}
              valueLabelFormat={
              (days)? value + ' дней' : 
              numberWithSpaces(value) + (currency === Currency.rub? ' ₽' : ' $')
              } 
              valueLabelDisplay="auto"
              marks={
                (days)? marksSliderDepositTerm : marksSliderDeposit
                }   
            />
        </Box>
    )
}
export default SliderWithTextField