import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../tools/request/fetchNews";
import PreLoader from "../PreLoader";
import slugify from "slugify";

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
    const { news, loading, error } = useSelector((state) => state.news);
    useEffect(() => {
        fetchNews();
    }, [])
    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

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
                <Slider {...settings} >
                    {news.map((item) => (
                        <Link to={`/news/${slugify(item.title, { lower: true })}`}>
                            <div className="slide" key={item.id}>
                                <div className="img-div">
                                    <img src={item.image} />
                                    <div className="overlay">
                                        <Link to={`/news/${slugify(item.title, { lower: true })}`}>
                                            Ətraflı
                                        </Link>
                                    </div>
                                </div>
                                <h4>{item.title.substring(0, 50)}...</h4>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
            <Link className="mobile-href-btn" to="https://www.youtube.com/user/BakuElectronicsMMC" target="_blank">Kanalımıza keçid et</Link>
        </div>
    );
}

export default NewsSlider;