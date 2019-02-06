import React, {Component} from "react";

interface ProtectedContentProps {
    requiredRole: string
}

export class RouteGuard extends Component<any> {

    constructor(props: any) {
        super(props);

    }

    render(): React.ReactNode {
        return (
            <div>
                {
                    this.props.auth.loggedIn && this.props.allowedRoles.includes(this.props.auth.role) ? (
                        this.props.children
                    ) : (
                        "Content is not available"
                    )
                }
            </div>
        );
    }
}