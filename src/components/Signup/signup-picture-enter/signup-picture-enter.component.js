import React, { Component } from "react";
import axios from "axios";
import { Form, Button, ProgressBar } from "react-bootstrap";
import Config from "../../../config";

class SignupPictureEnter extends Component {
  UPLOAD_ENDPOINT = Config.UPLOAD_URL + "?address=";
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      progress: 0,
      disabled: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  async onSubmit(e) {
    e.preventDefault();
    let res = await this.uploadFile(this.state.file);
    console.log(res.data);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
    this.uploadFile(this.state.file);
  }

  async uploadFile(file) {
    const formData = new FormData();
    this.setState({ progress: 0 });
    this.setState({ disabled: true });
    formData.append("picture", file);
    return await axios.post(
      this.UPLOAD_ENDPOINT + this.props.address,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          this.setState({ progress: percentCompleted });
          console.log(percentCompleted);
          if (percentCompleted === 100) {
            this.setState({ disabled: false });
          }
        },
      }
    );
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            placeholder="Enter your email"
            type="file"
            onChange={this.onChange}
          />
          <ProgressBar variant="success" striped now={this.state.progress} />
        </Form.Group>
        <Button
          disabled={this.state.disabled}
          variant="primary"
          className="float-end"
          onClick={() => {
            this.props.onPictureEnterClick();
          }}
        >
          Next
        </Button>
      </Form>
    );
  }
}

export default SignupPictureEnter;
