import React, { Component } from 'react';
import style from './Heading.module.scss';
import {Logo} from "./logo/Logo";
import {HeadingLinks} from "./links/HeadingLinks";

export class Heading extends Component {
    render() {
        return (
            <div className={style.container}>
                <Logo/>
                <div>
                    <h1 className="title">Study app heading</h1>
                    <HeadingLinks/>
                </div>
            </div>
        );
    }
}