import React, { Component } from 'react';
import fire from '../Firebase/fire';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }
    componentWillMount() {
        /* Create reference to messages in Firebase Database */
        let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(1000);
        messagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let message = { text: snapshot.val(), id: snapshot.key };
            this.setState({ messages: [message].concat(this.state.messages) });

            
        })
    }
    addMessage(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push(this.inputMessage.value);
        this.inputMessage.value = ''; // <- clear the input
    }

    render() {
        return (
            <div className="container">
                <center><h1 className="bgf">Add A New Note</h1></center>
                <form onSubmit={this.addMessage.bind(this)}>

                    <h3>Note Entry</h3>
                    <input ref={el => this.inputMessage = el} />
                    <br/>
                    <input class="btn btn-success" type="submit" value="Save" />

                </form>
                <hr />
                <ListGroup>
                    { /* Render the list of messages */
                        this.state.messages.map(message => <ListGroupItem tag="a" href="#" action key={message.id}>{message.text}</ListGroupItem>)
                    }
                </ListGroup>
            </div>
        );
    }
}

export default Message;