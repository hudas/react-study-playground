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
        const existingCustomer = !!this.props.match.params.id;

        return (
            <div>
                {
                    existingCustomer ? (
                      "Customer form  " + this.props.match.params.id
                    ) : (
                      "New customer form"
                    )
                }
            </div>
        );
    }
}