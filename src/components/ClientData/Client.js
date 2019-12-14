import React, { Component } from 'react';
import ClientList from './clientList';

class Client extends Component {
  render() {
    return (
      <div className="container">
        <ClientList />
      </div>
    );
  }
}

export default Client;