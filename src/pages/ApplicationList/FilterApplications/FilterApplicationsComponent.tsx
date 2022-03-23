import React from "react";

import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export const FilterApplicationsComponent = (
  fioSearch: any,
  accountSearch: any,
  currencySearch: any,
  handleChange: any
) => {
  return (
    <Box>
      <TextField
        label="найти фио"
        name="fioSearch"
        value={fioSearch}
        onChange={handleChange}
      />
      <TextField
        label="найти счет"
        name="accountSearch"
        value={accountSearch}
        onChange={handleChange}
      />

      <FormControl>
        <RadioGroup
          value={currencySearch}
          onChange={handleChange}
          row
          aria-labelledby="фильтр валюты"
          name="currencySearch"
        >
          <FormControlLabel value="" control={<Radio />} label="Все" />
          <FormControlLabel value="rub" control={<Radio />} label="₽" />
          <FormControlLabel value="usd" control={<Radio />} label="$" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
