import {Component} from "react";
import {Route, Switch} from "react-router";
import {Home} from "../../core/content/home/Home";
import {withGuard} from "../../core/content/guard/RouteGuard";
import {CustomerList} from "../list/CustomerList";
import {CustomerForm} from "../form/CustomerForm";
import {CustomerView} from "../view/CustomerView";
import {NotFound} from "../../core/content/not-found/NotFound";
import React, { ReactNode} from "react";
import {AuthState} from "../../../App";

export interface RouterComponentProps {
  auth: AuthState
}

export class CustomersRouter extends Component<RouterComponentProps> {

  constructor(props: RouterComponentProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/customer/new"
            component={withGuard(CustomerForm, ["ADMIN"], this.props.auth)}
          />
          <Route
            exact
            path="/customer/list"
            component={withGuard(CustomerList, ["GUEST", "ADMIN"], this.props.auth)}
          />
          <Route
            exact
            path="/customer/edit/:id"
            component={withGuard(CustomerForm, ["ADMIN"], this.props.auth)}
          />
          <Route
            exact
            path="/customer/:id" component={withGuard(CustomerView, ["GUEST", "ADMIN"], this.props.auth)}
          />
          <Route
            component={NotFound}
          />
        </Switch>
      </div>

    );
  }
}