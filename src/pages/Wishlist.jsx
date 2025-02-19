import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { RiArrowRightDoubleFill, RiScalesFill, RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import slugify from "slugify";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import { IoBan } from "react-icons/io5";

const Wishlist = () => {
    const { isWishlistEmpty, items, removeWishlistItem } = useWishlist();
    const { addItem, inCart } = useCart();

    const [clickClass, setClickClass] = useState({});

    useEffect(() => {
        const storedClickStates = {};
        items.forEach((item) => {
            storedClickStates[item.id] = localStorage.getItem(`clicked-${item.id}`) || "";
        });
        setClickClass(storedClickStates);
    }, [items]);

    const handleAddClick = (item) => {
        addItem(item);
        setClickClass((prev) => ({
            ...prev,
            [item.id]: "clicked",
        }));
        localStorage.setItem(`clicked-${item.id}`, "clicked");
    };

    const handleRemoveWishlistItem = (itemId) => {
        removeWishlistItem(itemId);
        localStorage.removeItem(`clicked-${itemId}`);
        setClickClass((prev) => {
            const newState = { ...prev };
            delete newState[itemId];
            return newState;
        });
    };

    if (isWishlistEmpty) {
        return (
            <div className="wishlist-empty">
                <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Sevimlilərim</span></div>
                <img src="https://new.bakuelectronics.az/img/alert.svg" alt="Empty Cart" />
                <p>Sizin hal-hazırda sevimliləriniz yoxdur.</p>
                <span className="desc">Məhsullara baxmaq üçün ana səhifəyə keçid edə bilərsiniz.</span>
                <Link to="/" className="back-home">Ana səhifə</Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Sevimlilərim</span></div>
            <h2>Sevimlilərim</h2>
            <div className="wishlist-container">
                {items.map((item) => (
                    <div key={item.id} className={`product-card ${item.count === 0 ? "outofstock" : ""}`}>
                        <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                            <div className="img-div">
                                {item.count === 0 &&
                                    <div className="stock-overlay">
                                        <IoBan />
                                    </div>
                                }
                                <img src={item.image} alt={item.title} />
                                {item.discount > 0 && <p className="discount">{item.discount}%</p>}
                                <button><RiScalesFill /></button>
                            </div>
                        </Link>
                        <div className="details">
                            <p className="rate"><FaStar />{item.rating}</p>
                            <p className="review-count"><FaCommentDots />{item.reviewCount}<span>rəy</span></p>
                            {item.count === 0 &&
                                <p className="stock-info">Stokda yoxdur</p>
                            }
                        </div>
                        <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                            <p>{item.title.substring(0, 30)}...</p>
                        </Link>
                        <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                            <div className="pricing">
                                <div className="price">
                                    {item.discount > 0 && <p className="old-price">${item.price}</p>}
                                    <p className="current-price">
                                        ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
                                    </p>
                                </div>
                                <div className="divide">
                                    <p className="term">6 ay</p>
                                    <p>${((item.price - (item.price * item.discount) / 100) / 6).toFixed(2)}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="card-ending">
                            {item.count === 0 ? (
                                <Link to="#" className="add-to-cart-btn disabled" onClick={(e) => e.preventDefault()}>
                                    <RiShoppingCart2Line /><span>Stokda yoxdur</span>
                                </Link>
                            ) : (
                                inCart(item.id) ? (
                                    <Link to="/cart" className="add-to-cart-btn clicked">
                                        <RiShoppingCart2Fill /><span>Səbətə keç</span>
                                    </Link>
                                ) : (
                                    <Link to="#" className={`add-to-cart-btn ${clickClass[item.id] || ""}`} onClick={() => handleAddClick(item)}>
                                        <RiShoppingCart2Line />
                                        <span className="desktop-text">Səbətə əlavə et</span>
                                        <span className="mobile-text">Səbətə at</span>
                                    </Link>
                                )
                            )}
                            <Link className="add-to-wish-btn clicked" onClick={() => handleRemoveWishlistItem(item.id)}>
                                <FaRegHeart />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
