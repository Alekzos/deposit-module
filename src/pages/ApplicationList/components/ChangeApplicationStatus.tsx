import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import { IApplication } from "../../../data/types";
import EditIcon from "@mui/icons-material/Edit";
import { applicationStatuses } from "../../Application/consts";
import { patchApplication } from "../../../api/api";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export const ChangeApplicationStatusList = (props: {
  application: IApplication;
}) => {
  const { application } = props;

  //   useEffect(() => {
  //     const getUserList = async () => {
  //       let response = await getUsers();
  //       const user = (response || []).filter(
  //         (user) => user.login === sessionStorage.getItem("login")
  //       );
  //       setApplicationStatus(user[0]);
  //     };
  //   }, [application.applicationStatus]);
  const changeApplicationStatus = (status: number) => {
    patchApplication(
      Number(application.id),
      (application.applicationStatus = status)
    );
  };

  return (
    <TableCell scope="row">
      {application.applicationStatus === 1 ? (
        <CheckCircleIcon
          color="success"
          sx={{
            "&:hover": {
              color: "rgba(46, 125, 50, 0.8)",
              cursor: "pointer",
            },
          }}
          onClick={() => changeApplicationStatus(2)}
        />
      ) : (
        ""
      )}

      {application.applicationStatus === 1 ? (
        <CancelIcon
          color="error"
          sx={{
            "&:hover": {
              color: "rgba(211, 47, 47, 0.8)",
              cursor: "pointer",
            },
          }}
          onClick={() => changeApplicationStatus(3)}
        />
      ) : (
        ""
      )}
    </TableCell>
  );
};
