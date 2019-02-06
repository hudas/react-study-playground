import React, {Component, ReactNode} from 'react';
import {RouteComponentProps} from "react-router";

interface CustomerViewRouteParams {
    id: string;
}

export class CustomerView extends Component<RouteComponentProps<CustomerViewRouteParams>> {

    constructor(props: any) {
        super(props);

        // this.state = {
        //     customerId: props.match.params.id
        // };
    }

    render(): ReactNode {
        return (
            <div>
                Customer view
                { " " + this.props.match.params.id }
            </div>
        );
    }
}