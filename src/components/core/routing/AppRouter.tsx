import {RouteComponentProps} from "react-router";
import {AuthState} from "../../../App";

export interface AppRouterProps extends RouteComponentProps {
  auth: AuthState
}