import React from "react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import { IApplication } from "../../../data/types";
import EditIcon from "@mui/icons-material/Edit";
import { applicationStatuses } from "../../Application/consts";
import { switchApplicationStatus } from "../utils";
import Link from "@mui/material/Link";
import { pageURLs } from "../../../data/consts";
import { getUsers } from "../../../api/userAPI";
import { getApplications } from "../../../api/applicationAPI";

export const ApplicationStatus = (props: { application: IApplication }) => {
  const { application } = props;

  // const [applicationStatus, setApplicationStatus] = useState<
  //   void | IApplication[]
  // >([]);

  // useEffect(() => {
  //   const getApplicationList = async () => {
  //     let response = await getApplications();
  //     let applications = (response || []).filter(
  //       (application) => application.applicationStatus !== 0
  //     );
  //     setApplicationStatus(applications);
  //   };
  //   getApplicationList();
  // }, [application.applicationStatus]);

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
      {/* если не черновик - вывести в таблицу, иначе добавить еще кнопку редактирования */}

      {application.applicationStatus !== "DRAFT" ? (
        switchApplicationStatus(application.applicationStatus)
      ) : (
        <React.Fragment>
          <Link
            component={RouterLink}
            to={`${pageURLs.applicationPage}/${application.id}`}
          >
            {switchApplicationStatus(application.applicationStatus)}
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
