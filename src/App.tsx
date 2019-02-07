import React, { Component } from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import './App.scss';
import {ContentLayout} from "./components/core/layout/content/ContentLayout";
import {AuthLayout} from "./components/core/layout/auth/AuthLayout";
import {Login, LoginEvent} from "./components/core/auth/Login";
import {AppRouter} from "./components/core/routing/AppRouter";


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
                    <ContentLayout onLogout={this.logoutHandler}>
                        <AppRouter auth={this.state.auth}/>
                    </ContentLayout>
                  )
              }
          </Router>
        );
    }
}

export default App;
