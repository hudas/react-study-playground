import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class CustomerList extends Component {

    render(): React.ReactNode {
        return (
            <div>
                Customers list
                <div>
                    <div>
                        <span>Name:</span>
                        <span>John smith</span>
                    </div>
                    <div>
                        <span>Address</span>
                        <span>Žalgirio g. 135, Vilnius</span>
                    </div>
                    <div>
                        <span>Subscriptions</span>
                        <span>+37061234567</span>
                    </div>
                    <div>
                        <span>Actions</span>
                        <span><Link to="/customer/1">View</Link></span>
                    </div>
                </div>
            </div>
        );
    }
}