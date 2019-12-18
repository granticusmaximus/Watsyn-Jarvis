import React, { Component } from 'react';
import fire from '../Firebase/fire';

class UserIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      developers: []
    }
  }
  writeUserData = () => {
    fire.database().ref('employees').set(this.state);
    console.log('DATA SAVED');
  }

  getUserData = () => {
    let ref = fire.database().ref('employees');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
    console.log('DATA RETRIEVED');
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    // only write when it's different with the new state
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }
  render() {
    const { developers } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className='col-xl-12'>
            <center><h1 className="bgf">Team List</h1></center>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            {
              developers
                .map(developer =>
                  <div key={developer.uid} className="card float-left" style={{ width: '18rem', marginRight: '1rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">{developer.name}</h5>
                      <p className="card-text">{developer.role}</p>
                      <p className="card-text">{developer.email}</p>
                      <button onClick={() => this.removeData(developer)} className="btn btn-link">Delete</button>
                      <button onClick={() => this.updateData(developer)} className="btn btn-link">Edit</button>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            <h1>Add new team member here</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <input type='hidden' ref='uid' />
                <div className="form-group col-md-4">
                  <h4>Name</h4>
                  <input type="text" ref='name' className="form-control" placeholder="Name" />
                </div>
                <div className="form-group col-md-4">
                  <h4>Email</h4>
                  <input type="email" ref='email' className="form-control" placeholder="Email" />
                </div>
                <div className="form-group col-md-4">
                  <h4>Role</h4>
                  <input type="text" ref='role' className="form-control" placeholder="Role" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let name = this.refs.name.value;
    let role = this.refs.role.value;
    let email = this.refs.email.value;
    let uid = this.refs.uid.value;

    if (uid && name && role && email) {
      const { developers } = this.state;
      const devIndex = developers.findIndex(data => {
        return data.uid === uid
      });
      developers[devIndex].name = name;
      developers[devIndex].role = role;
      developers[devIndex].email = email;
      this.setState({ developers });
    }
    else if (name && role) {
      const uid = new Date().getTime().toString();
      const { developers } = this.state;
      developers.push({ uid, name, email, role })
      this.setState({ developers });
    }

    this.refs.name.value = '';
    this.refs.role.value = '';
    this.refs.email.value = '';
    this.refs.uid.value = '';
  }

  removeData = (developer) => {
    const { developers } = this.state;
    const newState = developers.filter(data => {
      return data.uid !== developer.uid;
    });
    this.setState({ developers: newState });
  }

  updateData = (developer) => {
    this.refs.uid.value = developer.uid;
    this.refs.name.value = developer.name;
    this.refs.role.value = developer.role;
    this.refs.email.value = developer.email;
  }
};

export default UserIndex;