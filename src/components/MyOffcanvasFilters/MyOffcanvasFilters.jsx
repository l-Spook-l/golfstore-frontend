import React from "react";
import { Offcanvas } from "react-bootstrap";
import CategoryBar from "../Filters/CategoryBar/CategoryBar";
import PriceBar from "../Filters/PriceBar/PriceBar";
import TypeBar from "../Filters/TypeBar/TypeBar";
import BrandBar from "../Filters/BrandBar/BrandBar";

// Выпадающие меню для фильтров
const MyOffcanvasFilters = ({ showOffcanvas, setShowOffcanvas }) => {

  const offcanvasClose = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <Offcanvas show={showOffcanvas} onHide={offcanvasClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
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

export default MyOffcanvasFilters;
