import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SignupEmailEnter({onSendVerificationCodeClick}) {
    let textInput = React.createRef();

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    placeholder="Enter your email"
                    type="email"
                    ref={textInput}
                    required
                />
            </Form.Group>

            <Button 
                variant="primary" 
                className="float-end"
                onClick={(event) => {
                    const form = event.currentTarget;
                    if (form.checkValidity() === false) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                    onSendVerificationCodeClick(textInput.current.value);
                }}
            >
                Next
            </Button>
        </Form>
    )
}