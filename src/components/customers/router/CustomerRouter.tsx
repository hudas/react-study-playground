import {Redirect, Route, Switch} from "react-router";
import {withGuard} from "../../core/content/guard/RouteGuard";
import {CustomerList} from "../components/list/CustomerList";
import {CustomerForm} from "../components/form/CustomerForm";
import {CustomerView} from "../components/view/CustomerView";
import {NotFound} from "../../core/content/not-found/NotFound";
import React from "react";
import {AppRoutedComponentProps} from "../../core/routing/AppRouter";

export function CustomerRouter({ auth, match }: AppRoutedComponentProps) {
  return (
    <div>
      <Switch>
        <Redirect
          exact
          from={`${match.path}/`}
          to={`${match.url}/list`}
        />
        <Route
          path={`${match.path}/new`}
          component={withGuard(CustomerForm, ["ADMIN"], auth)}
        />
        <Route
          path={`${match.path}/list`}
          component={withGuard(CustomerList, ["GUEST", "ADMIN"], auth)}
        />
        <Route
          path={`${match.path}/edit/:id`}
          component={withGuard(CustomerForm, ["ADMIN"], auth)}
        />
        <Route
          path={`${match.path}/:id`}
          component={withGuard(CustomerView, ["GUEST", "ADMIN"], auth)}
        />
        <Route
          component={NotFound}
        />
      </Switch>
    </div>
  );
}