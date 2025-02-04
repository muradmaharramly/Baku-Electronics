import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function NewsSlider() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
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
        <div className="news roll-area">
            <div className="area-head">
                <div className="text">
                    <p>Bloq və xəbərlər</p>
                    <h3>Ən son yeniliklərdən xəbərdar ol!</h3>
                </div>
                <Link to="№" target="_blank">Xəbərlərə keçid et</Link>
            </div>
            <div className="slider-container">
                <Slider {...settings}>
                    <div className="slide">
                        <div className="img-div">
                            <img src="https://i.ytimg.com/vi/HrKMwkDrXpg/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-DoACuAiKAgwIABABGH8gEygWMA8=&rs=AOn4CLAUp3hCcnct222wY84pfqjcunDXbA" />
                            <div className="overlay">
                                <Link>
                                    Ətraflı
                                </Link>
                            </div>
                        </div>
                        <h4>Qırmızı səni çağırır!</h4>
                    </div>
                    <div className="slide">
                        <div className="img-div">
                            <img src="https://i.ytimg.com/vi/UhB9hl0t3qI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBdWB4xQGxTR6-zin5n7FAkZiY9Bg" />
                            <div className="overlay">
                                <Link>
                                    Ətraflı
                                </Link>
                            </div>
                        </div>
                        <h4>Sən də arxayın al!</h4>
                    </div>
                    <div className="slide">
                        <div className="img-div">
                            <img src="https://i.ytimg.com/vi/QYNtcvbVcBM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB6WafVgKdABDcdTvHOU9jFXJq0Iw" />
                            <div className="overlay">
                                <Link>
                                    Ətraflı
                                </Link>
                            </div>
                        </div>
                        <h4>Qırmızı öz həmləsini edir və mat edən endirimlərlər gəlir!</h4>
                    </div>
                    <div className="slide">
                        <div className="img-div">
                            <img src="https://i.ytimg.com/vi/5rBtxGWC5-E/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB1IuRlpzMzWCaY6Oc-PUPh3jigdg" />
                            <div className="overlay">
                                <Link>
                                    Ətraflı
                                </Link>
                            </div>
                        </div>
                        <h4>Qiymətlərimizə ikiqat zəmanət veririk!</h4>
                    </div>
                    <div className="slide">
                        <div className="img-div">
                            <img src="https://i.ytimg.com/vi/MtoMAweURhk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCl1JhhJaLX2sM1dxDtEeL9g0m_aA" />
                            <div className="overlay">
                                <Link>
                                    Ətraflı
                                </Link>
                            </div>
                        </div>
                        <h4>Bakıxanov mağazamızın böyük açılışı baş tutdu!</h4>
                    </div>
                    <div className="slide">
                        <div className="img-div">
                            <img src="https://i.ytimg.com/vi/60AUJAZnhNY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBbEs1pMSXzsB-VeM1V2FDaXvqr1Q" />
                            <div className="overlay">
                                <Link>
                                    Ətraflı
                                </Link>
                            </div>
                        </div>
                        <h4>Qırmızıdan növbəti həmlə: Q8</h4>
                    </div>
                </Slider>
            </div>
            <Link className="mobile-href-btn" to="https://www.youtube.com/user/BakuElectronicsMMC" target="_blank">Kanalımıza keçid et</Link>
        </div>
    );
}

export default NewsSlider;