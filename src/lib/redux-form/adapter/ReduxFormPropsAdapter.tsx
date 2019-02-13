import React, {ComponentType} from "react";
import {WrappedFieldProps} from "redux-form";

export function withReduxFieldProps(WrappedComponent: ComponentType<any>): ComponentType<WrappedFieldProps & any> {
  return class extends React.Component<WrappedFieldProps & any> {
    render(): React.ReactNode {
      console.log(this.props);
      return (
        <WrappedComponent
          {...this.props}
          {...this.props.input}
        />
      );
    }
  }
}