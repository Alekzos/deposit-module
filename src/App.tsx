import React from "react";

import { ProductSelection } from "./pages/ProductSelection/ProductSelectionPage";
import { LoginPage } from "./pages/Login/Login";
import { Application } from "./pages/Application/Application";
import { ApplicationList } from "./pages/ApplicationList/ApplicationList";
import { NotFound } from "./pages/NotFound/NotFound";

import "./styles/App.css";

import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/calc" element={<ProductSelection />} />
            <Route path="/application" element={<Application />} />
            <Route path="/applicationlist" element={<ApplicationList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
