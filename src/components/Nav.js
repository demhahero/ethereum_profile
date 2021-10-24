import React, { Component } from "react";
import "./Nav.scss";
import Web3 from "web3";
import Config from "../config";
import ConnectToWallet from "./Home/connect-button/connect.component";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      account: "",
      balance: 0,
      id: null,
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
        this.getID();
      } else {
        this.setState({ id: "" });
      }
    } else {
      this.setState({ id: "" });
    }
  }

  async getID() {
    fetch(Config.API_URL + "?do=get_profile&address=" + this.state.account)
      .then((response) => response.json())
      .then((response) => {
        if (response["result"] === true) {
          this.setState({ id: response["id"] });
        } else {
        }
      });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top flex-md-nowrap p-0 shadow justify-content-between">
        <a className="navbar-brand margin-xs" href="/">
          Serapeum
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/Search">
                Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={"/Profile?id=" + this.state.id}>
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Edit-profile">
                Edit Profile
              </a>
            </li>
          </ul>
        </div>
        <div className="inline my-2 my-lg-0">
          <ConnectToWallet />
        </div>
      </nav>
    );
  }
}

export default Nav;
