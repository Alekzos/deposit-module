import React from "react";

import { useState } from "react";

import { ApplicationStatus } from "./ApplicationStatus";
import { ChangeApplicationStatusList } from "./ChangeApplicationStatus";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAlt from "@mui/icons-material/ThumbDownOffAlt";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";

import { IApplication, IUser } from "../../../data/types";

import { numberWithSpaces } from "../../../utils/utils";
import { Currencies } from "../../../data/consts";
import { userRoles } from "../../Login/consts";

export const ApplicationRow = (props: {
  application: IApplication;
  user: IUser;
}) => {
  const [open, setOpen] = useState(false);

  const { application, user } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell scope="row">{application.id}</TableCell>
        <TableCell scope="row">
          {new Date(
            Date.parse(application.applicationDate)
          ).toLocaleDateString()}
        </TableCell>
        <TableCell>
          {new Date(
            Date.parse(application.expirationDate)
          ).toLocaleDateString()}
        </TableCell>
        <TableCell scope="row">{application.product.title}</TableCell>
        <TableCell scope="row">
          {numberWithSpaces(application.product.selectedDepositSum)}{" "}
          {application.product.currency === Currencies.rub ? "₽" : "$"}
        </TableCell>
        <TableCell scope="row">
          {application.product.effectiveInterestRate
            ? application.product.effectiveInterestRate
            : application.product.interestRate}
        </TableCell>
        <ApplicationStatus application={application} />

        {user.role === userRoles.admin ? (
          <ChangeApplicationStatusList application={application} />
        ) : (
          ""
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ФИО</TableCell>
                  <TableCell>Счет</TableCell>
                  <TableCell>ИНН</TableCell>
                  <TableCell>Досрочное расторжение</TableCell>
                  <TableCell>Частичное снятие и пополнение</TableCell>
                  <TableCell>Капитализация</TableCell>
                  <TableCell>Срок (дней)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {application.surname} {application.name}{" "}
                    {application.patronymic}
                  </TableCell>
                  <TableCell>{application.account}</TableCell>
                  <TableCell>{application.inn}</TableCell>

                  <TableCell>
                    {application.product.earlyTermination ? "да" : "нет"}
                  </TableCell>
                  <TableCell>
                    {application.product.withdrawals ? "да" : "нет"}
                  </TableCell>
                  <TableCell>
                    {application.product.effectiveInterestRate ? "да" : "нет"}
                  </TableCell>
                  <TableCell>
                    {application.product.selectedDepositTerm}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
