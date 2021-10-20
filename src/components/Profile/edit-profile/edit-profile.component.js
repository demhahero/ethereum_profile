import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { Form, Button } from "react-bootstrap";
import Token from "../../../abis/Token.json";
import Web3 from "web3";

class EditProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      account: "",
      balance: 0,
      editorState: EditorState.createEmpty(),
      token: null,
    };
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      //load balance
      if (typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({ account: accounts[0], balance: balance, web3: web3 });
      } else {
        window.alert("Please login with MetaMask");
      }
      //load contracts
      try {
        const token = new web3.eth.Contract(
          Token,
          "0xA07A5731ed06Dc1a21A497902F9fa4edeeb99F8F"
        );
        //const hash = await token.methods.getProfile(this.state.account).call();
        const balance =
          (await token.methods.balanceOf(this.state.account).call()) / 10 ** 18;
        this.setState({ token: token, balance: balance });
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  async onEditorStateChange(state) {
    this.setState({ editorState: state });
  }

  async doTransaction(hash, content) {
    try {
      this.setState({ transaction: true });
      await this.state.token.methods
        .changeProfile(hash)
        .send({ from: this.state.account })
        .on("confirmation", (reciept) => {
          this.editProfile(content);
        });
    } catch (e) {
      console.log("Error, deposit: ", e);
    }
  }

  async editProfile(content) {
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: "content=" + content,
    };

    await fetch(
      "http://localhost/kontrol/api.php?do=update&address=" +
        this.state.account,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response["result"] === true) {
          alert("Done");
        } else {
          alert("Wrong Code, try again!");
        }
      });
  }

  render() {
    return (
      <Form>
        <Form.Group className="mb-3" style={{ minHeight: "400px" }}>
          <Form.Label>Content</Form.Label>
          <Editor
            onEditorStateChange={(state) => {
              this.onEditorStateChange(state);
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="float-end"
          onClick={() => {
            const content = stateToHTML(
              this.state.editorState.getCurrentContent()
            );
            const requestOptions = {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
              }),
              body: "content=" + content,
            };
            fetch(
              "http://localhost/kontrol/api.php?do=get_hash_for_user&address=" +
                this.state.account,
              requestOptions
            )
              .then((response) => response.json())
              .then((response) => {
                if (response["result"] === true) {
                  this.doTransaction(response["hash"], content);
                } else {
                  alert("Wrong Code, try again!");
                }
              });
          }}
        >
          Update
        </Button>
      </Form>
    );
  }
}

export default EditProfileComponent;
