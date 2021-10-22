import React from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../Wallet/connectors";
import "./connect.component.scss";

export default function ConnectToWallet() {
  const { active, account, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {active ? (
        <div>
          <span>
            <b>{account}</b>
          </span>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={disconnect}
          >
            Disconnect
          </button>
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
