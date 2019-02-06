import React, {Component} from "react";
import { ReactComponent as BikeLogo } from '../../../../assets/bicycle-solid.svg';
import style from './Logo.module.scss';

export class Logo extends Component {

    render() {
        return (
            <div className={style.container}>
                <span className={style.title}>App logo:</span>
                <BikeLogo className={style["sized-logo"]}/>
            </div>
        );
    }
}