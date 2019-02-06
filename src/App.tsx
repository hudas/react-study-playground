import React, { Component } from 'react';
import './App.scss';
import {Heading} from "./components/heading/Heading";
import {Logo} from "./components/logo/Logo";

class App extends Component {
  render() {
    return (
        <div className="App">
            <div>
                <Heading/>
                <Logo/>
            </div>
            <div>Hello world</div>
            <div>Hello world</div>
            <div>Test reload</div>
        </div>
    );
  }
}

export default App;
