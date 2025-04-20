import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { topMeals } from "./topMeals";
import CarouselItem from "./CarouselItem";
import Slider from "react-slick";

const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // arrows: false,
  };

  return (
    <div>
      {/* slick 색상 조정: DarkTheme 사용 중에는 필요 없음 */}
      <style>
        {`
          .slick-prev:before, .slick-next:before {
            color: black !important;
          }
        `}
      </style>
      <Slider {...settings}>
        {topMeals.map((item, index) => (
          <CarouselItem key={index} image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
