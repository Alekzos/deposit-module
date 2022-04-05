import React from "react";
import { useEffect, useState, useMemo, useCallback } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

import { getUsers } from "../../api/userAPI";
import { getApplications, patchApplication } from "../../api/applicationAPI";

import orderBy from "lodash/orderBy";

import { filterApplications } from "./utils";
import { getUserLogin, isAdmin } from "../Login/utils";

import { IApplication, IUser, IProduct } from "../../data/types";

import { DocStatus } from "../Application/consts";
import { headCells } from "./consts";
import { userRoles } from "../Login/consts";
import { userInitialValue } from "../../pages/Login/consts";

import { FilterApplicationsComponent } from "./components/FilterApplications";
import { ApplicationRow } from "./components/ApplicationRow";
import { Spinner } from "../../components/Spinner/Spinner";

type Order = "asc" | "desc";

export const ApplicationList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<void | IApplication[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderByColumn, setOrderByColumn] = useState<string>("id");
  const [user, setUser] = useState<IUser>(userInitialValue);

  //получить данные пользователя
  useEffect(() => {
    const getUserList = async () => {
      const response = await getUsers();
      const user = (response || []).filter(
        (user) => user.login === getUserLogin()
      );
      setUser(user[0]);
    };
    setIsLoading(true);
    getUserList();
    setIsLoading(false);
  }, []);

  //получить заявки и отфильтровать в зависимости от пользователя
  useEffect(() => {
    const getApplicationList = async () => {
      const response = await getApplications();
      if (user.role === userRoles.user) {
        const applications = (response || []).filter(
          (application) => application.inn === user.inn
        );
        setApplications(applications);
      }
      if (user.role === userRoles.admin) {
        const applications = (response || []).filter(
          (application) =>
            application.applicationStatus === DocStatus.UNDER_CONSIDERATION
        );
        setApplications(applications);
      }
    };
    setIsLoading(true);
    getApplicationList();
    setIsLoading(false);
  }, [user]);

  //изменить статус заявки
  const changeApplicationStatus = (id: number, newStatus: DocStatus) => {
    patchApplication(Number(id), newStatus);

    const ChangedApplication = (applications || []).map(
      (application: IApplication) => {
        if (application.id === id) {
          application.applicationStatus = newStatus;
        }
        return application;
      }
    );
    setApplications(ChangedApplication);
  };

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

  const sortApplications = (headerCellName: string) => {
    setOrderByColumn(headerCellName);
    order === "asc" ? setOrder("desc") : setOrder("asc");
    setHeadCellName(headerCellName);
  };

  const sort = (headerCellName: string | keyof IProduct) => {
    // if (filteredApplications && headerCellName) {
    //   console.log(filteredApplications[0].product[headerCellName]);
    // }
    // let name = "title";
    // console.log(filteredApplications[0].product["title"]);

    // if (filteredApplications && headerCellName) {
    //   let headCell: keyof IProduct = "title";
    //   console.log(filteredApplications[0].product[headCell]);
    // }
    console.log("сортируем");
    //вместо того, что ниже, хочу сделать проверку типа:
    //if(filteredApplications[0].product[headCell])
    //но ТС не дает
    if (
      headerCellName === "title" ||
      headerCellName === "selectedDepositSum" ||
      headerCellName === "interestRate"
    ) {
      filteredApplications = orderBy(
        filteredApplications,
        (item) => item.product[headerCellName],
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

  useMemo(() => {
    sort(headCellName);
  }, [orderByColumn, order]);

  const renderApplicationList = (
    <React.Fragment>
      <Typography variant="h1">Список депозитных заявок</Typography>
      {/* скрыть форму поиска не для админов */}
      {isAdmin() ? (
        <FilterApplicationsComponent
          fioSearch={fioSearch}
          accountSearch={accountSearch}
          currencySearch={currencySearch}
          innSearch={innSearch}
          handleChange={handleChange}
        />
      ) : null}

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
                changeApplicationStatus={changeApplicationStatus}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );

  return (
    <div className="applicationList">
      {isLoading ? <Spinner /> : renderApplicationList}
    </div>
  );
};
