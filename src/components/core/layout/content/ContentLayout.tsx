import React, {Component, ComponentProps, ComponentPropsWithoutRef, ReactNode} from "react";
import style from "./ContentLayout.module.scss";
import {Heading} from "../../heading/Heading";

export function ContentLayout({ children, onLogout }: any) {
  return (
    <div className={style.container}>
      <Heading onLogout={onLogout}/>
      {children}
    </div>
  );
}