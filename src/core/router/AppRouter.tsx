import {Route, RouteComponentProps, Switch} from "react-router";
import {AuthState} from "../../App";
import {Home} from "../components/content/home/Home";
import {CustomerRouter} from "../../customers/router/CustomerRouter";
import {NotFound} from "../components/content/not-found/NotFound";
import React from "react";
import {OrderRouter} from "../../orders/router/OrderRouter";

export interface AppRoutedComponentProps extends RouteComponentProps, AppRouterProps {

}

export interface AppRouterProps {
  auth: AuthState
}


export function AppRouter({ auth }: AppRouterProps) {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        path="/customer"
        render={(routeProps) => <CustomerRouter auth={auth} {...routeProps}/>}
      />
      <Route
        path="/order"
        render={(routeProps) => <OrderRouter auth={auth} {...routeProps}/>}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  );
}