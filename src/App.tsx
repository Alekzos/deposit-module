import React from "react";
import DepositCalc from "./pages/DepositCalc";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <DepositCalc />
      </StyledEngineProvider>
    </div>
  );
}

export default App;
