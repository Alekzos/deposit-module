import React from "react";

import { Link as RouterLink } from "react-router-dom";

import Link from "@mui/material/Link";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { pageURLs } from "../../../data/consts";
import { DocStatus } from "../../Application/consts";
import { getApplicationStatusText } from "../utils";
import { IApplication } from "../../../data/types";

export const ApplicationStatus = (props: { application: IApplication }) => {
  const { application } = props;

  return (
    <TableCell
      scope="row"
      sx={{
        "&:hover": {
          color: "rgba(0, 0, 0, 0.54)",
          cursor: "pointer",
        },
      }}
    >
      {application.applicationStatus !== DocStatus.DRAFT ? (
        <React.Fragment>
          <Link
            sx={{
              color: "black",
              textDecoration: "none",
              "&:hover": {
                opacity: 0.6,
              },
            }}
            component={RouterLink}
            to={`${pageURLs.applicationPage}/${application.id}`}
          >
            {getApplicationStatusText(application.applicationStatus)}
            <VisibilityIcon
              sx={{
                ml: 1,
                position: "relative",
              }}
            />
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link
            sx={{
              textDecoration: "none",
              "&:hover": {
                opacity: 0.6,
              },
            }}
            component={RouterLink}
            to={`${pageURLs.applicationPage}/${application.id}?q=edit`}
          >
            {getApplicationStatusText(application.applicationStatus)}
            <EditIcon
              sx={{
                ml: 1,
                position: "relative",
              }}
            />
          </Link>
        </React.Fragment>
      )}
    </TableCell>
  );
};
