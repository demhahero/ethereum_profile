import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function EditProfileContentEnter({
  onContentEnterClick,
  backToEmail,
  enable_next,
  contentVal,
}) {
  let textInput = React.createRef();
  var stateFromHTML = require("draft-js-import-html").stateFromHTML;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(stateFromHTML(contentVal))
  );

  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  return (
    <Form>
      <Form.Group className="mb-3" style={{ minHeight: "400px" }}>
        <Form.Label>Content</Form.Label>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          ref={textInput}
        ></Editor>
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
            disabled={!enable_next}
            onClick={(event) => {
              onContentEnterClick(stateToHTML(editorState.getCurrentContent()));
            }}
          >
            Next
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
}
