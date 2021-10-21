import React, { Component } from "react";
import "./Nav.scss";
import Web3 from "web3";
import Config from "../config";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top flex-md-nowrap p-0 shadow">
        <a className="navbar-brand" href="/">
          Serapeum
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
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
      </nav>
    );
  }
}

export default Nav;
