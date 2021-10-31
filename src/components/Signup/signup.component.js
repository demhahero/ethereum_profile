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
import {
  ProgressBar,
  Alert,
  Card,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Config from "../../config";

class SginupComponent extends Component {
  steps = 4;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      step: 1,
      code_verified: false,
      id: "",
      content: "",
      account: "",
      balance: 0,
      picture: "",
      progress: (1 / this.steps) * 100,
      transaction: false,
      token: null,
      enable_next: false,
      error_message: "",
      isIDValid: null,
    };

    this.onSendVerificationCodeClick =
      this.onSendVerificationCodeClick.bind(this);
    this.onVerifyCodeClick = this.onVerifyCodeClick.bind(this);
    this.onIDEnterClick = this.onIDEnterClick.bind(this);
    this.onPictureEnterClick = this.onPictureEnterClick.bind(this);
    this.onContentEnterClick = this.onContentEnterClick.bind(this);
    this.backToEmail = this.backToEmail.bind(this);
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      //
      //load balance
      if (typeof accounts[0] !== "undefined") {
        await fetch(Config.API_URL + "?do=get_profile&address=" + accounts[0])
          .then((response) => response.json())
          .then((response) => {
            if (response["result"] === true) {
              window.location.href = "/";
            } else {
            }
          });

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
          this.setState({
            email: email,
            step: 2,
            progress: (2 / this.steps) * 100,
          });
        } else {
          alert("Email existed! Choose another one.");
        }
      });
  }

  async backToEmail() {
    this.setState({ step: 1, progress: (1 / this.steps) * 100 });
  }

  async backToID() {
    this.setState({ step: 1, progress: (3 / this.steps) * 100 });
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
            step: 3,
            progress: (3 / this.steps) * 100,
          });
        } else {
          alert("Wrong Code, try again!");
        }
      });
  }

  async onIDEnterClick(id) {
    if (id.length > 5 && id.indexOf(" ") === -1) {
      fetch(Config.API_URL + "?do=check_id&id=" + id)
        .then((response) => response.json())
        .then((response) => {
          if (response["result"] === true) {
            this.setState({ enable_next: true, isIDValid: false, id: id });
          } else {
            this.setState({ error_message: "ID Exists", isIDValid: false });
            this.setState({ enable_next: false });
            alert("ID Exists");
          }
        });
    } else {
      this.setState({
        enable_next: false,
        error_message: "Invalid ID",
        isIDValid: false,
      });
    }
  }

  async onPictureEnterClick() {
    this.setState({
      picture: "yes",
      step: 5,
      progress: (5 / this.steps) * 100,
    });
  }

  async onContentEnterClick(content) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
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
    if (this.state.id.length < 5 || this.state.id.indexOf(" ") !== -1) {
      alert("Invalid ID! ID should be composed of 6 or more digits");
    } else {
      try {
        this.setState({
          step: 4,
          progress: (4 / this.steps) * 100,
        });
        await this.state.token.methods
          .changeProfile(hash)
          .send({ from: this.state.account })
          .on("confirmation", (reciept) => {
            this.createProfile(content);
          });
      } catch (e) {
        alert("Error, deposit: ", e);
      }
    }
  }

  async createProfile(content) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
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
          this.setState({
            content: content,
            step: 5,
            progress: (5 / this.steps) * 100,
          });
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
            if (this.state.step === 1) {
              return (
                <SignupEmailEnter
                  onSendVerificationCodeClick={this.onSendVerificationCodeClick}
                />
              );
            } else if (this.state.step === 2) {
              return (
                <SignupVerifyEmailCode
                  onVerifyCodeClick={this.onVerifyCodeClick}
                  backToEmail={this.backToEmail}
                />
              );
            } else if (this.state.step === 3) {
              return (
                <div>
                  <SignupIDEnter
                    error_message={this.state.error_message}
                    onIDEnterClick={this.onIDEnterClick}
                    isIDValid={this.state.isIDValid}
                  />

                  <SignupPictureEnter
                    onPictureEnterClick={this.onPictureEnterClick}
                    address={this.state.account}
                  />

                  <SignupContentEnter
                    onContentEnterClick={this.onContentEnterClick}
                    backToEmail={this.backToEmail}
                    enable_next={this.state.enable_next}
                  />
                </div>
              );
            } else if (this.state.step === 4) {
              return (
                <Container
                  className="signup-spinner"
                  fluid
                  style={{ width: "100%" }}
                >
                  <Row>
                    <Col>
                      <Alert variant="danger">
                        Please hold on until the transaction goes through! This
                        will take some time.
                      </Alert>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Spinner animation="border" />
                    </Col>
                  </Row>
                </Container>
              );
            } else {
              return <SignupComplete id={this.state.id} />;
            }
          })()}
        </Card>
      </div>
    );
  }
}

export default SginupComponent;
