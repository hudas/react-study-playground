import React, {Component} from "react";
import style from "./Login.module.scss";
import {FakeLoginForm} from "./form/FakeLoginForm";
import {LoginFormNotice} from "./notice/LoginFormNotice";

export interface LoginEvent {
  role: string;
}

export type LoginHandler = (event: LoginEvent) => void;

export interface LoginComponentProps {
  onLogin: LoginHandler;
}

export class Login extends Component<LoginComponentProps> {

  constructor(props: any) {
    super(props);

  }

  loginHandlerBuilder = (role: string) => {
    return () => this.props.onLogin({ role });
  };

  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <LoginFormNotice/>
        <FakeLoginForm/>

        <div className={style.buttons}>
          <div>
            <button onClick={this.loginHandlerBuilder('GUEST')}>Login as Guest</button>
          </div>
          <div>
            <button onClick={this.loginHandlerBuilder('ADMIN')}>Login as Admin</button>
          </div>
        </div>
      </div>
    );
  }
}