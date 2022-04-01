import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import { IApplication } from "../../../data/types";
import { patchApplication } from "../../../api/applicationAPI";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const ChangeApplicationStatusList = (props: {
  application: IApplication;
  onChangeApplicationStatus: any;
  // isStatusChanged: any;
}) => {
  const { application, onChangeApplicationStatus } = props;

  const changeApplicationStatus = (status: string) => {
    console.log("1");
    // patchApplication(
    //   Number(application.id),
    //   (application.applicationStatus = status)
    // );
  };

  return (
    <TableCell scope="row" onClick={(e) => e.stopPropagation()}>
      {application.applicationStatus === "UNDER_CONSIDERATION" ? (
        <CheckCircleIcon
          color="success"
          sx={{
            "&:hover": {
              color: "rgba(46, 125, 50, 0.8)",
              cursor: "pointer",
            },
          }}
          onClick={() => onChangeApplicationStatus(application.id, "APPROVED")}

          //onClick={() => changeApplicationStatus("APPROVED")}
        />
      ) : null}

      {application.applicationStatus === "UNDER_CONSIDERATION" ? (
        <CancelIcon
          color="error"
          sx={{
            "&:hover": {
              color: "rgba(211, 47, 47, 0.8)",
              cursor: "pointer",
            },
          }}
          onClick={() => onChangeApplicationStatus(application.id, "REJECTED")}
          // onClick={() => changeApplicationStatus("REJECTED")}
        />
      ) : null}
    </TableCell>
  );
};
