import React from "react";

import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Tooltip } from "@mui/material";
import HelpOutline from "@mui/icons-material/HelpOutline";

import { numberWithSpaces, declOfNum } from "../../../utils/utils";
import { Currencies, declensionsDays } from "../../../data/consts";
import { marksSliderDepositTerm } from "../const";
import { ISliderWithTextFieldProps } from "../types";

const SliderWithTextField: React.FC<ISliderWithTextFieldProps> = ({
  caption,
  currency,
  days,
  step,
  min,
  max,
  value,
  // handleInputChange,
  handleSliderChange,
}) => {
  //метки для бегунка с валютой
  const marksSliderDeposit = [
    {
      value: min,
      label: `0 ${currency === Currencies.rub ? "₽" : "$"}`,
    },
    {
      value: max,
      label: `∞ ${currency === Currencies.rub ? "₽" : "$"}`,
    },
  ];

  return (
    <Box>
      <Typography variant="caption">{caption}</Typography>

      <TextField
        name={days ? "termInput" : "depositInput"}
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
        onChange={handleSliderChange}
        inputProps={{
          step: { step },
          min: { min },
          "aria-labelledby": "input-slider",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {days
                ? declOfNum(value, declensionsDays)
                : currency === Currencies.rub
                ? "₽"
                : "$"}
              {days ? (
                <Tooltip title="Информация о сроках">
                  <HelpOutline />
                </Tooltip>
              ) : (
                ""
              )}
            </InputAdornment>
          ),
        }}
      />

      {/* бегунок */}
      <Slider
        name={days ? "termSlider" : "depositSlider"}
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        min={min}
        max={max}
        step={step}
        valueLabelFormat={
          days
            ? declOfNum(value, ["день", "дня", "дней"])
            : numberWithSpaces(value) +
              (currency === Currencies.rub ? " ₽" : " $")
        }
        valueLabelDisplay="auto"
        marks={days ? marksSliderDepositTerm : marksSliderDeposit}
      />
    </Box>
  );
};
export default SliderWithTextField;
