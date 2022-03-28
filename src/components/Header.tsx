import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { pageURLs } from "../data/consts";
import { onLeavePage } from "../utils/utils";
import { userRoles } from "../pages/Login/consts";
import logo from "../styles/logoipsum-logo.svg";
import { Link as RouterLink } from "react-router-dom";

export const Header = () => {
  let navigate = useNavigate();

  const Logout = (event: React.MouseEvent<HTMLElement>) => {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("role");
    navigate(pageURLs.homePage);
  };

  // onLeavePage();
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Link
              component={RouterLink}
              className="logo"
              to={pageURLs.homePage}
            >
              <img src={logo} alt="logo" />
            </Link>
          </Box>

          <nav>
            {sessionStorage.getItem("role") === userRoles.user &&
            window.location.pathname !== pageURLs.productSelectionPage &&
            window.location.pathname !== pageURLs.applicationPage &&
            window.location.pathname !== pageURLs.homePage ? (
              <Link
                component={RouterLink}
                variant="button"
                color="text.primary"
                to={pageURLs.productSelectionPage}
                sx={{ my: 1, mx: 1.5 }}
              >
                Подобрать депозит
              </Link>
            ) : (
              ""
            )}

            {sessionStorage.getItem("login") &&
            window.location.pathname !== pageURLs.applicationList ? (
              <Link
                component={RouterLink}
                variant="button"
                color="text.primary"
                to={pageURLs.applicationList}
                sx={{ my: 1, mx: 1.5 }}
              >
                Список заявок
              </Link>
            ) : (
              ""
            )}
          </nav>

          {sessionStorage.getItem("login") ? (
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
