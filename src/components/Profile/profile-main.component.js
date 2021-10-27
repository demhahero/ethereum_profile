import React, { useState, useEffect } from "react";
import "./profile-main.component.scss";
import ReactHtmlParser from "react-html-parser";
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  CardGroup,
} from "react-bootstrap";
import {
  CheckCircle,
  FileEarmarkX,
  Window,
  PersonBadge,
  PinMapFill,
} from "react-bootstrap-icons";
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hash: hash }),
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
    <Card bg="light" body>
      <Container fluid style={{ width: "100%" }}>
        <Row>
          <Col>
            <CardGroup>
              <div className="container">
                <div className="left">
                  <div className="image_with_badge_container">
                    <img
                      alt="fff"
                      src={Config.UPLOAD_Folder_URL + address + ".png"}
                    />
                    <span className="badge badge-on-image">
                      {verified ? (
                        <CheckCircle size={20} />
                      ) : (
                        <FileEarmarkX size={20} />
                      )}
                    </span>
                  </div>
                </div>
                <div className="right">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <PersonBadge size={30} /> {id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <PinMapFill size={30} /> {address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Window size={30} />
                      {email}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body>{ReactHtmlParser(content)}</Card>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}
