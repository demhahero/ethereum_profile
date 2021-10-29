import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function EditProfileIDEnter({
  onIDEnterClick,
  error_message,
  idVal,
}) {
  let textInput = React.createRef();
  const [validated, setValidated] = useState(false);
  return (
    <Form noValidate validated={validated}>
      <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control
          placeholder="ID"
          ref={textInput}
          value={idVal}
          required
          onChange={(event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            setValidated(false);
            onIDEnterClick(textInput.current.value);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {error_message}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          ID should be composed of 6 or more digits
        </Form.Text>
      </Form.Group>
    </Form>
  );
}
