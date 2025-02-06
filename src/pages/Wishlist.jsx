import React, { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { RiArrowRightDoubleFill, RiScalesFill } from "react-icons/ri";
import slugify from "slugify";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "react-use-cart";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addItem } = useCart();

    const [clickClass, setClickClass] = useState({});

    const handleAddClick = (product) => {
        addItem(product);
        setClickClass((prev) => ({
            ...prev,
            [product.id]: "clicked",
        }));
        localStorage.setItem(`clicked-${product.id}`, "clicked");
    };

    useEffect(() => {
        wishlist.forEach((product) => {
            const savedClickState = localStorage.getItem(`clicked-${product.id}`);
            if (savedClickState) {
                setClickClass((prev) => ({
                    ...prev,
                    [product.id]: "clicked",
                }));
            }
        });
    }, [wishlist]);

    return (
        <div className="wishlist-page">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Sevimlilərim</span></div>
            {wishlist.length === 0 ? ( "") : (<h2>Sevimlilərim</h2>)}
            
            <div className="wishlist-container">
                {wishlist.length === 0 ? (
                    <div className="wishlist-empty">
                        <img src="https://new.bakuelectronics.az/img/alert.svg" alt="Empty Cart" />
                        <p>Sizin hal-hazırda sevimliləriniz yoxdur.</p>
                        <span className="desc">Məhsullara baxmaq üçün ana səhifəyə keçid edə bilərsiniz.</span>
                        <Link to="/" className="back-home">Ana səhifə</Link>
                    </div>
                ) : (
                    wishlist.map((product) => (
                        <div key={product.id} className="product-card">
                            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                                <div className="img-div">
                                    <img src={product.image} alt={product.title} />
                                    {product.discount > 0 && <p className="discount">{product.discount}%</p>}
                                    <button><RiScalesFill /></button>
                                </div>
                            </Link>
                            <div className="details">
                                <p className="rate"><FaStar />{product.rating}</p>
                                <p className="review-count"><FaCommentDots />{product.reviewCount}<span>rəy</span></p>
                            </div>
                            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                                <p>{product.title.substring(0, 30)}...</p>
                            </Link>
                            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                                <div className="pricing">
                                    <div className="price">
                                        {product.discount > 0 && <p className="old-price">${product.price}</p>}
                                        <p className="current-price">
                                            ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="divide">
                                        <span>6 ay</span>
                                        <p>${((product.price - (product.price * product.discount) / 100) / 6).toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className="card-ending">
                                <button className={`add-to-cart-btn ${clickClass[product.id]}`} onClick={() => handleAddClick(product)}>
                                    <LuShoppingCart />Səbətə əlavə et
                                </button>
                                <button className="add-to-wish-btn clicked" onClick={() => removeFromWishlist(product.id)}>
                                    <FaRegHeart />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;
