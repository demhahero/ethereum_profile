import React from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../Wallet/connectors";
import "./connect.component.scss";
import { Button } from "react-bootstrap";

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
      <Button onClick={connect}>Connect to MetaMask</Button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <Button onClick={disconnect}>Disconnect</Button>
    </div>
  );
}
