import React from "react";
import { Form, Button } from "react-bootstrap";

export default function SignupIDEnter({ data, onIDEnterClick }) {
  let textInput = React.createRef();
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control placeholder="ID" ref={textInput} required />
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
          onIDEnterClick(textInput.current.value);
        }}
      >
        Next
      </Button>
    </Form>
  );
}
