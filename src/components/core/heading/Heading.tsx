import React, { Component } from 'react';
import style from './Heading.module.scss';
import {Logo} from "./logo/Logo";
import {HeadingLinks} from "./links/HeadingLinks";
import {Button} from "@material-ui/core";

export interface HeadingProps {
  onLogout: () => void;
}

export function Heading({ onLogout }: HeadingProps) {
  return (
    <div className={style.container}>
      <Logo/>
      <div>
        <h1 className="title">Study app heading</h1>
        <HeadingLinks/>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
}