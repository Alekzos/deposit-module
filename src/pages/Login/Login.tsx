import React from "react";
import { useState } from "react";
import "../../styles/Login.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useLocation, NavLink } from "react-router-dom";
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

import axios from "axios";
import { IUser, IUserLogin } from "../../data/types";

import { userDataURL, loginErrMessages, pageURLs } from "../../data/consts";

export const LoginPage = () => {
  const [values, setValues] = useState<IUserLogin>({
    login: "",
    password: "",
    showPassword: false,
  });

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loginErrMessage, setLoginErrMessage] = useState<string>("");
  const [passwordErrMessage, setPasswordErrMessage] = useState<string>("");
  let navigate = useNavigate();

  //получение пользователей и фильтрация по выбранному
  const getUser = async (userDataURL: string) => {
    let users = await axios
      .get<IUser[]>(userDataURL)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(users);
    let TheUserData: IUser[] = (users || []).filter(
      (user) => user.login === values.login
    );

    checkUser(TheUserData);
  };

  //проверка пароля и логина и вывод сообщения
  const checkUser = (user: Array<IUser>) => {
    //если логин не введен
    if (!values.login) {
      setLoginErrMessage(loginErrMessages.loginEmpty);
    } else {
      //если введен, но не найден
      if (!user[0]) {
        setLoginErrMessage(loginErrMessages.LoginNotFound);
      } else {
        //введен и найден
        setLoginErrMessage("");
      }
    }

    //если пароль не введен
    if (!values.password) {
      setPasswordErrMessage(loginErrMessages.PasswordEmpty);
    } else {
      if (user.length > 0) {
        //если введен, но не совпадает
        if (values.password !== user[0].password) {
          setPasswordErrMessage(loginErrMessages.PasswordNotFound);
        } else {
          //все подошло
          setPasswordErrMessage("");

          setIsLogged(true);
          sessionStorage.setItem("login", user[0].login);
          sessionStorage.setItem("isLogged", JSON.stringify(isLogged));
          sessionStorage.setItem("accounts", JSON.stringify(user[0].accounts));

          sessionStorage.setItem("hideCalcPage", "0");
          sessionStorage.setItem("hideApplicationPage", "1");

          navigate(pageURLs.productSelectionPage);
        }
      } else {
        setPasswordErrMessage("");
      }
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

  //не оч понятно за чем это надо, взял из шаблона.
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
            getUser(userDataURL);
          }}
        >
          Войти
        </Button>
      </Box>
    </div>
  );
};
