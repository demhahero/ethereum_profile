import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

class SignupPictureEnter extends Component {
    UPLOAD_ENDPOINT =  'http://127.0.0.1/kontrol/upload.php?address='
    constructor(props) {
        super(props);
        this.state ={
          file:null
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }
    async onSubmit(e){
        e.preventDefault() 
        let res = await this.uploadFile(this.state.file);
        console.log(res.data);
    }
    
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }

    async uploadFile(file){
        
        const formData = new FormData();
        
        formData.append('picture',file)
        return  await axios.post(this.UPLOAD_ENDPOINT+this.props.address, formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
      }
    
      render() {
        return (
            <Form onSubmit={ this.onSubmit }>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control 
                    placeholder="Enter your email"
                    type="file"
                    onChange={ this.onChange }
                />
                </Form.Group>
                <Button 
                    variant="primary"
                    className="float-end"
                    onClick={() => {
                        this.uploadFile(this.state.file)
                        this.props.onPictureEnterClick();
                    }}
                >
                    Next
                </Button>
            </Form>
        )
      }
}

export default SignupPictureEnter;