import "../../assets/css/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button } from 'reactstrap';
import Data from "../Data/Data";
import MainHome from "../MainHome";
import Client from "../ClientData/Client";
import UserIndex from "../Users";


const Navigation = () => (
    <Router>
        <div style={{ display: "flex" }}>
            <div className="sideBar">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                        <Link to={"/index"} className="nav-link">
                            <Button outline color="warning">Home</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/workboard"} className="nav-link">
                            <Button outline color="warning">Work</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/clients"} className="nav-link">
                            <Button outline color="warning">Client</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/userentry"} className="nav-link">
                            <Button outline color="warning">User</Button>
                        </Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path="/index" component={MainHome} />
                <Route exact path="/workboard" component={Data} />
                <Route exact path="/clients" component={Client} />
                <Route exact path="/userentry" component={UserIndex} />
            </Switch>
        </div>
    </Router>
);

export default Navigation;