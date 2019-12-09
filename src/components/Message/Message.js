import React, { Component } from 'react';
import fire from '../Firebase/fire';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }

    componentDidMount() {
        this.retrieveMessageData();
    }

    messageDataEntry = () => {
        fire.database().ref('MessageList').set(this.state);
        console.log('DATA SAVED');
    }

    retrieveMessageData = () => {
        let ref = fire.database().ref('MessageList');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
        console.log('DATA RETRIEVED');
    }

    addMessage(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push(this.inputMessage.value);
        this.inputMessage.value = ''; // <- clear the input
    }

    render() {
        const { messages } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className='col-xl-12'>
                        <center><h1 className="bgf">Add A New Note</h1></center>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xl-12'>
                        {
                            messages
                                .map(developer =>
                                    <div key={messages.uid} className="card float-left" style={{ width: '18rem', marginRight: '1rem' }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{messages.title}</h5>
                                            <p className="card-text">{messages.message}</p>
                                            <button onClick={() => this.removeData(messages)} className="btn btn-link">Delete</button>
                                            <button onClick={() => this.updateData(messages)} className="btn btn-link">Edit</button>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xl-12'>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <input type='hidden' ref='uid' />
                                <div className='row'>
                                    <div className="form-group col-md-12">
                                        <h3>Title</h3>
                                        <input type="text" ref='noteTitle' className="form-control" placeholder="Enter Title of Notes" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className='row'>
                                    <div className="form-group col-md-12">
                                        <h3>Note</h3>
                                        <textarea rows="4" cols="120" ref='note' className="form-control" placeholder="Enter Note Here" />
                                    </div>
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
        let noteTitle = this.refs.noteTitle.value;
        let note = this.refs.note.value;
        let uid = this.refs.uid.value;

        if (uid && noteTitle && note) {
            const { messages } = this.state;
            const mesIndex = messages.findIndex(data => {
                return data.uid === uid
            });
            messages[mesIndex].noteTitle = noteTitle;
            messages[mesIndex].note = note;
            this.setState({ messages });
        }
        else if (noteTitle && note) {
            const uid = new Date().getTime().toString();
            const { messages } = this.state;
            messages.push({ uid, noteTitle, note })
            this.setState({ messages });
        }

        this.refs.noteTitle.value = '';
        this.refs.note.value = '';
        this.refs.uid.value = '';
    }

    removeData = (message) => {
        const { messages } = this.state;
        const newState = messages.filter(data => {
            return data.uid !== message.uid;
        });
        this.setState({ messages: newState });
    }

    updateData = (message) => {
        this.refs.uid.value = message.uid;
        this.refs.noteTitle.value = message.noteTitle;
        this.refs.note.value = message.note;
    }
}

export default Message;