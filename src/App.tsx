import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import './App.scss';
import {Heading} from "./components/core/heading/Heading";
import {CustomersRouter} from "./components/customers/router/CustomersRouter";
import {ContentLayout} from "./components/core/layout/content/ContentLayout";
import {AuthLayout} from "./components/core/layout/auth/AuthLayout";
import {Login, LoginEvent} from "./components/core/auth/Login";


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
                        <CustomersRouter auth={this.state.auth}/>
                    </ContentLayout>
                  )
              }
          </Router>
        );
    }
}

export default App;
