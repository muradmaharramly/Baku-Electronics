import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../PorductCard";

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow next`}
            onClick={onClick}
        ><IoIosArrowForward /></div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow prev`}
            onClick={onClick}
        ><IoIosArrowBack /></div>
    );
}

function ProductSliderMain({products}) {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}  
            </Slider>
        </div>
    );
}

export default ProductSliderMain;