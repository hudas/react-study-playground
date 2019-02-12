import React, {Component} from "react";
import style from "./HeadingLinks.module.scss";
import {Link} from "react-router-dom";

interface NavigationRoute {
    path: string;
    display: string;
}

const navigationRoutes: NavigationRoute[] = [
    { path: '/customer/new', display: 'New customer' },
    { path: '/customer/list', display: 'Customers list' },
    { path: '/order/new', display: 'New order' },
    { path: '/order/list', display: 'Orders list' },
];

export class HeadingLinks extends Component {

    linkBuilder = (route: NavigationRoute): React.ReactNode => {
        return (
            <span
                key={route.path}
                className={style["padded-link"]}
            >
                <Link to={route.path}>{route.display}</Link>
            </span>
        );
    };

    render(): React.ReactNode {
        return (
            <div>{navigationRoutes.map(this.linkBuilder)}</div>
        );
    }
}