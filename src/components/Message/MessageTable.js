import React, { Component } from 'react';
import fire from '../Firebase/fire';
import * as ReactTable from 'react-table';

class NotesTable extends Component {
    state = { data: [] };

    componentDidMount() {
        const database = fire.database().ref("NotesList");

        database.on("value", snapshot => {
            const data = [];

            snapshot.forEach(childSnapShot => {
                const message = {
                    Title: childSnapShot.key.toString(),
                    Note: childSnapShot.key.toString()
                };

                data.push(message);
            });

            this.setState(prevState => {
                return { data: [...prevState.data, ...data] };
            });
        });
    }

    render() {
        const columns = [
            {
                Header: 'Note Title',
                accessor: 'Title'
            }, {
                Header: 'Note Text',
                accessor: 'Note',
            },
        ];

        return (
            <div>
                <ReactTable data={this.state.data} columns={columns} />
            </div>
        );
    }
}
export default NotesTable;