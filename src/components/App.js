import React, { Component } from "react";
import Token from "../abis/Token.json";
import Web3 from "web3";
import "./App.scss";
import { Tabs, Tab } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import HomeComponent from "./Home/home.component";
import SearchMainComponent from "./Search/search-main/search-main.component";
import SginupComponent from "./Signup/signup.component";
import ProfileComponent from "./Profile/profile-main.component";
import EditProfileComponent from "./Profile/edit-profile/edit-profile.component";
import Footer from "./Footer";
import Config from "../config";
import { Web3ReactProvider } from "@web3-react/core";

class App extends Component {
  async componentWillMount() {
    //await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      //const netId = await web3.eth.net.getId()
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
          "0xb062802b06Cb88E82F1bC8F3C2F29097c6bBf3Fa"
        );
        //const hash = await token.methods.getProfile(this.state.account).call();
        const balance =
          (await token.methods.balanceOf(this.state.account).call()) / 10 ** 18;
        fetch(Config.API_URL + "?do=getprofile&address=" + this.state.account)
          .then((response) => response.json())
          .then((data) => this.setState({ profile_value: data["value"] }));

        this.setState({ token: token, balance: balance });
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  async totalSupply(e) {
    try {
      const totalSupply = await this.state.token.methods.totalSupply().call();
      const profile_value = await this.state.token.methods
        .getProfile(this.state.account)
        .call();
      this.setState({ totalSupply: totalSupply, profile_value: profile_value });
    } catch (e) {
      console.log("Error, deposit: ", e);
    }
    console.log("ff");
  }

  async setProfile(value) {
    try {
      await this.state.token.methods
        .changeProfile(value)
        .send({ from: this.state.account });
      fetch(
        Config.API_URL +
          "?do=update_value&address=" +
          this.state.account +
          "&value=" +
          value
      ).then((response) => response.json());
      const profile_value = await this.state.token.methods
        .getProfile(this.state.account)
        .call();
      const balance =
        (await this.state.token.methods.balanceOf(this.state.account).call()) /
        10 ** 18;
      this.setState({ profile_value: profile_value, balance: balance });
    } catch (e) {
      console.log("Error, deposit: ", e);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      web3: "undefined",
      account: "",
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null,
      totalSupply: 1,
      profile: null,
      profile_value: "",
    };
  }

  getLibrary(provider) {
    return new Web3(provider);
  }

  render() {
    return (
      <Web3ReactProvider getLibrary={this.getLibrary}>
        <Router>
          <div className="text-monospace">
            <div className="container-fluid mt-5 text-center">
              <Nav />
              <Switch>
                <Route exact path="/">
                  <HomeComponent />
                </Route>
                <Route path="/Profile">
                  <ProfileComponent />
                </Route>
                <Route path="/Edit-profile">
                  <EditProfileComponent />
                </Route>
                <Route path="/Search">
                  <SearchMainComponent />
                </Route>
                <Route path="/Signup">
                  <SginupComponent />
                </Route>
                <Route path="/Login">
                  <br></br>
                  <h1>Welcome to Profiles</h1>
                  <h2>{this.state.account}</h2>
                  <br></br>
                  <div className="row">
                    <main role="main" className="col-lg-12  text-center">
                      <div className="content mr-auto ml-auto">
                        <Tabs
                          defaultActiveKey="profile"
                          id="uncontrolled-tab-example"
                        >
                          <Tab eventKey="profile" title="Profile">
                            <div>
                              Balance: {this.state.balance}
                              <br></br>
                              Profile: {this.state.profile_value}
                            </div>
                          </Tab>
                          <Tab eventKey="withdraw" title="Update">
                            <div>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  this.setProfile(this.profile_value.value);
                                }}
                              >
                                <div className="form-group mr-sm-2">
                                  <br></br>
                                  <textarea
                                    id="profile_value"
                                    ref={(input) => {
                                      this.profile_value = input;
                                    }}
                                    className="form-control form-control-md"
                                    defaultValue={this.state.profile_value}
                                    required
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Save
                                </button>
                              </form>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </main>
                  </div>
                </Route>
              </Switch>
              <Footer />
            </div>
          </div>
        </Router>
      </Web3ReactProvider>
    );
  }
}

export default App;
