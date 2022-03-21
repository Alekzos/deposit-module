import React from "react";
import { useState } from "react";
import "../../styles/Login.css";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";

import { IUser, IUserLogin } from "../../data/types";
import { checkUserLogin, checkUserPassword } from "../../utils/checkUserLogin";
import { getUsers } from "../../api/api";
import { pageURLs } from "../../data/consts";

export const LoginPage = () => {
  const [values, setValues] = useState<IUserLogin>({
    login: "",
    password: "",
    showPassword: false,
  });

  const [loginErrMessage, setLoginErrMessage] = useState<string>("");
  const [passwordErrMessage, setPasswordErrMessage] = useState<string>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);
  let navigate = useNavigate();

  //получение пользователей и фильтрация по выбранному
  const auth = async () => {
    let users = await getUsers();

    let TheUserData: IUser[] = (users || []).filter(
      (user) => user.login === values.login
    );

    //вывести ошибку в логине если есть
    setLoginErrMessage(checkUserLogin(TheUserData, values));

    //вывести ошибку в пароле если есть, если нет, тогда перенаправить на страницу калькулятора
    if (checkUserPassword(TheUserData, values) === "ok") {
      setPasswordErrMessage("");
      setIsLogged(true);

      sessionStorage.setItem("login", TheUserData[0].login);
      sessionStorage.setItem("isLogged", JSON.stringify(isLogged));
      sessionStorage.setItem("name", TheUserData[0].name);
      sessionStorage.setItem("surname", TheUserData[0].surname);
      sessionStorage.setItem("patronymic", TheUserData[0].patronymic);
      sessionStorage.setItem("inn", TheUserData[0].inn);

      sessionStorage.setItem(
        "accounts",
        JSON.stringify(TheUserData[0].accounts)
      );
      sessionStorage.setItem("hideCalcPage", "0");
      sessionStorage.setItem("hideApplicationPage", "1");

      navigate(pageURLs.productSelectionPage);
    } else {
      setPasswordErrMessage(checkUserPassword(TheUserData, values));
    }
  };

  const handleChange =
    (prop: keyof IUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="loginPage">
      <Box className="loginPageTitle">
        <Typography variant="h1">Авторизация</Typography>
        <Typography paragraph>введите логин и пароль</Typography>
      </Box>
      <Box
        className="loginForm"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexFlow: "column",
          m: "auto",
        }}
      >
        <TextField
          helperText={loginErrMessage}
          label="Логин"
          required
          focused
          value={values.login}
          onChange={handleChange("login")}
          id="outlined-start-adornment"
          sx={{ m: 1, width: "35ch" }}
        />

        <FormControl required sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText error>{passwordErrMessage}</FormHelperText>
        </FormControl>
        <Button
          variant="outlined"
          sx={{ m: 1 }}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            auth();
          }}
        >
          Войти
        </Button>
      </Box>
    </div>
  );
};
