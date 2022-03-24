import React, { FC } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

type Props = {
  fioSearch: string;
  accountSearch: string;
  currencySearch: string;
  innSearch: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FilterApplicationsComponent = ({
  fioSearch,
  accountSearch,
  currencySearch,
  innSearch,
  handleChange,
}: Props) => {
  return (
    <Box>
      <TextField
        label="поиск по фио"
        name="fioSearch"
        value={fioSearch}
        onChange={handleChange}
      />
      <TextField
        label="поиск по № счета"
        name="accountSearch"
        value={accountSearch}
        onChange={handleChange}
      />
      <TextField
        label="поиск по ИНН"
        name="innSearch"
        value={innSearch}
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
