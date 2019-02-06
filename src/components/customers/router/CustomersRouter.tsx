import {Component} from "react";
import {Route, Switch} from "react-router";
import {Home} from "../../core/content/home/Home";
import {RouteGuard} from "../../core/content/guard/RouteGuard";
import {CustomerList} from "../list/CustomerList";
import {CustomerForm} from "../form/CustomerForm";
import {CustomerView} from "../view/CustomerView";
import {NotFound} from "../../core/content/not-found/NotFound";
import React, { ReactNode} from "react";
import {AuthState} from "../../../App";

export interface RouterComponentProps {
  auth: AuthState
}

export class CustomersRouter extends Component<any> {

  render(): ReactNode {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <RouteGuard allowedRoles={["GUEST", "ADMIN"]} auth={this.props.auth}>
          <Route exact path="/customer/list" component={CustomerList}/>
        </RouteGuard>
        <RouteGuard allowedRoles={["ADMIN"]} auth={this.props.auth}>
          <Route exact path="/customer/new" component={CustomerForm}/>
        </RouteGuard>
        <RouteGuard allowedRoles={["ADMIN"]} auth={this.props.auth}>
          <Route exact path="/customer/edit/:id" component={CustomerForm}/>
        </RouteGuard>
        <RouteGuard allowedRoles={["GUEST", "ADMIN"]} auth={this.props.auth}>
          <Route exact path="/customer/:id" component={CustomerView}/>
        </RouteGuard>
        <Route component={NotFound}/>
      </Switch>
    );
  }
}