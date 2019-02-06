import React, {Component, ReactNode} from "react";
import style from "./ContentLayout.module.scss";
import {Heading} from "../../heading/Heading";


export class ContentLayout extends Component {

  render(): ReactNode {
    return (
      <div className={style.container}>
        <Heading/>
        {this.props.children}
      </div>
    );
  }
}