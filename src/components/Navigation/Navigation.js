import "../../assets/css/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button } from 'reactstrap';
import Message from "../Message/Message";
import Data from "../Data/Data";
import MainHome from "../MainHome";


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
                        <Link to={"/messages"} className="nav-link">
                            <Button outline color="warning">Notes</Button>
                        </Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path="/index" component={MainHome} />
                <Route exact path="/workboard" component={Data} />
                <Route exact path="/messages" component={Message} />
            </Switch>
        </div>
    </Router>
);

export default Navigation;