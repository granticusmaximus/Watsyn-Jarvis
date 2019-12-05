import fire from '../Firebase/fire';
import React, { Component } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";

class SignIn extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: ""
      };
    }
  
    _userSignIn = e => {
      fire
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
          console.log(error);
        });
  
      e.preventDefault();
    };
  
    _handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
  
    render() {
      return (
        <div>
          <Form>
            <div className="container">
              <h3>Sign In</h3>
              <FormGroup>
                <h2>Email Address</h2>
                <Input
                  value={this.state.email}
                  onChange={this._handleChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup>
                <h2>Password</h2>
                <Input
                  value={this.state.password}
                  onChange={this._handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </FormGroup>
              <Button color="success" type="submit" onClick={this._userSignIn}>
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      );
    }
  }
  
  export default SignIn;