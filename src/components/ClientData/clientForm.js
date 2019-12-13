import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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

    render() {
      return <h2>Hi, I am a Client Form!</h2>;
    }
}

export default ClientForm;