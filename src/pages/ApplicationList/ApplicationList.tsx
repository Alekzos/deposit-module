import React from "react";

import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { IApplication } from "../../data/types";
import { getApplications } from "../../api/api";
import { filterApplications } from "./FilterApplications/filterApplications";
import { FilterApplicationsComponent } from "./FilterApplications/FilterApplicationsComponent";
import { ApplicationRow } from "./ApplicationRow";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { alpha } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import { headCells } from "../../data/consts";
type Order = "asc" | "desc";

export const ApplicationList = () => {
  const [applications, setApplications] = useState<void | IApplication[]>([]);
  const [order, setOrder] = useState<Order>("asc");

  const getApplicationList = async () => {
    let response = await getApplications();
    setApplications(response);
  };

  useEffect(() => {
    getApplicationList();
  }, []);

  const [fioSearch, setFioSearch] = useState<string>("");
  const [accountSearch, setAccountSearch] = useState<string>("");
  const [currencySearch, setCurrencySearch] = useState<string>("");
  const [innSearch, setInnSearch] = useState<string>("");

  const filteredApplications = filterApplications(
    applications,
    fioSearch,
    accountSearch,
    currencySearch,
    innSearch
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "fioSearch") {
      setFioSearch(e.target.value);
    }
    if (e.target.name === "accountSearch") {
      setAccountSearch(e.target.value);
    }
    if (e.target.name === "currencySearch") {
      setCurrencySearch(e.target.value);
    }
    if (e.target.name === "innSearch") {
      setInnSearch(e.target.value);
    }
  };

  // const sortApplications = (
  //   event: React.MouseEvent<HTMLTableCellElement> | null
  // ) => {
  //   console.log(111);
  // };

  // const createSortHandler =
  //   (property: keyof IApplication) => (event: React.MouseEvent<unknown>) => {
  //     onRequestSort(event, property);
  //   };

  return (
    <div className="applicationList">
      <Typography variant="h1">Список депозитных заявок</Typography>
      <div>
        клиент и сотрудник банка сотрудник - получает список и видит от всех
        клиентов и 2 кнопочки справа подтвердить и отклонить, статус открыт,
        либо отклонен Таблица с поиском, сортировкой и фильтрацией Сверху табы
        для отображения заявок в нужном статусе Столбцы Дата создания Название
        продукта Сумма и валюта Срок действия (до какого числа) Статус По клику
        на строку отображается детальная информация для строки - ставка - опции
        - ссылка для перехода на страницу депозитной заявки
      </div>

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

      {/* <FilterApplicationsComponent
        fioSearch={fioSearch}
        accountSearch={accountSearch}
        currencySearch={currencySearch}
        handleChange={handleChange}
      /> */}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />

              {headCells.map((headCell) => (
                <TableCell key={headCell.name}>
                  <TableSortLabel
                  // active={orderBy === headCell.name}
                  // direction={orderBy === headCell.name ? order : "asc"}
                  // onClick={createSortHandler()}
                  >
                    {headCell.label}
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                    {/* {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null} */}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(filteredApplications || []).map((application) => (
              <ApplicationRow key={application.id} application={application} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
