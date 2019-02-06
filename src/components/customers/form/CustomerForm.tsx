import React, { Component } from 'react';
import {RouteComponentProps} from "react-router";

interface CustomerFormRouteParams {
    id: string;
}

export class CustomerForm extends Component<RouteComponentProps<CustomerFormRouteParams>> {

    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div>
                Customer form
                { " " + this.props.match.params.id }
            </div>
        );
    }
}