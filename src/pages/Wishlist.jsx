import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { RiArrowRightDoubleFill, RiScalesFill } from "react-icons/ri";
import slugify from "slugify";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";

const Wishlist = () => {
    const {
         isWishlistEmpty,
         items,
         removeWishlistItem
    } = useWishlist();
    
    const { addItem } = useCart();

    const [clickClass, setClickClass] = useState({});

    useEffect(() => {
        const storedClickStates = {};
        items.forEach((item) => {
            const storedClass = localStorage.getItem(`clicked-${item.id}`);
            if (storedClass) {
                storedClickStates[item.id] = storedClass;
            }
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
                    <div key={item.id} className="product-card">
                        <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                            <div className="img-div">
                                <img src={item.image} alt={item.title} />
                                {item.discount > 0 && <p className="discount">{item.discount}%</p>}
                                <button><RiScalesFill /></button>
                            </div>
                        </Link>
                        <div className="details">
                            <p className="rate"><FaStar />{item.rating}</p>
                            <p className="review-count"><FaCommentDots />{item.reviewCount}<span>rəy</span></p>
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
                            <button className={`add-to-cart-btn ${clickClass[item.id] || ""}`} onClick={() => handleAddClick(item)}>
                                <LuShoppingCart /><span className="desktop-text">Səbətə əlavə et</span><span className="mobile-text">Səbətə at</span><span className="added-text">Səbətə keç</span>
                            </button>
                            <button className="add-to-wish-btn clicked" onClick={() => handleRemoveWishlistItem(item.id)}>
                                <FaRegHeart />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
