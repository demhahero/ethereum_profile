import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../Wallet/connectors";
import "./connect.component.scss";
import { useHistory } from "react-router-dom";

export default function ConnectToWallet() {
  const { active, account, activate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("connected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  // async function disconnect() {
  //   try {
  //     deactivate();
  //     localStorage.setItem("connected", false);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }
  const history = useHistory();
  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      history.push("/NoWallet");
      //window.alert("Please install MetaMask");
    }

    if (localStorage.getItem("connected") !== false) {
      activate(injected);
    }
  }, [activate, history]);

  return (
    <div className="flex flex-col items-center justify-center">
      {active && localStorage.getItem("connected") ? (
        <div>
          <span>
            <b>{account}</b>
          </span>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={connect}
          >
            Connect to MetaMask
          </button>
        </div>
      )}
    </div>
  );
}
