import React, { Component } from "react";
import { Route, Redirect, NavLink, HashRouter } from "react-router-dom";
import { CustomerPage } from "./components/customer/customerPage"
import { WorkerPage } from "./components/worker/workerPage"
import { ManagerPage } from "./components/manager/managerPage"

class App extends Component {
  render() {
    return (
        <div className="App">
            <HashRouter>
                <div className="myTopMenu text-center header-text">
                    <div className="menuButton">
                        <NavLink to="/manager" activeClassName="active-nav-link">
                            <div className="menuButtonTitle"> Manager</div>
                        </NavLink>
                    </div>
                    <div className="menuButton">
                        <NavLink to="/worker" activeClassName="active-nav-link">
                            <div className="menuButtonTitle">Worker</div>
                        </NavLink>
                    </div>
                    <div className="menuButton">
                        <NavLink to="/customer" activeClassName="active-nav-link">
                            <div className="menuButtonTitle"> Customer</div>
                        </NavLink>
                    </div>
                </div>
                <div className="authorTile">Mádi Szilárd - BQ1IXF</div>
                <Route path="/" exact render={() => (<Redirect to='/customer' />)} />
                <Route path="/customer" component={CustomerPage} />
                <Route path="/worker" component={WorkerPage} />
                <Route path="/manager" component={ManagerPage} />
            </HashRouter>
        </div>
    );
  }
}

export default App;
