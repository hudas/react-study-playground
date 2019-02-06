import style from "./LoginFormNotice.module.scss";
import React from "react";


export function LoginFormNotice() {
  return (
    <div className={style.notice}>
      <div> Fake login form :)</div>
      <div> Leave blank</div>
    </div>
  );
}