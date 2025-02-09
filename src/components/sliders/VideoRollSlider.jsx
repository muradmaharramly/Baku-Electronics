import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa6";

const videos = [
    {
        id: "HrKMwkDrXpg",
        title: "Qırmızı səni çağırır!",
        img: "https://i.ytimg.com/vi/HrKMwkDrXpg/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-DoACuAiKAgwIABABGH8gEygWMA8=&rs=AOn4CLAUp3hCcnct222wY84pfqjcunDXbA"
    },
    {
        id: "UhB9hl0t3qI",
        title: "Sən də arxayın al!",
        img: "https://i.ytimg.com/vi/UhB9hl0t3qI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBdWB4xQGxTR6-zin5n7FAkZiY9Bg"
    },
    {
        id: "QYNtcvbVcBM",
        title: "Qırmızı öz həmləsini edir və mat edən endirimlərlər gəlir!",
        img: "https://i.ytimg.com/vi/QYNtcvbVcBM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB6WafVgKdABDcdTvHOU9jFXJq0Iw"
    },
    {
        id: "5rBtxGWC5-E",
        title: "Qiymətlərimizə ikiqat zəmanət veririk!",
        img: "https://i.ytimg.com/vi/5rBtxGWC5-E/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB1IuRlpzMzWCaY6Oc-PUPh3jigdg"
    },
    {
        id: "MtoMAweURhk",
        title: "Bakıxanov mağazamızın böyük açılışı baş tutdu!",
        img: "https://i.ytimg.com/vi/MtoMAweURhk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCl1JhhJaLX2sM1dxDtEeL9g0m_aA"
    },
    {
        id: "60AUJAZnhNY",
        title: "Qırmızıdan növbəti həmlə: Q8",
        img: "https://i.ytimg.com/vi/60AUJAZnhNY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBbEs1pMSXzsB-VeM1V2FDaXvqr1Q"
    }
];

function VideoRollSlider() {
    const [popup, setPopup] = useState(null);

    const openPopup = (video) => {
        setPopup(video);
    };

    const closePopup = () => {
        setPopup(null);
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="video roll-area">
            <div className="area-head">
                <div className="text">
                    <p>Youtube kanalımız</p>
                    <h3>Texno icmallarla düzgün seçim et!</h3>
                </div>
                <Link to="https://www.youtube.com/user/BakuElectronicsMMC" target="_blank">Kanalımıza keçid et</Link>
            </div>
            <div className="slider-container">
                <Slider {...settings}>
                    {videos.map((video, index) => (
                        <div className="slide" key={index}>
                            <div className="img-div">
                                <img src={video.img} alt={video.title} />
                                <div className="overlay">
                                    <Link><FaPlay onClick={() => openPopup(video)} /></Link>
                                </div>
                            </div>
                            <h4>{video.title}</h4>
                        </div>
                    ))}
                </Slider>
            </div>
            <Link className="mobile-href-btn" to="https://www.youtube.com/user/BakuElectronicsMMC" target="_blank">Kanalımıza keçid et</Link>

            {popup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closePopup}>
                            <IoClose />
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${popup.id}?enablejsapi=1&autoplay=0`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                        <div className="popup-ending">
                            <p>Heç bir yeniliyi qaçırma</p>
                            <button className="popup-btn"><FaYoutube />Kanala abunə ol</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VideoRollSlider;
