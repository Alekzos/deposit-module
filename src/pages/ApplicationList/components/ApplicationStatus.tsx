import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import { IApplication } from "../../../data/types";
import { IUser } from "../../../data/types";
import EditIcon from "@mui/icons-material/Edit";
import { getUsers } from "../../../api/api";

import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { pageURLs } from "../../../data/consts";
import { useAppDispatch } from "../../../redux/hooks";
import { productSelectionSlice } from "../../../redux/productReducer";
import { selectUserSlice } from "../../../redux/userReducer";
// type Props = {
//   status: boolean;
//   id: number;
//   currency: string;
//   account: string;
// };

export const ApplicationStatus = (props: { application: IApplication }) => {
  const { application } = props;

  const dispatch = useAppDispatch();
  const { setProduct } = productSelectionSlice.actions;
  const { setUser } = selectUserSlice.actions;

  const setUsertoStore = async () => {
    let users = await getUsers();
    let TheUserData: IUser[] = (users || []).filter(
      (user: any) => user.inn === application.inn
    );
    TheUserData[0].account = application.account;
    dispatch(setUser(TheUserData[0]));
  };

  const setDatatoStore = () => {
    dispatch(setProduct(application.product));
    setUsertoStore();
  };

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
      {application.applicationStatus ? (
        "на рассмотрении"
      ) : (
        <React.Fragment>
          <Link
            component={RouterLink}
            to={`${pageURLs.applicationPage}/new`}
            onClick={setDatatoStore}
          >
            черновик
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
