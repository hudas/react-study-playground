import {Paper} from "@material-ui/core";
import style from "./FormPanel.module.scss";
import React from "react";

export function FormPanel({ children }: any) {
  return (
    <Paper
      className={style.container}
      square={true}
      elevation={2}>
      {children}
    </Paper>
  );
}