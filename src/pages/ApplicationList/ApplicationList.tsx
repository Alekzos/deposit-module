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
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

import { IApplication } from "../../data/types";
import { getApplications } from "../../api/api";
import { numberWithSpaces } from "../../utils/utils";
import { Currencies } from "../../data/consts";

const Row = (props: { application: IApplication }) => {
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
        <TableCell scope="row">{application.date}</TableCell>
        <TableCell scope="row">{application.product.title}</TableCell>
        <TableCell scope="row">
          {numberWithSpaces(application.selectedDepositSum)}{" "}
          {application.product.currency === Currencies.rub ? "₽" : "$"}
        </TableCell>
        <TableCell scope="row">{application.selectedDepositTerm}</TableCell>
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
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const ApplicationList = () => {
  const [applications, setApplications] = useState<void | IApplication[]>([]);

  const getApplicationList = async () => {
    let response = await getApplications();
    setApplications(response);
  };

  useEffect(() => {
    getApplicationList();
  }, []);

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

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>№</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Наименование вклада</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Срок (дней)</TableCell>
              <TableCell>Ставка (%)</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(applications || []).map((application) => (
              <Row key={application.id} application={application} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
