import {Redirect, Route, Switch} from "react-router";
import * as React from "react";
import {withGuard} from "../../core/components/content/guard/RouteGuard";
import {OrderForm} from "../pages/form/OrderForm";
import {OrderList} from "../pages/list/OrderList";
import {OrderView} from "../pages/view/OrderView";
import {NotFound} from "../../core/components/content/not-found/NotFound";
import {AppRoutedComponentProps} from "../../core/router/AppRouter";

export function OrderRouter({ auth, match }: AppRoutedComponentProps) {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.path}/`}
        to={`${match.url}/list`}
      />
      <Route
        exact
        path={`${match.path}/new`}
        component={withGuard(OrderForm, ["ADMIN"], auth)}
      />
      <Route
        exact
        path={`${match.path}/list`}
        component={withGuard(OrderList, ["GUEST", "ADMIN"], auth)}
      />
      <Route
        exact
        path={`${match.path}/edit/:id`}
        component={withGuard(OrderForm, ["ADMIN"], auth)}
      />
      <Route
        exact
        path={`${match.path}/:id`}
        component={withGuard(OrderView, ["GUEST", "ADMIN"], auth)}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  );
}