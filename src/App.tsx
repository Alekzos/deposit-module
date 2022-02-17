import React from "react";
import { ProductSelection } from "./pages/ProductSelection/ProductSelectionPage";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ProductSelection />
      </StyledEngineProvider>
    </div>
  );
}

export default App;
