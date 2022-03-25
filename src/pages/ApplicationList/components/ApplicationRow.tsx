import React from "react";

import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";

import { IApplication } from "../../../data/types";

import { numberWithSpaces } from "../../../utils/utils";
import { Currencies } from "../../../data/consts";

export const ApplicationRow = (props: { application: IApplication }) => {
  const [open, setOpen] = useState(false);

  const { application } = props;

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
        <TableCell scope="row">{application.applicationDate}</TableCell>
        <TableCell>{application.expirationDate}</TableCell>
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
        <TableCell scope="row">
          {application.applicationStatus ? "на рассмотрении" : "черновик"}
        </TableCell>
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
                  <TableCell>{application.selectedDepositTerm}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
