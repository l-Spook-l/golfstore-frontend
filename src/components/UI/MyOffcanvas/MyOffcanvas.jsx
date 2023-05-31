import React from "react";
import { Offcanvas } from "react-bootstrap";
import CategoryBar from "../../CategoryBar/CategoryBar";
import PriceBar from "../../PriceBar/PriceBar";
import TypeBar from "../../TypeBar/TypeBar";
import BrandBar from "../../BrandBar/BrandBar";

const MyOffcanvas = ({ showOffcanvas, setShowOffcanvas }) => {

  const offcanvasClose = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <Offcanvas show={showOffcanvas} onHide={offcanvasClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CategoryBar />
          <PriceBar />
          <TypeBar />
          <BrandBar />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MyOffcanvas;
