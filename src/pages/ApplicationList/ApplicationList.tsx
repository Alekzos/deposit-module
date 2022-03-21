import React from "react";

import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { getApplications } from "../../api/api";
console.log(getApplications());
export const ApplicationList = () => {
  return (
    <div className="applicationList">
      Список депозитных заявок - клиент и сотрудник банка сотрудник - получает
      список и видит от всех клиентов и 2 кнопочки справа подтвердить и
      отклонить, статус открыт, либо отклонен Таблица с поиском, сортировкой и
      фильтрацией Сверху табы для отображения заявок в нужном статусе Столбцы
      Дата создания Название продукта Сумма и валюта Срок действия (до какого
      числа) Статус По клику на строку отображается детальная информация для
      строки - ставка - опции - ссылка для перехода на страницу депозитной
      заявки
    </div>
  );
};
