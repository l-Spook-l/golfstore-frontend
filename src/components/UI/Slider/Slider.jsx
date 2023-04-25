import React from "react";
import { Button, Carousel } from "react-bootstrap";
import nature1 from "../../../assets/nature 1.png"
import nature2 from "../../../assets/nature 2.png"
import nature3 from "../../../assets/nature 3.png"
import style from "./Slider.module.css"

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item style={{height: '700px'}}>
        <img className="d-block w-100 h-100" src={nature1} alt="qwerty"/>
        <Carousel.Caption>
          <h3 className="text-dark">Spook Golf intr...</h3>
          <p className="text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nobis debitis blanditiis, et dolore illo officia! Illo, quas placeat nam accusamus, nemo dolorum minima corrupti culpa rem quis quam porro!</p>
          <Button className={style.buttonOnCarousel}>Кнопка</Button>
        </Carousel.Caption>
      </Carousel.Item>


{/*       <Carousel.Item style={{height: '700px'}}>
        <img className="d-block w-100 h-100" src={nature2} alt="qwerty"/>
        <Carousel.Caption>
          <h3 className="text-dark">Spook Golf intr...</h3>
          <p className="text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nobis debitis blanditiis, et dolore illo officia! Illo, quas placeat nam accusamus, nemo dolorum minima corrupti culpa rem quis quam porro!</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{height: '700px'}}>
        <img className="d-block w-100 h-100" src={nature3} alt="qwerty"/>
        <Carousel.Caption>
          <h3 className="text-dark">Spook Golf intr...</h3>
          <p className="text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nobis debitis blanditiis, et dolore illo officia! Illo, quas placeat nam accusamus, nemo dolorum minima corrupti culpa rem quis quam porro!</p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default Slider;
