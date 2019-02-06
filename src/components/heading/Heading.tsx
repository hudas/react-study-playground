import React, { Component } from 'react';
import style from './Heading.module.scss';

export class Heading extends Component {
    render() {
        return (
            <div>
                <h1 className="title">Hello page heading</h1>
                <p className={style["padded-content"]}>Heading line 1</p>
                <p className="padded-content">Heading line 2</p>
            </div>
        );
    }
}