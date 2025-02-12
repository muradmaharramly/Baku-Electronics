import React, { useState, useEffect } from "react";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { RiScalesFill, RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import slugify from "slugify";

function ProductCard({ product }) {
    const { addItem, inCart } = useCart();
    const { addWishlistItem, removeWishlistItem, inWishlist } = useWishlist();

    const [clickClass, setClickClass] = useState(() => {
        return localStorage.getItem(`clicked-${product.id}`) ? "clicked" : "";
    });

    const handleAddClick = () => {
        if (!inCart(product.id)) {
            addItem(product);
            setClickClass("clicked");
            localStorage.setItem(`clicked-${product.id}`, "clicked");
        }
    };

    useEffect(() => {
        const savedClickState = localStorage.getItem(`clicked-${product.id}`);
        if (savedClickState || inCart(product.id)) {
            setClickClass("clicked");
        }
    }, [product.id, inCart]);

    const [wishClass, setWishClass] = useState(() => {
        return inWishlist(product.id) ? "clicked" : "";
    });

    const handleWishClick = () => {
        if (inWishlist(product.id)) {
            removeWishlistItem(product.id);
            setWishClass("");
        } else {
            addWishlistItem(product);
            setWishClass("clicked");
        }
    };

    return (
        <div className="product-card">
            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                <div className="img-div">
                    <img src={product.image} alt={product.title} />
                    {product.discount > 0 && <p className="discount">${product.discount}%</p>}
                    <button><RiScalesFill /></button>
                </div>
            </Link>
            <div className="details">
                <p className="rate"><FaStar />{product.rating}</p>
                <p className="review-count"><FaCommentDots />{product.reviewCount}<span>rəy</span></p>
            </div>
            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                <p className="product-title">{product.title.substring(0, 30)}...</p>
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
                        <p className="term">6 ay</p>
                        <p>${((product.price - (product.price * product.discount) / 100) / 6).toFixed(2)}</p>
                    </div>
                </div>
            </Link>
            <div className="card-ending">
                {inCart(product.id) ? (
                    <Link to="/cart" className="add-to-cart-btn clicked">
                        <RiShoppingCart2Fill /><span>Səbətə keç</span>
                    </Link>
                ) : (
                    <Link className="add-to-cart-btn" onClick={handleAddClick}>
                        <RiShoppingCart2Line />
                        <span className="desktop-text">Səbətə əlavə et</span>
                        <span className="mobile-text">Səbətə at</span>
                    </Link>
                )}
                <Link className={`add-to-wish-btn ${wishClass}`} onClick={handleWishClick}>
                    <FaRegHeart />
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
