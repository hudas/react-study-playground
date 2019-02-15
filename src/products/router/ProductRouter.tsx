import {AppRoutedComponentProps} from "../../core/router/AppRouter";
import {Redirect, Route, Switch} from "react-router";
import {withGuard} from "../../core/components/content/guard/RouteGuard";
import {NotFound} from "../../core/components/content/not-found/NotFound";
import * as React from "react";
import ProductUpdatePage from "../pages/update/ProductUpdatePage";
import ProductListPage from "../pages/list/ProductListPage";

export function ProductRouter({auth, match}: AppRoutedComponentProps) {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.path}/`}
        to={`${match.url}/list`}/>
      <Route
        exact
        path={`${match.path}/new`}
        component={withGuard(ProductUpdatePage, ["ADMIN"], auth)}
      />
      <Route
        exact
        path={`${match.path}/list`}
        component={withGuard(ProductListPage, ["ADMIN"], auth)}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  );
}