import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../tools/request/fetchProducts";
import slugify from "slugify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowRightDoubleFill, RiScalesFill, RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import PreLoader from "../components/PreLoader";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import { HiOutlinePercentBadge } from "react-icons/hi2";
import { HiOutlineCursorClick } from "react-icons/hi";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

function ProductDetails() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const [product, setProduct] = useState(null);
    const [quickBuyOpen, setQuickBuyOpen] = useState(false);
    const [divideBuyOpen, setDivideBuyOpen] = useState(false);
    const [months, setMonths] = useState(3);
    const [initialPayment, setInitialPayment] = useState(0);

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
            setProduct(foundProduct || null);
        }
    }, [slug, products]);

    const { addItem, inCart } = useCart();
    const { addWishlistItem, removeWishlistItem, inWishlist } = useWishlist();

    if (loading) return <PreLoader />;
    if (!product) return <p>Product not found!</p>;

    const handleAddClick = () => {
        if (!inCart(product.id)) {
            addItem(product);
        }
    };

    const handleWishClick = () => {
        if (inWishlist(product.id)) {
            removeWishlistItem(product.id);
        } else {
            addWishlistItem(product);
        }
    };

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

    const handleMonthsChange = (e) => {
        setMonths(Number(e.target.value));
    };

    const handleInitialPaymentChange = (e) => {
        setInitialPayment(Number(e.target.value));
    };

    const productPrice = product.price || 0;
    const discountPrice = productPrice - (productPrice * (product.discount || 0)) / 100;
    const remainingAmount = discountPrice - initialPayment;
    const monthlyPayment = remainingAmount / months;
    const totalPrice = initialPayment + months * monthlyPayment;

    return (
        <div className="product-details-container">
            <div className={`overlay ${quickBuyOpen || divideBuyOpen ? "clicked" : ""}`}></div>
            <div className="breadcrumb">
                <Link to="/">Ana səhifə</Link>
                <RiArrowRightDoubleFill />
                <span>{product.title}</span>
            </div>
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
                    {product.discount > 0 && <p className="discount">{product.discount}%</p>}
                </div>
                <div className="product-info">
                    <div className="details">
                        <p className="review-count">
                            <FaCommentDots /> {product.reviewCount} <span>rəy</span>
                        </p>
                        <p className="rate">
                            <FaStar /> {product.rating}
                        </p>
                    </div>
                    <h1>{product.title}</h1>
                    <p className="product-code">Məhsul kodu: <strong>{product.productCode}</strong></p>
                    <div className="price">
                        {product.discount > 0 && <p className="old-price">${product.price}</p>}
                        <p className="current-price">${discountPrice.toFixed(2)}</p>
                    </div>
                    <div className="btns-div">
                        {inCart(product.id) ? (
                            <Link to="/cart" className="add-to-cart-btn clicked">
                                <RiShoppingCart2Fill /><span>Səbətə keç</span>
                            </Link>
                        ) : (
                            <Link className="add-to-cart-btn" onClick={handleAddClick}>
                                <RiShoppingCart2Line /><span>Səbətə əlavə et</span>
                            </Link>
                        )}
                        <Link className="share-btn"><IoShareSocialOutline />Paylaş</Link>
                        <Link className="scale-btn"><RiScalesFill /></Link>
                        <Link className={`heart-btn ${inWishlist(product.id) ? "clicked" : ""}`} onClick={handleWishClick}>
                            <FaRegHeart />
                        </Link>
                    </div>
                    <div className="actions">
                        <button className={`quick-buy ${quickBuyOpen ? "clicked" : ""}`}
                            onClick={() => {
                                setQuickBuyOpen(!quickBuyOpen);
                                if (divideBuyOpen) setDivideBuyOpen(false);
                            }}>
                            <div className="icon"><HiOutlineCursorClick /></div>
                            <div>
                                <h3>Bir kliklə al</h3>
                                <p>Sürətli sifariş</p>
                            </div>
                        </button>
                        <button className={`installment ${divideBuyOpen ? "clicked" : ""}`}
                            onClick={() => {
                                setDivideBuyOpen(!divideBuyOpen);
                                if (quickBuyOpen) setQuickBuyOpen(false);
                            }}>
                            <div className="icon"><HiOutlinePercentBadge /></div>
                            <div>
                                <h3>Hissə-hissə ödə</h3>
                                <p>${(discountPrice / 6).toFixed(2)} / 6 ay</p>
                            </div>
                        </button>
                    </div>

                    <div className={`quick-buy-area ${quickBuyOpen ? "clicked" : ""}`}>
                        <button className="hide-btn" onClick={() => {
                            setQuickBuyOpen(!quickBuyOpen);
                            if (divideBuyOpen) setDivideBuyOpen(false);
                        }}><IoIosArrowDown /></button>
                        <h4>Bir kliklə sifariş et</h4>
                        <div className="mobile-head">
                            <div className="price">
                                {product.discount > 0 && <p className="old-price">${product.price}</p>}
                                <p className="current-price">${discountPrice.toFixed(2)}</p>
                            </div>
                            <Link className="add-to-cart-btn" onClick={handleAddClick}>
                                <RiShoppingCart2Line /><span>Səbətə at</span>
                            </Link>
                        </div>
                        <form>
                            <input type="text" placeholder="Ad Soyad" />
                            <input type="tel" value="+994" readOnly />
                            <button type="submit"><span className="text-dt">Göndər</span><span className="text-mb">Bir kliklə al</span></button>
                        </form>
                    </div>
                    <div className={`installment-container ${divideBuyOpen ? "clicked" : ""}`}>
                        <button className="hide-btn" onClick={() => {
                            setDivideBuyOpen(!divideBuyOpen);
                            if (quickBuyOpen) setQuickBuyOpen(false);
                        }}><IoIosArrowDown /></button>
                        <div className="mobile-head">
                            <div className="price">
                                {product.discount > 0 && <p className="old-price">${product.price}</p>}
                                <p className="current-price">${discountPrice.toFixed(2)}</p>
                            </div>
                            <div className="btns">
                                <button onClick={() => {
                                    setQuickBuyOpen(!quickBuyOpen);
                                    if (divideBuyOpen) setDivideBuyOpen(false);
                                }}>Bir kliklə al</button>
                                {inCart(product.id) ? (
                                    <Link to="/cart" className="add-to-cart-btn clicked">
                                        <RiShoppingCart2Fill />
                                    </Link>
                                ) : (
                                    <Link className="add-to-cart-btn" onClick={handleAddClick}>
                                        <FiPlus />
                                    </Link>
                                )}
                            </div>
                        </div>
                        <button className="installment-button">Nisyə al<HiOutlinePercentBadge /></button>
                        <div className="installment-box">
                            <div className="sliders">
                                <div className="slider-group">
                                    <label>Müddət</label>
                                    <span>{months} ay</span>
                                    <input type="range" min="3" max="12" step="3" value={months} onChange={handleMonthsChange} />
                                </div>
                                <div className="slider-group">
                                    <label>İlkin ödəniş</label>
                                    <span>{initialPayment.toFixed(2)} ₼</span>
                                    <input type="range" min="0" max={product.price} step="10" value={initialPayment} onChange={handleInitialPaymentChange} />
                                </div>
                            </div>
                            <div className="results">
                                <div className="result-group">
                                    <p>Aylıq ödəniş: </p>
                                    <strong>{monthlyPayment.toFixed(2)} ₼</strong>
                                </div>
                                <div className="result-group">
                                    <p>Yekun qiymət: </p>
                                    <strong>{totalPrice.toFixed(2)} ₼</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
