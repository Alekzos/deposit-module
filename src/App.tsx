import React from "react";

import { ProductSelection } from "./pages/ProductSelection/ProductSelectionPage";
import { LoginPage } from "./pages/Login/Login";
import { Application } from "./pages/Application/Application";
import { ApplicationList } from "./pages/ApplicationList/ApplicationList";
import { NotFound } from "./pages/NotFound/NotFound";

import { pageURLs } from "./data/consts";
import { userRoles } from "./pages/Login/consts";
import { getUserLogin, isAdmin } from "./pages/Login/utils";

import "./styles/style.css";
import { Header } from "./components/Header";

import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

//если пользователь не залогинился, тогда редиректить на главную
function PrivateOutlet() {
  return getUserLogin() ? <Outlet /> : <Navigate to="/" />;
}

function PrivateOutletforUsers() {
  return !isAdmin() ? <Outlet /> : <Navigate to="/" />;
}

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={pageURLs.homePage} element={<LoginPage />} />

            <Route element={<PrivateOutlet />}>
              <Route element={<PrivateOutletforUsers />}>
                <Route
                  path={pageURLs.productSelectionPage}
                  element={<ProductSelection />}
                />
                <Route
                  path={`${pageURLs.applicationPage}/:applicationId`}
                  element={<Application />}
                />
              </Route>
              <Route
                path={pageURLs.applicationList}
                element={<ApplicationList />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
