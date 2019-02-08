import React, {Component, ReactNode} from "react";
import style from "./AuthLayout.module.scss";

export class AuthLayout extends Component {

  render(): ReactNode {
    return (
      <div className={style.container}>
        {this.props.children}
      </div>
    );
  }
}