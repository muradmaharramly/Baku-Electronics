import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../tools/request/fetchProducts"; // API çağırışı üçün action
import slugify from "slugify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowRightDoubleFill, RiScalesFill } from "react-icons/ri";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlinePercentBadge } from "react-icons/hi2";
import { HiOutlineCursorClick } from "react-icons/hi";
import PreLoader from "../components/PreLoader";

function ProductDetails() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts(); 
        }
    }, [products.length]);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find(
                (p) => slugify(p.title, { lower: true }) === slug
            );
            setProduct(foundProduct);
        }
    }, [slug, products]);

    if (loading) {
        return <PreLoader />;
    }

    if (!product) {
        return <p>Product not found!</p>;
    }

    const settings = {
        customPaging: function (i) {
            return (
                <div className="slick-thumbnail-container">
                    <img src={product.image} alt={`thumbnail-${i}`} className="slick-thumbnail" />
                </div>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="product-details-container">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>{product.title}</span></div>
            <div className="product-details">
                <div className="product-images">
                    <span className="free-shipping">Pulsuz çatdırılma</span>
                    <Slider {...settings} className="main-slider">
                        {Array(4).fill(null).map((_, index) => (
                            <div key={index} className="main-image">
                                <img src={product.image} alt={`slide-${index}`} />
                            </div>
                        ))}
                    </Slider>
                    {product.discount > 0 && <p className="discount">${product.discount}%</p>}
                </div>
                <div className="product-info">
                    <div className="details"><p className="review-count"><FaCommentDots />{product.reviewCount}<span>rəy</span></p> <p className="rate"><FaStar />{product.rating}</p></div>
                    <h1>{product.title}</h1>
                    <p className="product-code">Məhsul kodu: <strong>{product.productCode}</strong></p>
                    <div className="price">
                        {product.discount > 0 && <p className="old-price">${product.price}</p>}
                        <p className="current-price">
                            ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                        </p>
                    </div>
                    <div className="btns-div">
                        <button className="add-to-cart-btn"><LuShoppingCart />Səbətə əlavə et</button>
                        <button className="share-btn"><IoShareSocialOutline />Paylaş</button>
                        <button className="scale-btn"><RiScalesFill /></button>
                        <button className="heart-btn"><FaRegHeart /></button>
                    </div>
                    <div className="actions">
                        <button className="quick-buy">
                            <div className="icon"><HiOutlineCursorClick /></div>
                            <div className="text">
                                <h3>Bir kliklə al</h3>
                                <p>Sürətli sifariş</p>
                            </div>
                        </button>
                        <button className="installment">
                            <div className="icon"><HiOutlinePercentBadge /></div>
                            <div className="text">
                                <h3>Hissə-hissə ödə</h3>
                                <p>${((product.price - (product.price * product.discount) / 100) / 6).toFixed(2)}/ 6 ay</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
