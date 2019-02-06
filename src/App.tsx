import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import './App.scss';
import {Heading} from "./components/core/heading/Heading";
import {CustomerList} from "./components/customers/list/CustomerList";
import {CustomerForm} from "./components/customers/form/CustomerForm";
import {CustomerView} from "./components/customers/view/CustomerView";
import {Home} from "./components/core/content/home/Home";
import {NotFound} from "./components/core/content/not-found/NotFound";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Heading/>

                <Switch>
                    <Route exact path="/" render={Home}/>
                    <Route exact path="/customer/list" component={CustomerList} />
                    <Route exact path="/customer/new" component={CustomerForm} />
                    <Route exact path="/customer/edit/:id" component={CustomerForm} />
                    <Route exact path="/customer/:id" component={CustomerView} />
                    <Route render={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
