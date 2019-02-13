import {AppRoutedComponentProps} from "../../core/router/AppRouter";
import {Redirect, Route, Switch} from "react-router";
import {withGuard} from "../../core/components/content/guard/RouteGuard";
import {NotFound} from "../../core/components/content/not-found/NotFound";
import * as React from "react";
import ProductUpdatePage from "../pages/update/ProductUpdatePage";

export function ProductRouter({auth, match}: AppRoutedComponentProps) {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.path}/`}
        to={`${match.url}/new`}/>
      <Route
        exact
        path={`${match.path}/new`}
        component={withGuard(ProductUpdatePage, ["ADMIN"], auth)}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  );
}