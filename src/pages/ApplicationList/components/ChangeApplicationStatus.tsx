import TableCell from "@mui/material/TableCell";
import { IApplication } from "../../../data/types";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const ChangeApplicationStatusList = (props: {
  application: IApplication;
  changeApplicationStatus: any;
}) => {
  const { application, changeApplicationStatus } = props;

  return (
    <TableCell
      scope="row"
      onClick={(e) => e.stopPropagation()}
      sx={{
        "&:hover": {
          cursor: "auto",
        },
      }}
    >
      {application.applicationStatus === "UNDER_CONSIDERATION" ? (
        <CheckCircleIcon
          color="success"
          sx={{
            "&:hover": {
              color: "rgba(46, 125, 50, 0.8)",
              cursor: "pointer",
            },
          }}
          onClick={() => changeApplicationStatus(application.id, "APPROVED")}
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
          onClick={() => changeApplicationStatus(application.id, "REJECTED")}
        />
      ) : null}
    </TableCell>
  );
};
