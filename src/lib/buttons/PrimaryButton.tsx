import React, {ReactNode} from "react";
import {Button} from "@material-ui/core";
import {ButtonProps} from "@material-ui/core/Button";

export interface AppButtonProps extends ButtonProps {
  children: ReactNode;
}

export function PrimaryButton(props: AppButtonProps) {
  const { children, ...otherProps } = props;

  return (
    <Button
      color="primary"
      variant="contained"
      {...otherProps}
    >
      {children}
    </Button>
  );
}