import React from "react";
import { Form, Button } from "react-bootstrap";

export default function SignupEmailEnter({ onSendVerificationCodeClick }) {
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
          let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

          if (re.test(textInput.current.value)) {
            onSendVerificationCodeClick(textInput.current.value);
          } else {
            alert("Email format is not correct");
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        Next
      </Button>
    </Form>
  );
}
