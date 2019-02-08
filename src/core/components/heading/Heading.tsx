import React from 'react';
import style from './Heading.module.scss';
import {Logo} from "./logo/Logo";
import {HeadingLinks} from "./links/HeadingLinks";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";

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
      <PrimaryButton onClick={onLogout}>
        Logout
      </PrimaryButton>
    </div>
  );
}