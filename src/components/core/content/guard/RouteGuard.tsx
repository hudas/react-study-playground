import React, {Component} from "react";
import {AuthState} from "../../../../App";

export function withGuard(GuardedComponent: React.ComponentType<any>, allowedRoles: string[], auth: AuthState) {

    return class extends Component {

        render(): React.ReactNode {
            if (!auth.loggedIn || !auth.role || !allowedRoles.includes(auth.role)) {
                return <div>Content is not available</div>
            }

            return <GuardedComponent {...this.props}/>;
        }
    }
}