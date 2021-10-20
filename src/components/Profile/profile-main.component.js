import React, { useState, useEffect } from "react";
import "./profile-main.component.scss";
import ReactHtmlParser from "react-html-parser";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { CheckCircle, FileEarmarkX } from "react-bootstrap-icons";
import Token from "../../abis/Token.json";
import Web3 from "web3";
import { useLocation } from "react-router-dom";
import Config from "../../config";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProfileComponent() {
  const [id, setID] = useState(0);
  const [email, setEmail] = useState(0);
  const [content, setContent] = useState(0);
  const [address, setAddress] = useState(0);
  const [verified, setVerified] = useState(0);
  let query = useQuery();

  useEffect(() => {
    async function loadBlockchainData() {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        //load balance
        if (typeof accounts[0] !== "undefined") {
          setAddress(accounts[0]);
        } else {
          window.alert("Please login with MetaMask");
        }
        //load contracts
        try {
          const token = new web3.eth.Contract(
            Token,
            "0xA07A5731ed06Dc1a21A497902F9fa4edeeb99F8F"
          );
          const hash = await token.methods.getProfile(accounts[0]).call();

          const requestOptions = {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: "hash=" + hash,
          };

          await fetch(
            Config.API_URL + "?do=get_profile&id=" + query.get("id"),
            requestOptions
          )
            .then((response) => response.json())
            .then((response) => {
              if (response["result"] === true) {
                setID(response["id"]);
                setEmail(response["email"]);
                setContent(response["content"]);
                setAddress(response["address"]);
                setVerified(response["verified"]);
              } else {
                alert("Profile does not exist!");
              }
            });
        } catch (e) {
          console.log("Error", e);
          window.alert("Contracts not deployed to the current network");
        }
      } else {
        window.alert("Please install MetaMask");
      }
    }

    loadBlockchainData();
  });

  return (
    <Card body>
      <Container fluid>
        <Row>
          <Col>
            <Image
              src={Config.UPLOAD_Folder_URL + address + ".png"}
              thumbnail
            />
          </Col>
          <Col>ID: {id}</Col>
          <Col>{verified ? <CheckCircle /> : <FileEarmarkX />}</Col>
        </Row>
        <Row>
          <Col>{address}</Col>
        </Row>
        <Row>
          <Col>{email}</Col>
        </Row>
        <Row>
          <Col>{ReactHtmlParser(content)}</Col>
        </Row>
      </Container>
    </Card>
  );
}
