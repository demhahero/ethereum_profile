import React, { Component } from "react";
import "./Nav.scss";
import Web3 from "web3";

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
        window.alert("Please login with MetaMask");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  async getID() {
    fetch(
      "http://localhost/kontrol/api.php?do=get_profile&address=" +
        this.state.account
    )
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
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top flex-md-nowrap p-0 shadow">
        <a class="navbar-brand" href="/">
          Serapeum
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/Search">
                Search
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={"/Profile?id=" + this.state.id}>
                Profile
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Edit-profile">
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
