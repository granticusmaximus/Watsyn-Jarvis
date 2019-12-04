import React from 'react';
import { Form, Input, Table } from 'reactstrap';
import fire from '../Firebase/fire';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notes: [] }; // <- set up react state
    }
    componentWillMount() {
        /* Create reference to notes in Firebase Database */
        let notesRef = fire.database().ref('notes').orderByKey().limitToLast(100);
        notesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let notes = { text: snapshot.val(), id: snapshot.key };
            this.setState({ notes: [notes].concat(this.state.notes) });
        })
    }
    addNote(e) {
        e.preventDefault(); // <- prevent form submit from reloading the page

        /* Send the note title to Firebase */
        fire.database().ref('notes').push(this.typeTitle.value);
        this.typeTitle.value = ''; // <- clear the input

        /* Send the note title to Firebase */
        fire.database().ref('notes').push(this.typeNote.value);
        this.typeNote.value = ''; // <- clear the input
    }
    render() {
        return (
            <div className="container">
                <center><h1 className="bgf">Add A New Note</h1></center>
                <Form onSubmit={this.addNote.bind(this)}>
                    <Input placeholder="Title of Note" type="text" ref={el => this.typeTitle = el} />
                    <br />
                    <Input required type='textarea' maxLength='500' name='message' id='message' rows={4} placeholder='please provide note' aria-multiline='true' ref={tw => this.typeNote = tw} />
                    <br />
                    <br />
                    <input type="submit" onClick={this.onSubmit} />
                </Form>
                <br />
                <hr />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Context</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        { /* Render the list of notes */
                            this.state.notes.map( notes => <td key={notes.id}>{notes.text}</td> )
                        }
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default Notes