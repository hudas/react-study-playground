import {Redirect, Route, Switch} from "react-router";
import * as React from "react";
import {withGuard} from "../../core/content/guard/RouteGuard";
import {OrderForm} from "../form/OrderForm";
import {OrderList} from "../list/OrderList";
import {OrderView} from "../view/OrderView";
import {NotFound} from "../../core/content/not-found/NotFound";
import {AppRouterProps} from "../../core/routing/AppRouter";

export function OrderRouter({ auth, match }: AppRouterProps) {
  return (
    <div>
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
    </div>

  );
}