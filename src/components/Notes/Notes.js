import React from 'react';
import { Form, Input, Button } from 'reactstrap';

class Notes extends React.Component {
    onSubmit = () => {
        this.props.history.push('/index')
    }
    render() {
        return (
            <div className="container">
                <center><h1 className="bgf">Notes Form</h1></center>
                <Form>
                    <Input placeholder="Title of Note" type="text" />
                    <br/>
                    <Input required type='textarea' maxLength='500' name='message' id='message' rows={4} placeholder='please provide note' aria-multiline='true'/>
                    <br/>
                    <Button color="success" onClick={this.onSubmit}>Submit</Button>
                </Form>
            </div>
        )
    }
}
export default Notes