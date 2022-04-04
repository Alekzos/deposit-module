import React from "react";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import { IApplication, IUser } from "../../data/types";
import { getUsers } from "../../api/userAPI";
import {
  addApplication,
  getApplications,
  patchApplication,
} from "../../api/applicationAPI";

import { Spinner } from "../../components/Spinner/Spinner";
import { useAppSelector } from "../../redux/hooks";
import { ApplicationForm } from "./components/ApplicationForm";

import { pageURLs } from "../../data/consts";
import { userInitialValue } from "../Login/consts";
import { DocStatus } from "./consts";
import { convertCompilerOptionsFromJson } from "typescript";

export const Application = () => {
  let { selectedProduct } = useAppSelector((state) => state.productReducer);
  const { selectedUser } = useAppSelector((state) => state.userReducer);
  const [product, setProduct] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const isEdit = () => (searchParams.get("q") === "edit" ? true : false);
  const isNew = () => (applicationId === "new" ? true : false);

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

  //если заявка новая - взять данные о продукте с калькулятора,
  //иначе взять айди заявки и получить данные по ней
  useEffect(() => {
    if (isNew()) {
      setIsLoading(false);
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
      setIsLoading(true);
      getApplicationList();
      setIsLoading(false);
    }
  }, [selectedUser]);

  const postApllication = (action?: string) => {
    //по умолчанию отпраляет на рассмотрение
    let applicationStatus = DocStatus.UNDER_CONSIDERATION;
    if (action === "toDraft") {
      applicationStatus = DocStatus.DRAFT;
    }

    if (isNew()) {
      addApplication(product, user, account, applicationStatus);
    } else {
      patchApplication(Number(applicationId), applicationStatus, account);
    }
  };

  //  новая заявка и нет счета - скрыть тру
  //  редактирование и нет счета - скрыть тру
  //  редактирвоание и есть счет-  показать фолс
  //  просмотр - скрыть тру

  const isDisabled = () => {
    let disabled = true;

    if (account && isEdit()) {
      disabled = false;
    }
    if (account && isNew()) {
      disabled = false;
    }

    if (!isNew() && !isEdit()) {
      disabled = true;
    }

    // if (account && isNew()) {
    //   disabled = true;
    // }

    return disabled;
  };

  const renderApplication = (
    <React.Fragment>
      <ApplicationForm
        product={product}
        user={user}
        account={account}
        handleChange={handleChange}
      />
      {isNew() || isEdit() ? (
        <Box>
          <Button
            variant="contained"
            component={Link}
            sx={{ mr: 2 }}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              postApllication();
            }}
            disabled={isDisabled()}
            to={pageURLs.applicationList}
          >
            Отправить
          </Button>

          <Button
            disabled={isDisabled()}
            variant="outlined"
            component={Link}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              postApllication("toDraft");
            }}
            to={pageURLs.applicationList}
          >
            в черновик
          </Button>
        </Box>
      ) : null}
    </React.Fragment>
  );
  return (
    <div className="application">
      {isLoading ? <Spinner /> : renderApplication}
    </div>
  );
};
