import React from "react";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { pageURLs } from "../data/consts";
import { getUserLogin, onLogout } from "../pages/Login/utils";

export const LogoutButton = () => {
  let navigate = useNavigate();
  const logout = () => {
    navigate(pageURLs.homePage);
    onLogout();
  };

  return (
    <React.Fragment>
      {getUserLogin() ? (
        <Button
          onClick={() => logout()}
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        >
          Выйти
        </Button>
      ) : null}
    </React.Fragment>
  );
};
