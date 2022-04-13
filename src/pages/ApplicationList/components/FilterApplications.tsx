import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { searchFields, searchFieldsLabel } from "../consts";

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
    <Box sx={{ display: "flex" }}>
      <TextField
        sx={{ mr: 2 }}
        label={searchFieldsLabel.fioSearch}
        name={searchFields.fioSearch}
        value={fioSearch}
        onChange={handleChange}
      />
      <TextField
        sx={{ mr: 2 }}
        label={searchFieldsLabel.accountSearch}
        name={searchFields.accountSearch}
        value={accountSearch}
        onChange={handleChange}
      />
      <TextField
        sx={{ mr: 2 }}
        label={searchFieldsLabel.innSearch}
        name={searchFields.innSearch}
        value={innSearch}
        onChange={handleChange}
      />

      <FormControl sx={{ mt: 1 }}>
        <RadioGroup
          value={currencySearch}
          onChange={handleChange}
          row
          aria-labelledby={searchFieldsLabel.currencySearch}
          name={searchFields.currencySearch}
        >
          <FormControlLabel value="" control={<Radio />} label="Все" />
          <FormControlLabel value="rub" control={<Radio />} label="₽" />
          <FormControlLabel value="usd" control={<Radio />} label="$" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
