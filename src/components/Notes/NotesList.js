import React, {Component} from 'react';

const NotesList = () => {
    <div className="container">
        <center><h1 className="bgf">Notes List</h1></center>
    </div>
};

class NotesListForm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = event => {

    }

    onChange = event => {

    };

    render() {
        return (
          <form onSubmit={this.onSubmit}>
          </form>
        );
      }
}


export default NotesListForm;
export { NotesList };