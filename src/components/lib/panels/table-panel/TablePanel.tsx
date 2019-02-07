import {Paper} from "@material-ui/core";
import style from "./TablePanel.module.scss";
import React from "react";

export function TablePanel({ children }: any) {
  return (
    <Paper
      className={style.container}
      square={true}
      elevation={2}>
      {children}
    </Paper>
  );
}