import React from 'react';
import fire from "../Firebase/fire";
class User extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            fullname: ''
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    addUser = e => {
        e.preventDefault();
        const db = fire.firestore();
        db.settings({
          timestampsInSnapshots: true
        });
        const userRef = db.collection('users').add({
          fullname: this.state.fullname,
          email: this.state.email,
          role: this.state.role
        });  
        this.setState({
          fullname: '',
          email: '',
          role: ''
        });
      };
    render() {
        return (
            <form onSubmit={this.addUser}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    onChange={this.updateInput}
                    value={this.state.fullname}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Add Email"
                    onChange={this.updateInput}
                    value={this.state.email}
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Add Role"
                    onChange={this.updateInput}
                    value={this.state.role}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}
export default User;