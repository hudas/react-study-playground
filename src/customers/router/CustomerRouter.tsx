import {Redirect, Route, Switch} from "react-router";
import {withGuard} from "../../core/components/content/guard/RouteGuard";
import {NotFound} from "../../core/components/content/not-found/NotFound";
import React from "react";
import {AppRoutedComponentProps} from "../../core/router/AppRouter";
import CustomerListPage from "../pages/list/CustomerListPage";
import CustomerViewPage from "../pages/view/CustomerViewPage";
import CustomerUpdatePage from "../pages/update/CustomerUpdatePage";

export function CustomerRouter({auth, match}: AppRoutedComponentProps) {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.path}/`}
        to={`${match.url}/list`}
      />
      <Route
        path={`${match.path}/new`}
        component={withGuard(CustomerUpdatePage, ["ADMIN"], auth)}
      />
      <Route
        path={`${match.path}/list`}
        component={withGuard(CustomerListPage, ["GUEST", "ADMIN"], auth)}
      />
      <Route
        path={`${match.path}/edit/:id`}
        component={withGuard(CustomerUpdatePage, ["ADMIN"], auth)}
      />
      <Route
        path={`${match.path}/:id`}
        component={withGuard(CustomerViewPage, ["GUEST", "ADMIN"], auth)}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  );
}