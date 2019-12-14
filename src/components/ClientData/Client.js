import React, { Component } from 'react';
import ClientForm from './clientForm';
import ClientList from './clientList';

class Client extends Component {
  render() {
    return (
      <div className="container">
        <ClientForm />
        <ClientList />
      </div>
    );
  }
}

export default Client;