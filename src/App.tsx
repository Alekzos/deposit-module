import React from "react";

import { ProductSelection } from "./pages/ProductSelection/ProductSelectionPage";
import { LoginPage } from "./pages/Login/Login";
import { Application } from "./pages/Application/Application";
import { ApplicationList } from "./pages/ApplicationList/ApplicationList";
import { NotFound } from "./pages/NotFound/NotFound";

import { pageURLs } from "./data/consts";

import "./styles/App.css";
import { Header } from "./components/header";

import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

function App() {
  //если пользователь не залогинился, тогда редиректить на главную
  function PrivateOutlet() {
    return sessionStorage.getItem("isLogged") ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  }

  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={pageURLs.homePage} element={<LoginPage />} />
            <Route
              path={pageURLs.productSelectionPage}
              element={<PrivateOutlet />}
            >
              <Route path="/calc" element={<ProductSelection />} />
            </Route>

            <Route path={pageURLs.applicationPage} element={<PrivateOutlet />}>
              <Route
                path={pageURLs.applicationPage}
                element={<Application />}
              />
            </Route>

            <Route path={pageURLs.applicationList} element={<PrivateOutlet />}>
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
