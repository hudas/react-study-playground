import React, { Component } from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import './App.scss';
import {ContentLayout} from "./core/components/layout/content/ContentLayout";
import {AuthLayout} from "./core/components/layout/auth/AuthLayout";
import {Login, LoginEvent} from "./core/components/auth/Login";
import {AppRouter} from "./core/router/AppRouter";
import {MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import {registerValidations} from "./lib/validators/CustomValidatorRegistry";

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
        registerValidations();
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
          <MuiPickersUtilsProvider utils={MomentUtils}>
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
          </MuiPickersUtilsProvider>
        );
    }
}

export default App;
