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
      let response = await getUsers();
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
      let response = await getApplications();
      if (user.role === userRoles.user) {
        let applications = (response || []).filter(
          (application) => application.inn === user.inn
        );
        console.log("до сета");
        console.log(applications);
        setApplications(applications);
        console.log("после сета");
        console.log(applications);
      }
      if (user.role === userRoles.admin) {
        let applications = (response || []).filter(
          (application) => application.applicationStatus !== DocStatus.DRAFT
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

  const sortApplications = (headCellName: string) => {
    setOrderByColumn(headCellName);
    order === "asc" ? setOrder("desc") : setOrder("asc");
    setHeadCellName(headCellName);
  };

  const sort = (headCellNa: string) => {
    //что-то не так с типами
    // if (filteredApplications && headCellNa) {
    //   console.log(filteredApplications[0].product[headCellNa]);
    // }
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
