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
import { getUserLogin, isAdmin, onLogout } from "../pages/Login/utils";
import logo from "../styles/logoipsum-logo.svg";
import { Link as RouterLink } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export const Header = () => {
  const navigate = useNavigate();

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
              to={
                isAdmin()
                  ? pageURLs.applicationList
                  : pageURLs.productSelectionPage
              }
            >
              <img src={logo} alt="logo" />
            </Link>
          </Box>

          <nav>
            {!isAdmin() &&
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
            ) : null}
            {getUserLogin() &&
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
            <LogoutButton />
          </nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
