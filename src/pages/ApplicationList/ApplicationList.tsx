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

export const ApplicationList = () => {
  const [applications, setApplications] = useState<void | IApplication[]>([]);

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

  const filteredApplications = filterApplications(
    applications,
    fioSearch,
    accountSearch,
    currencySearch
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
  };

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
        handleChange={handleChange}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>№</TableCell>
              <TableCell>Дата создания</TableCell>
              <TableCell>Срок действия</TableCell>
              <TableCell>Наименование вклада</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Ставка (%)</TableCell>
              <TableCell>Статус</TableCell>
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
