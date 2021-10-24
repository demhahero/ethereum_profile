import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function SignupVerifyEmailCode({
  onVerifyCodeClick,
  backToEmail,
}) {
  let textInput = React.createRef();

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Verification Code</Form.Label>
        <Form.Control placeholder="Code" type="text" ref={textInput} required />
      </Form.Group>

      <Row className="mb-3 float-end">
        <Form.Group as={Col} className="mb-3">
          <Button
            variant="primary"
            as={Col}
            onClick={(event) => {
              backToEmail("");
            }}
          >
            Back
          </Button>
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
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
        </Form.Group>
      </Row>
    </Form>
  );
}
