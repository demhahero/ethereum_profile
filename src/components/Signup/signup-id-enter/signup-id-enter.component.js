import React from "react";
import { Form } from "react-bootstrap";

export default function SignupIDEnter({ onIDEnterClick }) {
  let textInput = React.createRef();
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control
          placeholder="ID"
          ref={textInput}
          required
          onChange={(event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            onIDEnterClick(textInput.current.value);
          }}
        />
      </Form.Group>
    </Form>
  );
}
