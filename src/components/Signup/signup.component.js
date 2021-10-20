import React, { Component } from "react";
import "./signup.component.scss";
import Web3 from "web3";
import Token from "../../abis/Token.json";
import SignupEmailEnter from "./signup-email-enter/signup-email-enter.component";
import SignupVerifyEmailCode from "./signup-verify-email-code/signup-verify-email-code.component";
import SignupIDEnter from "./signup-id-enter/signup-id-enter.component";
import SignupComplete from "./signup-complete/signup-complete.component";
import SignupContentEnter from "./signup-content-enter/signup-content-enter.component";
import SignupPictureEnter from "./signup-picture-enter/signup-picture-enter.component";
import { ProgressBar, Alert, Card, Spinner } from "react-bootstrap";
import Config from "../../config";

class SginupComponent extends Component {
  steps = 6;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code_verified: false,
      id: "",
      content: "",
      account: "",
      balance: 0,
      picture: "",
      progress: (1 / this.steps) * 100,
      transaction: false,
      token: null,
    };

    this.onSendVerificationCodeClick =
      this.onSendVerificationCodeClick.bind(this);
    this.onVerifyCodeClick = this.onVerifyCodeClick.bind(this);
    this.onIDEnterClick = this.onIDEnterClick.bind(this);
    this.onPictureEnterClick = this.onPictureEnterClick.bind(this);
    this.onContentEnterClick = this.onContentEnterClick.bind(this);
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

  async onSendVerificationCodeClick(email) {
    fetch(Config.API_URL + "?do=check_email&email=" + email)
      .then((response) => response.json())
      .then((response) => {
        if (response["result"] === true) {
          this.setState({ email: email, progress: (2 / this.steps) * 100 });
        } else {
          alert("Email existed! Choose another one.");
        }
      });
  }

  async onVerifyCodeClick(code) {
    fetch(
      Config.API_URL +
        "?do=verify_email&email=" +
        this.state.email +
        "&code=" +
        code
    )
      .then((response) => response.json())
      .then((response) => {
        if (response["result"] === true) {
          this.setState({
            code_verified: true,
            progress: (3 / this.steps) * 100,
          });
        } else {
          alert("Wrong Code, try again!");
        }
      });
  }

  async onIDEnterClick(id) {
    fetch(Config.API_URL + "?do=check_id&id=" + id)
      .then((response) => response.json())
      .then((response) => {
        if (response["result"] === true) {
          this.setState({ id: id, progress: (4 / this.steps) * 100 });
        } else {
          alert("Wrong Code, try again!");
        }
      });
  }

  async onPictureEnterClick() {
    this.setState({ picture: "yes", progress: (5 / this.steps) * 100 });
  }

  async onContentEnterClick(content) {
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: "content=" + content,
    };
    await fetch(
      Config.API_URL +
        "?do=get_hash&address=" +
        this.state.account +
        "&email=" +
        this.state.email +
        "&id=" +
        this.state.id,
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
  }

  async doTransaction(hash, content) {
    try {
      this.setState({ transaction: true });
      await this.state.token.methods
        .changeProfile(hash)
        .send({ from: this.state.account })
        .on("confirmation", (reciept) => {
          this.createProfile(content);
        });
    } catch (e) {
      console.log("Error, deposit: ", e);
    }
  }

  async createProfile(content) {
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: "content=" + content,
    };

    await fetch(
      Config.API_URL +
        "?do=update&address=" +
        this.state.account +
        "&email=" +
        this.state.email +
        "&id=" +
        this.state.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response["result"] === true) {
          this.setState({ content: content, progress: (6 / this.steps) * 100 });
        } else {
          alert("Wrong Code, try again!");
        }
      });
  }

  render() {
    return (
      <div>
        <Alert variant="info">Current Address: {this.state.account}</Alert>

        <br />
        <br />
        <Card body>
          <ProgressBar now={this.state.progress} />
          <br />
          <br />
          {(() => {
            if (this.state.email === "") {
              return (
                <SignupEmailEnter
                  onSendVerificationCodeClick={this.onSendVerificationCodeClick}
                />
              );
            } else if (this.state.email !== "" && !this.state.code_verified) {
              return (
                <SignupVerifyEmailCode
                  onVerifyCodeClick={this.onVerifyCodeClick}
                />
              );
            } else if (
              this.state.email !== "" &&
              this.state.code_verified &&
              this.state.id === ""
            ) {
              return <SignupIDEnter onIDEnterClick={this.onIDEnterClick} />;
            } else if (
              this.state.email !== "" &&
              this.state.code_verified &&
              this.state.id !== "" &&
              this.state.picture === ""
            ) {
              return (
                <SignupPictureEnter
                  onPictureEnterClick={this.onPictureEnterClick}
                  address={this.state.account}
                />
              );
            } else if (
              this.state.email !== "" &&
              this.state.code_verified &&
              this.state.id !== "" &&
              this.state.picture !== "" &&
              this.state.transaction === false
            ) {
              return (
                <SignupContentEnter
                  onContentEnterClick={this.onContentEnterClick}
                />
              );
            } else if (
              this.state.email !== "" &&
              this.state.code_verified &&
              this.state.id !== "" &&
              this.state.picture !== "" &&
              this.state.transaction === true &&
              this.state.content === ""
            ) {
              return <Spinner animation="border" />;
            } else {
              return (
                <SignupComplete
                  id={this.state.id}
                  email={this.state.email}
                  content={this.state.content}
                />
              );
            }
          })()}
        </Card>
      </div>
    );
  }
}

export default SginupComponent;
