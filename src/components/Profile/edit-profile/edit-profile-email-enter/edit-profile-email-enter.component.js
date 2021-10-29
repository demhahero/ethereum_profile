import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function EditProfileEmailEnter({
  onSendVerificationCodeClick,
  skipEmail,
}) {
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

      <Row className="mb-3 float-end">
        <Form.Group as={Col} className="mb-3">
          <Button
            variant="danger"
            as={Col}
            onClick={(event) => {
              skipEmail();
            }}
          >
            Skip
          </Button>
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
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
        </Form.Group>
      </Row>
    </Form>
  );
}
