import React, { useState, useEffect } from "react";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { RiScalesFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import slugify from "slugify";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
    const { addItem } = useCart();
    const title = product.title;

    const [clickClass, setClickClass] = useState(() => {
        return localStorage.getItem(`clicked-${product.id}`) ? "clicked" : "";
    });

    const handleAddClick = () => {
        addItem(product);
        setClickClass("clicked");
        localStorage.setItem(`clicked-${product.id}`, "clicked"); 
    };

    useEffect(() => {
        const savedClickState = localStorage.getItem(`clicked-${product.id}`);
        if (savedClickState) {
            setClickClass("clicked");
        }
    }, [product.id]);

    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const [wishClass, setWishClass] = useState(() => {
        return localStorage.getItem(`wishlist-clicked-${product.id}`) ? "clicked" : "";
    });

    useEffect(() => {
        setWishClass(wishlist.some((item) => item.id === product.id) ? "clicked" : "");
    }, [wishlist, product.id]);

    const handleWishlistClick = () => {
        if (wishlist.some((item) => item.id === product.id)) {
            removeFromWishlist(product.id);
            localStorage.removeItem(`wishlist-clicked-${product.id}`);
            setWishClass("");
        } else {
            addToWishlist(product);
            localStorage.setItem(`wishlist-clicked-${product.id}`, "clicked");
            setWishClass("clicked");
        }
    };

    return (
        <div className="product-card">
            <Link to={`/products/${slugify(title, { lower: true })}`}>
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
            <Link to={`/products/${slugify(title, { lower: true })}`}>
                <p>{product.title.substring(0, 30)}...</p>
            </Link>
            <Link to={`/products/${slugify(title, { lower: true })}`}>
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
                <button className={`add-to-cart-btn ${clickClass}`} onClick={handleAddClick}>
                    <LuShoppingCart />Səbətə əlavə et
                </button>
                <button className={`add-to-wish-btn ${wishClass}`} onClick={handleWishlistClick}>
                    <FaRegHeart />
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
