import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./SpinnerStyles";

export const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};
