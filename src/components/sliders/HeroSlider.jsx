import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next`}
      onClick={onClick}
    ><FaArrowRight /></div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev`}
      onClick={onClick}
    ><FaArrowLeft /></div>
  );
}

function HeroSlider() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 3000,
      cssEase: "linear",
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
  
    return (
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slide">
             <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fnewsite-slider-sevenspace_Rp6S4S5.jpg&w=1920&q=100" />
          </div>
          <div className="slide">
             <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fyeni-sayt-slider-923-520-kredit.png&w=1920&q=100" />
          </div>
          <div className="slide">
             <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fyeni-sayt-slider-923-520-nagd.png&w=1920&q=100" />
          </div>
          <div className="slide">
             <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fnewsite-slider_2.jpg&w=1920&q=100" />
          </div>
          <div className="slide">
             <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2FYeni-sayt-slider-S25-S25plus.jpg&w=1920&q=100" />
          </div>
          <div className="slide">
             <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2FYeni-sayt-slider-S25-S25plus-S25-Ultra-923-520.jpg&w=1920&q=100" />
          </div>
          <div className="slide">
             <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Farxayin_al_banner.jpg&w=1920&q=100" />
          </div>
          <div className="slide">
             <img src="https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fnewsite-slider_vUgMLSd.jpg&w=1920&q=100" />
          </div>
        </Slider>
      </div>
    );
  }
  
  export default HeroSlider;