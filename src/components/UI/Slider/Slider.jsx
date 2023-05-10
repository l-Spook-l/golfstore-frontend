import React from "react";
import { Button, Carousel } from "react-bootstrap";
import sliderCallaway from "../../../assets/for main page callaway.png"
import sliderElectronic from "../../../assets/trackman for main page.png"
import sliderAdidas from "../../../assets/adidas for main page.png"

import style from "./Slider.module.css"

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item style={{height: '600px'}}>
        <img className="d-block w-100 h-100" src={sliderCallaway} alt="qwerty"/>
        <Carousel.Caption>
          <h2 className={style.titleOnSlider}>Callaway Golf</h2>
          <Button className={style.buttonOnCarousel}>Learn More</Button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{height: '600px'}}>
        <img className="d-block w-100 h-100" src={sliderElectronic} alt="qwerty"/>
        <Carousel.Caption>
          <h3 className={style.titleOnSlider}>ELECTRONICS</h3>
          <Button className={style.buttonOnCarousel}>Learn More</Button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{height: '600px'}}>
        <img className="d-block w-100 h-100" src={sliderAdidas} alt="qwerty"/>
        <Carousel.Caption>
          <h3 className={style.titleOnSlider}>Adidas Golf</h3>
          <Button className={style.buttonOnCarousel}>Learn More</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
