import React, {Component} from "react";
import style from "./HeadingLinks.module.scss";
import {Link} from "react-router-dom";

interface NavigationRoute {
    path: string;
    display: string;
}

const navigationRoutes: NavigationRoute[] = [
    { path: '/customer/new', display: 'New' },
    { path: '/customer/list', display: 'List' },
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