import React from 'react';
import { Form, Input, Button } from 'reactstrap';

class Contact extends React.Component {
    onSubmit = () => {
        this.props.history.push('/index')
    }
    render() {
        return (
            <div className="container">
                <center><h1 className="bgf">Contact Form</h1></center>
                <Form>
                    <Input placeholder="full name" type="text" />
                    <Input placeholder="email address" type="text" />
                    <br/>
                    <Input required type='textarea' maxLength='500' name='message' id='message' rows={4} placeholder='please provide us with your request' aria-multiline='true'/>
                    <Button onClick={this.onSubmit}>Submit</Button>
                </Form>
            </div>
        )
    }
}
export default Contact