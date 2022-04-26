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

import { getUser } from "../../api/userAPI";
import { getApplications, patchApplication } from "../../api/applicationAPI";

import orderBy from "lodash/orderBy";

import { filterApplications } from "./utils";
import { isAdmin } from "../Login/utils";

import { IApplication } from "../../pages/Application/types";
import { IProduct } from "../../pages/ProductSelection/types";
import { IUser } from "../../pages/Login/types";

import { DocStatus } from "../Application/consts";
import { headCells, searchFields, productFields } from "./consts";
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
    setIsLoading(true);
    getUser().then((res) => setUser(res[0]));
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
  const changeApplicationStatus = useCallback(
    (id: number, newStatus: DocStatus) => {
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
    },
    [applications]
  );

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
    if (e.target.name === searchFields.fioSearch) {
      setFioSearch(e.target.value);
    }
    if (e.target.name === searchFields.accountSearch) {
      setAccountSearch(e.target.value);
    }
    if (e.target.name === searchFields.currencySearch) {
      setCurrencySearch(e.target.value);
    }
    if (e.target.name === searchFields.innSearch) {
      setInnSearch(e.target.value);
    }
  };

  const sortApplications = (headerCellName: string) => {
    setOrderByColumn(headerCellName);
    order === "asc" ? setOrder("desc") : setOrder("asc");
    setHeadCellName(headerCellName);
  };

  const sort = (headerCellName: string | keyof IProduct) => {
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
      {isAdmin() && (
        <FilterApplicationsComponent
          fioSearch={fioSearch}
          accountSearch={accountSearch}
          currencySearch={currencySearch}
          innSearch={innSearch}
          handleChange={handleChange}
        />
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
                    {orderByColumn === headCell.name && (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "отсортировано по убыванию"
                          : "отсортировано по возрастанию"}
                      </Box>
                    )}
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
