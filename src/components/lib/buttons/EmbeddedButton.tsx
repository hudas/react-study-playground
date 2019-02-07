import {Button} from "@material-ui/core";
import React from "react";
import {AppButtonProps} from "./PrimaryButton";

export function EmbeddedButton(props: AppButtonProps) {
  const { children, ...otherProps } = props;

  return (
    <Button
      color="primary"
      {...otherProps}
    >
      {children}
    </Button>
  );
}