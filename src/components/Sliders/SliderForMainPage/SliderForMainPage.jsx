import React from "react";
import { Carousel } from "react-bootstrap";
import { BRAND_ROUTE, CATEGORY_ROUTE } from "../../../utils/consts";
import { NavLink } from "react-router-dom";
import sliderCallaway from "../../../assets/for main page callaway.png"
import sliderElectronic from "../../../assets/trackman for main page.png"
import sliderAdidas from "../../../assets/adidas for main page.png"
import style from "./SliderForMainPage.module.css"

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item className={style.carouselItem}>
        <img className={style.carouselImage} src={sliderCallaway} alt="Callaway Golf"/>
        <Carousel.Caption>
          <h2 className={style.titleOnSlider}>Callaway Golf</h2>
          <NavLink to={`${BRAND_ROUTE}/callaway-golf`} className={style.buttonOnCarousel}>Learn More</NavLink>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={style.carouselItem}>
        <img className={style.carouselImage} src={sliderElectronic} alt="ELECTRONICS"/>
        <Carousel.Caption>
          <NavLink to={`${CATEGORY_ROUTE}/electronics`} className={style.buttonOnCarousel}>Learn More</NavLink>
          <h3 className={style.titleOnSlider}>ELECTRONICS</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={style.carouselItem}>
        <img className={style.carouselImage} src={sliderAdidas} alt="Adidas Golf"/>
        <Carousel.Caption>
          <h3 className={style.titleOnSlider}>Adidas Golf</h3>
          <NavLink to={`${BRAND_ROUTE}/adidas-golf`} className={style.buttonOnCarousel}>Learn More</NavLink>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
