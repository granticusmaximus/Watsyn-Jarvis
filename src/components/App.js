import React, { Component } from 'react';
import 'firebase/auth';
import '../assets/css/App.css';
import fire from "./Firebase/fire";
import Page from "./auth/Page";
import Home from './partials/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };
  render() {
    return <div>{this.state.user ? <Home /> : <Page />}</div>;
  }
}

export default App;
