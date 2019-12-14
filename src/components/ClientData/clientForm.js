import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import fire from '../Firebase/fire';

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessName: "",
            businessEmail: "",
            businessNumber: "",
            contactName: "",
            contactEmail: "",
            contactNumber: "",
            dataClient: [],
            clientList: []
        };
    }
    componentDidMount() {
        const clientEntry = fire.database().ref("client/");
        clientEntry.on("value", snapshot => {
            const clientEntryFromDatabase = snapshot.val();
            if (clientEntryFromDatabase === null) {
                console.log("Client at our firebase is null");
            } else {
                const clients = Object.keys(snapshot.val()).map(key => {
                    return {
                        key: key,
                        businessName: clientEntryFromDatabase[key].businessName,
                        businessEmail: clientEntryFromDatabase[key].businessEmail,
                        businessNumber: clientEntryFromDatabase[key].businessNumber,
                        contactName: clientEntryFromDatabase[key].contactName,
                        contactEmail: clientEntryFromDatabase[key].contactEmail,
                        contactNumber: clientEntryFromDatabase[key].contactNumber,
                        listKey: clientEntryFromDatabase[key].listKey
                    };
                });
                this.setState({
                    dataClient: clients
                });
            }
        })
    }

    _handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    _saveClient = (key, title, index, e) => {
        if (this.state.businessName === "" ||
            this.state.businessEmail === "" ||
            this.state.businessNumber === "" ||
            this.state.contactName === "" ||
            this.state.contactEmail === "" ||
            this.state.contactNumber === "") {
            alert("Client information cannot be empty");
        } else {
            const newClientKey = fire
                .database()
                .ref("clients/")
                .push().key;

            fire
                .database()
                .ref("clients/")
                .update({
                    [newClientKey]: {
                        listKey: key.key,
                        businessName: title.title
                    }
                });

            this.setState({
                businessName: "",
                businessEmail: "",
                businessNumber: "",
                contactName: "",
                contactEmail: "",
                contactNumber: ""
            });
        }
    };

    _handleDeleteClient = key => {
        fire
            .database()
            .ref(`cards/${key}`)
            .remove();

        console.log("Successfully deleted Client");
        const myClientLength = this.state.dataClient.length;
        // console.log(myCardLength)
        if (myClientLength === 1) {
            this.setState({
                dataClient: []
            });
        }
    };

    toggle = e => {
        this.setState(prevState => ({
            editing: !prevState.editing
        }));
    };

    render() {
        return (
            <div className="container">
                <Form>
                    <FormGroup>
                        <h3 for="businessName">Business Name:</h3>
                        <Input 
                            type="text" 
                            name="businessName"
                            placeholder="Add Name of Business" 
                            value={this.state.businessName}
                            onChange={this.state._handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h3 for="businessEmail">Business Email:</h3>
                        <Input 
                            type="text" 
                            name="businessEmail"
                            placeholder="Enter Business email" 
                            value={this.state.businessEmail}
                            onChange={this.state._handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h3 for="businessNumber">Business Phone:</h3>
                        <Input 
                            type="text" 
                            name="businessNumber"
                            placeholder="Enter Business Phone #" 
                            value={this.state.businessNumber}
                            onChange={this.state._handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h3 for="contactName">Contact Name:</h3>
                        <Input 
                            type="text" 
                            name="businessName"
                            placeholder="Add Name of Contact" 
                            value={this.state.contactName}
                            onChange={this.state._handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h3 for="contactEmail">Contact Email:</h3>
                        <Input 
                            type="text" 
                            name="contactEmail"
                            placeholder="Enter contact person email" 
                            value={this.state.contactEmail}
                            onChange={this.state._handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h3 for="contactNumber">Contact Phone:</h3>
                        <Input 
                            type="text" 
                            name="contactNumber"
                            placeholder="Enter Contact Person's Phone #" 
                            value={this.state.contactNumber}
                            onChange={this.state._handleChange}
                        />
                    </FormGroup>
                    <Button onClick={() => this._saveClient()}>Save</Button>
                </Form>
            </div>
        );
    }
}

export default ClientForm;