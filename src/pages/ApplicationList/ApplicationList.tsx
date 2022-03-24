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
import TableSortLabel from "@mui/material/TableSortLabel";

import { visuallyHidden } from "@mui/utils";

import { headCells } from "../../data/consts";
type Order = "asc" | "desc";

export const ApplicationList = () => {
  const [applications, setApplications] = useState<void | IApplication[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("id");

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

  let filteredApplications = filterApplications(
    applications,
    fioSearch,
    accountSearch,
    currencySearch,
    innSearch
  );

  //для поиска
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

  //запуск сортировки
  const createSortHandler = (headCellName: string) => {
    setOrderBy(headCellName);
    order === "asc" ? setOrder("desc") : setOrder("asc");
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  //сортировка числовых значений
  filteredApplications = filteredApplications
    .slice()
    .sort(getComparator(order, "id"));

  //сортировка продукта значений
  // filteredApplications = filteredApplications
  //   .slice()
  //   .sort(getComparator(order, filteredApplications.product.title));

  // console.log(filteredApplications);
  // filteredApplications = filteredApplications.sort(getComparator(order, "id"));

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

      <FilterApplicationsComponent
        fioSearch={fioSearch}
        accountSearch={accountSearch}
        currencySearch={currencySearch}
        innSearch={innSearch}
        handleChange={handleChange}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />

              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.name}
                  sortDirection={orderBy === headCell.name ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.name}
                    direction={orderBy === headCell.name ? order : "asc"}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      createSortHandler(headCell.name);
                    }}
                  >
                    {headCell.label}
                    {orderBy === headCell.name ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
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
