import React, { Component } from 'react';
import { Table } from 'reactstrap';
import fire from '../Firebase/fire';
import FormModal from './formModal';

class ClientList extends Component {
    render() {
        return (
            <div className="container">
                <FormModal />
                <br />
                <Table striped hover dark responsive>
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>Business</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ClientList;