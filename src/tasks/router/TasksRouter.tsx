import {AppRoutedComponentProps} from "../../core/router/AppRouter";
import {Redirect, Route, Switch} from "react-router";
import {withGuard} from "../../core/components/content/guard/RouteGuard";
import TaskListPage from "../pages/list/TaskListPage";
import TaskViewPage from "../pages/view/TaskViewPage";
import React from "react";

export function TasksRouter({auth, match}: AppRoutedComponentProps) {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.path}/`}
        to={`${match.url}`}
      />
      <Route
        path={`${match.path}/list`}
        component={withGuard(TaskListPage, ['ADMIN', 'GUEST'], auth)}
      />
      <Route
        path={`${match.path}/:id`}
        component={withGuard(TaskViewPage, ['ADMIN', 'GUEST'], auth)}
      />
    </Switch>
  )
}