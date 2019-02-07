import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import './App.scss';
import {Heading} from "./components/core/heading/Heading";
import {CustomerRouter} from "./components/customers/router/CustomerRouter";
import {ContentLayout} from "./components/core/layout/content/ContentLayout";
import {AuthLayout} from "./components/core/layout/auth/AuthLayout";
import {Login, LoginEvent} from "./components/core/auth/Login";
import {OrderRouter} from "./components/orders/router/OrderRouter";
import {Home} from "./components/core/content/home/Home";
import {withGuard} from "./components/core/content/guard/RouteGuard";
import {CustomerForm} from "./components/customers/form/CustomerForm";
import {CustomerList} from "./components/customers/list/CustomerList";
import {CustomerView} from "./components/customers/view/CustomerView";
import {NotFound} from "./components/core/content/not-found/NotFound";


interface AppState {
    auth: AuthState;
}

export interface AuthState {
    loggedIn: boolean;
    role?: string;
}

class App extends Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            auth: {
                loggedIn: false,
                role: undefined
            }
        };
    }

    loginHandler = (event: LoginEvent) => {
        this.setState({
            auth: {
                loggedIn: true,
                role: event.role
            }
        })
    };

    logoutHandler = () => {
        this.setState({
            auth: {
                loggedIn: false,
                role: undefined
            }
        })
    };

    render() {
        return (
          <Router>
              {
                  !this.state.auth.loggedIn ? (
                    <AuthLayout>
                        <Login onLogin={this.loginHandler}/>
                    </AuthLayout>
                  ) : (
                    <ContentLayout>
                        <button onClick={this.logoutHandler}>Logout</button>
                        <Switch>
                            <Route
                              exact
                              path="/"
                              component={Home}
                            />
                            <Route
                              path="/customer"
                              render={(routeProps) => <CustomerRouter auth={this.state.auth} {...routeProps}/>}
                            />
                            <Route
                              path="/order"
                              render={(routeProps) => <OrderRouter auth={this.state.auth} {...routeProps}/>}
                            />
                            <Route
                              component={NotFound}
                            />
                        </Switch>
                    </ContentLayout>
                  )
              }
          </Router>
        );
    }
}

export default App;
