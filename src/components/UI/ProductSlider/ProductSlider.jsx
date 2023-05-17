import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import { Image } from "react-bootstrap";
import style from "./ProductSlired.module.css";


const ProductSlider = ({ photos, onSelect }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: photos.length > 5 ? 5 : photos.length,
    slidesToScroll: 1,
    arrows: false,
  };
  // Передаем выбранное фото обратно в родительский компонент
  const handleSelectPhoto = (index) => {
    onSelect(index);
  };

  return (
    <div>
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index}>
            <Image
              onClick={() => handleSelectPhoto(index)}
              className={style.selectPhoto}
              src={photo.image}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
