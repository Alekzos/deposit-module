import React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { IApplication, IProduct, IUser } from "../../data/types";
import {
  addApplication,
  getApplications,
  getUsers,
  patchApplication,
} from "../../api/api";

import { pageURLs, userInitialValue } from "../../data/consts";
import { applicationStatuses } from "./consts";

import { useParams } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import { ApplicationForm } from "./components/ApplicationForm";

export const Application = () => {
  let { selectedProduct } = useAppSelector((state) => state.productReducer);
  const { selectedUser } = useAppSelector((state) => state.userReducer);

  const [product, setProduct] = useState<any>([]);

  const navigate = useNavigate();

  //выбор счета
  const [account, setAccount] = useState<string | undefined>();
  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value as string);
  };

  let { applicationId } = useParams();
  const [application, setApplication] = useState<void | IApplication>();

  //так как запрос асинхронный, то форма при дестуктуризации выдает ошибку undefined,
  //для решения этого поставил пустые значения по умолчанию в  userInitialValue
  const [user, setUser] = useState<IUser>(userInitialValue);
  // const [applicationStatus, setApplicationStatus] = useState<number>(0);
  //если заявка новая - взять данные о продукте с калькулятора,
  //иначе взять айди заявки и получить данные по ней
  useEffect(() => {
    if (applicationId === "new") {
      setProduct(selectedProduct);
      setUser(selectedUser);
      setAccount(selectedUser.account);

      //если форма не заполнена (стор пуст), тогда редирект на выбор депозита.
      //признак пустоты стора - незаполненая валюта
      if (!selectedProduct.currency) {
        navigate(pageURLs.productSelectionPage);
      }
    } else {
      //выгрузка продукта и аккаунта из заявки
      const getApplicationList = async () => {
        let response = await getApplications();
        const application = (response || []).filter(
          (application) => application.id === Number(applicationId)
        );
        setApplication(application[0]);
        setProduct(application[0].product);
        setAccount(application[0].account);
        //выгрузка данных о юзере из заявки
        const getUserList = async () => {
          let response = await getUsers();
          const user = (response || []).filter(
            (user) => user.inn === application[0].inn
          );
          setUser(user[0]);
        };
        getUserList();
      };

      getApplicationList();
    }
  }, [selectedUser]);

  const postApllication = (action?: string) => {
    let applicationStatus = 0;
    if (applicationId === "new") {
      addApplication(product, user, account, applicationStatus);
    } else {
      if (action === "post") {
        // setApplicationStatus(1); //выдает 0, потому вернулся к "магии",
        patchApplication(
          Number(applicationId),
          (applicationStatus = 1),
          account
        );
      } else {
        patchApplication(
          Number(applicationId),
          (applicationStatus = 0),
          account
        );
      }
    }
  };

  return (
    <div className="application">
      <ApplicationForm
        product={product}
        user={user}
        account={account}
        handleChange={handleChange}
      />
      <Box>
        <Button
          variant="contained"
          component={Link}
          sx={{ mr: 2 }}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            postApllication("post");
          }}
          to={pageURLs.applicationList}
        >
          Отправить
        </Button>

        <Button
          variant="outlined"
          component={Link}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            postApllication();
          }}
          to={pageURLs.applicationList}
        >
          в черновик
        </Button>
      </Box>
    </div>
  );
};
