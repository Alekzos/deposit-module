import React from "react";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




  // interface State {
  //   amount: string;
  //   password: string;
  //   weight: string;
  //   weightRange: string;
  //   showPassword: boolean;
  // }
  
  // export const LoginPage = () => {
  //   const [values, setValues] = React.useState<State>({
  //     amount: '',
  //     password: '',
  //     weight: '',
  //     weightRange: '',
  //     showPassword: false,
  //   });
  
  //   const handleChange =
  //     (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //       setValues({ ...values, [prop]: event.target.value });
  //     };
  
  //   const handleClickShowPassword = () => {
  //     setValues({
  //       ...values,
  //       showPassword: !values.showPassword,
  //     });
  //   };
  
  //   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     event.preventDefault();
  //   };

export const LoginPage = () => {
  return (
    <div className="loginPage">
        Логин
    </div>
  );
}

