import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../tools/request/fetchProducts";
import slugify from "slugify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowRightDoubleFill, RiScalesFill, RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowLeft, FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import PreLoader from "../components/PreLoader";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import { HiOutlinePercentBadge } from "react-icons/hi2";
import { HiOutlineCursorClick } from "react-icons/hi";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FiMinus, FiPhoneCall, FiPlus } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { BiCommentDetail } from "react-icons/bi";
import ProductSliderMain from "../components/sliders/ProductSliderMain";
import ProductSliderSpesific from "../components/sliders/ProductSliderSpesific";
import { useSelector } from "react-redux";

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

function ProductDetails() {
    const { slug } = useParams();
    const { products, loading } = useSelector((state) => state.products);
    const [product, setProduct] = useState(null);
    const [quickBuyOpen, setQuickBuyOpen] = useState(false);
    const [divideBuyOpen, setDivideBuyOpen] = useState(false);
    const [months, setMonths] = useState(3);
    const [initialPayment, setInitialPayment] = useState(0);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

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
    if (!product) return <p>Məhsul tapılmadı!</p>;

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
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
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
                <h3 className="mobile-back"><button onClick={() => window.history.back()}><FaArrowLeft /></button>{product.title.substring(0, 30)}...</h3>
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
                    <div className="mobile-actions">
                        <Link className="scale-btn"><RiScalesFill /></Link>
                        <Link className="share-btn"><IoShareSocialOutline /></Link>
                    </div>
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
                            {inCart(product.id) ? (
                                <Link to="/cart" className="add-to-cart-btn clicked">
                                    <RiShoppingCart2Fill />Səbətə keç
                                </Link>
                            ) : (
                                <Link className="add-to-cart-btn" onClick={handleAddClick}>
                                    <RiShoppingCart2Line />Səbətə at
                                </Link>
                            )}
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
                    <div className="buy-together">
                        <p>Məhsulun yanında al</p>
                        {products.filter(item => item.id !== product.id && item.category == product.category && item.price < product.price).slice(0, 3).map((buyTogether) => (
                            <div className="item" key={buyTogether.id}>
                                <div className="con">
                                    <div className="img-div">
                                        <img src={buyTogether.image} />
                                    </div>
                                    <div className="item-info">
                                        <p>{buyTogether.title.substring(0, 80)}...</p>
                                        <div className="price-info">
                                            <h3>${(buyTogether.price - (buyTogether.price * buyTogether.discount) / 100).toFixed(2)}</h3>
                                            <h3>${((buyTogether.price - (buyTogether.price * buyTogether.discount) / 100) / 24).toFixed(2)} <span>24 ay</span></h3>
                                        </div>
                                    </div>
                                </div>
                                {inCart(buyTogether.id) ? (
                                    <Link className="add clicked"><span className="tick"><MdDone /></span><span>Əlavə edildi</span></Link>
                                ) : (
                                    <Link className="add" onClick={() => {
                                        if (!inCart(buyTogether.id)) {
                                            addItem(buyTogether);
                                        }
                                    }}><FiPlus /> <span>Birlikdə al</span></Link>
                                )}
                            </div>
                        ))}

                    </div>
                    <div className="features-container">
                        <p>Məlumat</p>
                        <div className="features-box">
                            <div className="box-items">
                                <div className="icon">
                                    <LuClipboardList />
                                </div>
                                <div className="content">
                                    <h3>Xüsusiyyətlər</h3>
                                    <p>{isFeaturesOpen ? "Kiçiltmək üçün kliklə" : "Baxmaq üçün kliklə"}</p>
                                </div>
                                <button className="toggle-btn" onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}>
                                    {isFeaturesOpen ? <FiMinus /> : <FiPlus />}
                                </button>
                            </div>
                            {isFeaturesOpen && (
                                <ul className="features-list">
                                    <li><span>Brend</span><span>Brend</span></li>
                                    <li><span>Zəmanət</span><span>1 il</span></li>
                                    <li><span>Qablaşdırma</span><span>Var</span></li>
                                    <li><span>Məhsul kodu</span><span>{product.productCode}</span></li>
                                    <li><span>Stok</span><span>{product.count} ədəd</span></li>
                                </ul>
                            )}
                        </div>
                        <div className="features-box">
                            <div className="box-items">
                                <div className="icon">
                                    <BiCommentDetail />
                                </div>
                                <div className="content">
                                    <h3>Rəylər</h3>
                                    <p>{isCommentsOpen ? "Kiçiltmək üçün kliklə" : "Baxmaq üçün kliklə"}</p>
                                </div>
                                <button className="toggle-btn" onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
                                    {isCommentsOpen ? <FiMinus /> : <FiPlus />}
                                </button>
                            </div>
                            {isCommentsOpen && (
                                <div className="features-list comment">
                                    <div className="headline">
                                        <h4>Rəyini bildir</h4>
                                        <span><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                                    </div>
                                    <form>
                                        <textarea type="text" placeholder="Fikirləriniz" />
                                        <button type="submit">Göndər</button>
                                    </form>
                                </div>
                            )}
                        </div>
                        <div className="features-box">
                            <div className="box-items">
                                <div className="icon">
                                    <FiPhoneCall />
                                </div>
                                <div className="content tel">
                                    <h3>Sualınız var?</h3>
                                    <p>Zəng edin soruşun</p>
                                </div>
                                <Link to="tel:143" className="toggle-btn tel">
                                    Zəng et
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ProductSliderSpesific products = {products} product={product}/>
            
            <ProductSliderMain item={product}/>
            
        </div>
    );
}

export default ProductDetails;
