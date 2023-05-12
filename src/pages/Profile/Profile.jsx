import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { Accordion, Alert, Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import Cart from "../../components/Cart/Cart";
import { useLocation } from "react-router-dom";
import Subscribes from "../../components/Subscribes/Subscribes";
import Wallet from "../../components/Wallet/Wallet";
import style from "./Profile.module.css";
import UserInfo from "../../components/UserInfo/UserInfo";
import Wishlist from "../../components/Wishlist/Wishlist";

const Profile = observer(() => {
  const { user } = useContext(Context);

  const location = useLocation();

  const state = location.state;

  const [activeTab, setActiveTab] = useState("userInfo");

  const [view, setView] = useState(<UserInfo />);

  useEffect(() => {
    blurHandler(state);
  }, [state]);

  const blurHandler = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "userInfo":
        setView(<UserInfo />);
        break;
      case "cart":
        setView(<Cart />);
        break;
      case "wishlist":
        setView(<Wishlist />);
        break;
      case "subscribe":
        setView(<Subscribes />);
        break;
      case "wallet":
        setView(<Wallet />);
        break;
    }
  };

  return (
    <Container style={{ paddingTop: "63px" }}>
      <Row className="">
        <Col md={3} className={style.blockWithMenu}>
          <Nav className="d-flex flex-column">
            <Alert
              className={style.alertMenu}
              onClick={() => blurHandler("userInfo")}
            >
              {user.user.first_name} {user.user.last_name}{" "}
              <p>{user.user.email}</p>
            </Alert>
            <hr />
            <Alert
              className={style.alertMenu}
              onClick={() => blurHandler("cart")}
              active={activeTab === "cart" ? "true" : "false"}
            >
              My Cart
            </Alert>
            <Alert
              className={style.alertMenu}
              onClick={() => blurHandler("wishlist")}
              active={activeTab === "wishlist" ? "true" : "false"}
            >
              Wishlist
            </Alert>
            <Alert
              className={style.alertMenu}
              onClick={() => blurHandler("subscribe")}
              active={activeTab === "subscribe" ? "true" : "false"}
            >
              Subscriptions
            </Alert>
            <Alert
              className={style.alertMenu}
              onClick={() => blurHandler("wallet")}
              active={activeTab === "wallet" ? "true" : "false"}
            >
              My Wallet
            </Alert>
          </Nav>
        </Col>
        <Col md={9}>{view}</Col>
      </Row>
      
      

    </Container>
  );
});

export default Profile;
