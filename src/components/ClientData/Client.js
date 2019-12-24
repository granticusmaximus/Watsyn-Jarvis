import React, { Component } from 'react';
import fire from '../Firebase/fire';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: []
    }
  }

  _handleEdit = () => {
    const { editCardName, keyCard, keyList } = this.state;
    // console.log(editCardName);
    // console.log(keyCard);

    if (editCardName !== "") {
      // console.log("You can edit");

      fire
        .database()
        .ref("cards/")
        .update({
          [keyCard]: {
            cardName: editCardName,
            listKey: keyList
          }
        });
    } else {
      // console.log("You can't edit");
      alert("Card cannot be empty");
    }
  };

  writeClientData = () => {
    fire.database().ref('clients').set(this.state);
    console.log('DATA SAVED');
  }

  getClientData = () => {
    let ref = fire.database().ref('clients');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
    console.log('DATA RETRIEVED');
  }

  componentDidMount() {
    this.getClientData();
  }

  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    // only write when it's different with the new state
    if (prevState !== this.state) {
      this.writeClientData();
    }
  }
  render() {
    const { clients } = this.state;
    return (
      <div className="container">

        <div className='row'>
          <div className='col-xl-12'>
            <h2>Add new clients here</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <input type='hidden' ref='uid' />
                <div className="form-group col-md-6">
                  <h4>Business Name</h4>
                  <input type="text" ref='businessName' className="form-control" placeholder="Enter Business Name" />
                </div>
                <div className="form-group col-md-6">
                  <h4>Business Email</h4>
                  <input type="email" ref='businessEmail' className="form-control" placeholder="Enter Business Email" />
                </div>

              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <h4>Business Phone</h4>
                  <input type="text" ref='businessPhone' className="form-control" placeholder="Enter Business Phone" />
                </div>
              </div>
              <div className="form-row">
                <input type='hidden' ref='uid' />
                <div className="form-group col-md-12">
                  <h4>Notes</h4>
                  <input type="textarea" ref='businessNotes' className="form-control" placeholder="Enter Notes here" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className='col-xl-12'>
            <center><h1 className="bgf">Client List</h1></center>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            {
              clients
                .map(clients =>
                  <div key={clients.uid} className="card float-left" style={{ width: '550px', marginRight: '1rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">{clients.businessName}</h5>
                      <p className="card-text">{clients.businessEmail}</p>
                      <p className="card-text">{clients.businessPhone}</p>
                      <p className="card-text">{clients.businessNotes}</p>
                      <center>
                        <button onClick={this.showModal} className="btn btn-link">View Client</button>{' '}
                        <button onClick={() => this.removeData(clients)} className="btn btn-link">Delete</button>{' '}
                        <button onClick={() => this.updateData(clients)} className="btn btn-link">Edit</button>
                      </center>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let businessName = this.refs.businessName.value;
    let businessEmail = this.refs.businessEmail.value;
    let businessPhone = this.refs.businessPhone.value;
    let businessNotes = this.refs.businessNotes.value;
    let uid = this.refs.uid.value;

    if (uid && businessName && businessEmail && businessPhone && businessNotes) {
      const { clients } = this.state;
      const clientIndex = clients.findIndex(data => {
        return data.uid === uid
      });
      clients[clientIndex].businessName = businessName;
      clients[clientIndex].businessEmail = businessEmail;
      clients[clientIndex].businessPhone = businessPhone;
      clients[clientIndex].businessNotes = businessNotes;
      this.setState({ clients });
    }
    else if (businessName && businessEmail) {
      const uid = new Date().getTime().toString();
      const { clients } = this.state;
      clients.push({ uid, businessName, businessEmail, businessPhone, businessNotes })
      this.setState({ clients });
    }

    this.refs.businessName.value = '';
    this.refs.businessEmail.value = '';
    this.refs.businessPhone.value = '';
    this.refs.businessNotes.value = '';
  }

  removeData = (client) => {
    const { clients } = this.state;
    const newState = clients.filter(data => {
      return data.uid !== client.uid;
    });
    this.setState({ clients: newState });
  }

  updateData = (client) => {
    this.refs.uid.value = client.uid;
    this.refs.businessName.value = client.businessName;
    this.refs.businessEmail.value = client.businessEmail;
    this.refs.businessPhone.value = client.businessPhone;
    this.refs.businessNotes.value = client.businessNotes;
  }
};

export default Client;