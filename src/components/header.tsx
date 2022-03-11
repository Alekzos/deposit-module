import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";

import { useNavigate } from "react-router-dom";
import { pageURLs } from "../data/consts";

export const Header = () => {
  let navigate = useNavigate();

  const Logout = (event: React.MouseEvent<HTMLElement>) => {
    sessionStorage.clear();
    navigate(pageURLs.homePage);
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link className="logo" href={pageURLs.homePage}>
              Логотип
            </Link>
          </Typography>

          <nav>
            {sessionStorage.getItem("isLogged") &&
            sessionStorage.getItem("hideCalcPage") !== "1" &&
            window.location.pathname !== pageURLs.productSelectionPage &&
            window.location.pathname !== pageURLs.homePage ? (
              <Link
                variant="button"
                color="text.primary"
                href={pageURLs.productSelectionPage}
                sx={{ my: 1, mx: 1.5 }}
              >
                Подобрать депозит
              </Link>
            ) : (
              ""
            )}

            {sessionStorage.getItem("isLogged") &&
            sessionStorage.getItem("hideApplicationPage") !== "1" &&
            window.location.pathname !== pageURLs.applicationPage &&
            window.location.pathname !== pageURLs.homePage ? (
              <Link
                variant="button"
                color="text.primary"
                href={pageURLs.applicationPage}
                sx={{ my: 1, mx: 1.5 }}
              >
                Оформить заявку
              </Link>
            ) : (
              ""
            )}

            {sessionStorage.getItem("isLogged") ? (
              <Link
                variant="button"
                color="text.primary"
                href={pageURLs.applicationList}
                sx={{ my: 1, mx: 1.5 }}
              >
                Список заявок
              </Link>
            ) : (
              ""
            )}
          </nav>

          {sessionStorage.getItem("isLogged") ? (
            <Button
              onClick={Logout}
              href="#"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              Выйти
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
