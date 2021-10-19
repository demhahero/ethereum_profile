import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {stateToHTML} from 'draft-js-export-html';
import { Form, Button } from 'react-bootstrap';

export default function SignupContentEnter({data, onContentEnterClick}) {
    let textInput = React.createRef();

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        console.log(editorState);
    }, [editorState]);

    return (
        <Form>
            <Form.Group className="mb-3" style={{ minHeight: '400px' }}>
                <Form.Label>Content</Form.Label>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    ref={textInput}
                />
            </Form.Group>
            <Button 
                variant="primary" 
                className="float-end"
                onClick={() => {
                    onContentEnterClick(stateToHTML(editorState.getCurrentContent()));
                }}
            >
                Next
            </Button>
        </Form>
    );
}