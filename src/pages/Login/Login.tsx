import React from "react";
import { useState } from "react";
import "../../styles/Login.css";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";

import axios from "axios";
import { IUser } from "../../data/types";

import { userDataURL } from "../../data/consts";

export const LoginPage = () => {
  const [values, setValues] = useState<IUser>({
    login: "",
    password: "",
    showPassword: false,
  });

  //получение списка пользователей
  const getUsers = async (userDataURL: string) => {
    let users = await axios
      .get<IUser[]>(userDataURL)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    //console.log(users);
  };

  const fetchData = async (userDataURL: string) => {
    let response = await getUsers(userDataURL);
    console.log(response);
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexFlow: "column",
          m: "auto",
        }}
      >
        <TextField
          label="Логин"
          required
          focused
          value={values.login}
          onChange={handleChange("login")}
          id="outlined-start-adornment"
          sx={{ m: 1, width: "35ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
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
        </FormControl>
        <Button
          variant="outlined"
          sx={{ m: 1 }}
          // onClick={fetchData(us)}

          onClick={(event: React.MouseEvent<HTMLElement>) => {
            fetchData(userDataURL);
          }}
        >
          Войти
        </Button>
      </Box>
    </div>
  );
};
