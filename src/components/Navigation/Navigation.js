import "../../assets/css/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "../Home";
import Contact from "../Contact/Contact";
import { Button } from 'reactstrap';
import Notes from "../Notes/Notes";
import List from "../ToDo/List";

const Navigation = () => (
    <Router>
        <div style={{ display: "flex" }}>
            <div className="sideBar">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <div className="header">Menu</div>
                    <li>
                        <Link to={"/index"} className="nav-link">
                            <Button outline color="warning">Home</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/contact"} className="nav-link">
                            <Button outline color="warning">Contact</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/notes"} className="nav-link">
                            <Button outline color="warning">Notes</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/todo"} className="nav-link">
                            <Button outline color="warning">ToDo</Button>
                        </Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path="/index" component={Home} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/notes" component={Notes} />
                <Route exact path="/todo" component={List} />\
            </Switch>
        </div>
    </Router>
);

export default Navigation;