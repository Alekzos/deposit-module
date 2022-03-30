import React from "react";

import { useEffect, useState } from "react";

import orderBy from "lodash/orderBy";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { IApplication, IUser } from "../../data/types";
import { getApplications, getUsers } from "../../api/api";
import { filterApplications } from "./utils";
import { FilterApplicationsComponent } from "./components/FilterApplications";
import { ApplicationRow } from "./components/ApplicationRow";
import { applicationStatuses } from "../Application/consts";
import { userRoles } from "../Login/consts";

import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";

import { visuallyHidden } from "@mui/utils";

import { headCells } from "./consts";
import { userInitialValue } from "../../data/consts";
type Order = "asc" | "desc";

export const ApplicationList = () => {
  const [applications, setApplications] = useState<void | IApplication[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderByColumn, setOrderByColumn] = useState<string>("id");
  const [user, setUser] = useState<IUser>(userInitialValue);

  //получить данные пользователя
  useEffect(() => {
    const getUserList = async () => {
      let response = await getUsers();
      const user = (response || []).filter(
        (user) => user.login === sessionStorage.getItem("login")
      );
      setUser(user[0]);
    };
    getUserList();
  }, []);

  //получить заявки и отфильтровать в зависимости от пользователя
  useEffect(() => {
    const getApplicationList = async () => {
      let response = await getApplications();
      if (user.role === userRoles.user) {
        let applications = (response || []).filter(
          (application) => application.inn === user.inn
        );
        setApplications(applications);
      }
      if (user.role === userRoles.admin) {
        let applications = (response || []).filter(
          (application) => application.applicationStatus !== 0
        );
        setApplications(applications);
      }
    };
    getApplicationList();
  }, [user]);

  const [fioSearch, setFioSearch] = useState<string>("");
  const [accountSearch, setAccountSearch] = useState<string>("");
  const [currencySearch, setCurrencySearch] = useState<string>("");
  const [innSearch, setInnSearch] = useState<string>("");
  const [headCellName, setHeadCellName] = useState<string>("");

  let filteredApplications = filterApplications(
    applications,
    fioSearch,
    accountSearch,
    currencySearch,
    innSearch,
    user
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

  const sortApplications = (headCellName: string) => {
    setOrderByColumn(headCellName);
    order === "asc" ? setOrder("desc") : setOrder("asc");
    setHeadCellName(headCellName);
  };

  const sort = (headCellNa: string) => {
    //надо будет поправить, сделать проверку, что тайтл вложенный элемент,
    //но почему-то работает через раз, а тайспскрипт всегда выдает ошибку
    // if (filteredApplications[0].product[headCellNa]) {
    //   filteredApplications = orderBy(
    //     filteredApplications,
    //     (item) => item.product[headCellNa],
    //     order
    //   );

    if (
      headCellNa === "title" ||
      headCellNa === "selectedDepositSum" ||
      headCellNa === "interestRate"
    ) {
      filteredApplications = orderBy(
        filteredApplications,
        (item) => item.product[headCellNa],
        order
      );
    } else {
      filteredApplications = orderBy(
        filteredApplications,
        [headCellName],
        order
      );
    }
  };

  sort(headCellName);

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

      {/* скрыть форму поиска не для админов */}
      {sessionStorage.getItem("role") === userRoles.admin ? (
        <FilterApplicationsComponent
          fioSearch={fioSearch}
          accountSearch={accountSearch}
          currencySearch={currencySearch}
          innSearch={innSearch}
          handleChange={handleChange}
        />
      ) : (
        ""
      )}

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.name}
                  sortDirection={
                    orderByColumn === headCell.name ? order : false
                  }
                >
                  <TableSortLabel
                    active={orderByColumn === headCell.name}
                    direction={orderByColumn === headCell.name ? order : "asc"}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      sortApplications(headCell.name);
                    }}
                  >
                    {headCell.label}
                    {orderByColumn === headCell.name ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "отсортировано по убыванию"
                          : "отсортировано по возрастанию"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(filteredApplications || []).map((application) => (
              <ApplicationRow
                key={application.id}
                user={user}
                application={application}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
