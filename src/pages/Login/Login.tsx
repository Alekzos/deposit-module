import React from "react";
import { useState } from "react";

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
import { getUsers } from "../../api/userAPI";
import { pageURLs } from "../../data/consts";
import { userRoles } from "./consts";
import { setUsertoSessionStorage } from "./utils";
import { useAppDispatch } from "../../redux/hooks";
import { selectUserSlice } from "../../redux/userReducer";

export const LoginPage = () => {
  const [values, setValues] = useState<IUserLogin>({
    login: "",
    password: "",
    showPassword: false,
  });

  const [loginErrMessage, setLoginErrMessage] = useState<string>("");
  const [passwordErrMessage, setPasswordErrMessage] = useState<string>("");

  const dispatch = useAppDispatch();
  const { setUser } = selectUserSlice.actions;

  const navigate = useNavigate();

  //получение пользователей и фильтрация по выбранному
  const auth = async () => {
    const users = await getUsers();

    const TheUserData: IUser[] = (users || []).filter(
      (user) => user.login === values.login
    );

    //вывести ошибку в логине если есть
    setLoginErrMessage(checkUserLogin(TheUserData, values));

    //вывести ошибку в пароле если есть, если нет, тогда перенаправить на страницу калькулятора
    if (checkUserPassword(TheUserData, values) === "ok") {
      setPasswordErrMessage("");
      setUsertoSessionStorage(TheUserData[0].login, TheUserData[0].role);
      dispatch(setUser(TheUserData[0]));

      //если админ, то редиректить на страницу заявок
      TheUserData[0].role === userRoles.user
        ? navigate(pageURLs.productSelectionPage)
        : navigate(pageURLs.applicationList);
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
