import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SignupVerifyEmailCode ({onVerifyCodeClick}) {
    let textInput = React.createRef();

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control  
                    placeholder="Code"
                    type="text"
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
                    onVerifyCodeClick(textInput.current.value);
                }}
            >
                Next
            </Button>
        </Form>
    )

}