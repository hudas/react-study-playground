import {Paper, Typography} from "@material-ui/core";
import style from "./FormPanel.module.scss";
import React from "react";

export function FormPanel({ children, title }: any) {
  return (
    <Paper
      className={style.container}
      square={true}
      elevation={2}>
      <Typography variant="headline" color="primary">
        {title}
      </Typography>
      {children}
    </Paper>
  );
}