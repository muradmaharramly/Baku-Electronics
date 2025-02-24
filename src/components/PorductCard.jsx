import React, { useState, useEffect } from "react";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { IoBan } from "react-icons/io5";
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
        <div className={`product-card ${product.count === 0 ? "outofstock" : ""}`}>
            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                <div className="img-div">
                    {product.count === 0 &&
                        <div className="stock-overlay">
                            <IoBan />
                        </div>
                    }
                    <img src={product.image} alt={product.title} />
                    {product.discount > 0 && <p className="discount">${product.discount}%</p>}
                    <button><RiScalesFill /></button>
                </div>
            </Link>
            <div className="details">
                <p className="rate"><FaStar />{product.rating}</p>
                <p className="review-count"><FaCommentDots />{product.reviewCount}<span>rəy</span></p>
                {product.count === 0 &&
                    <p className="stock-info">Stokda yoxdur</p>
                }
            </div>
            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                <p className="product-title">{product.title.substring(0, 25)}...</p>
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
                {product.count === 0 ? (
                    <Link to="#" className="add-to-cart-btn disabled" onClick={(e) => e.preventDefault()}>
                        <RiShoppingCart2Line /><span>Stokda yoxdur</span>
                    </Link>
                ) : (
                    inCart(product.id) ? (
                        <Link to="/cart" className="add-to-cart-btn clicked">
                            <RiShoppingCart2Fill /><span>Səbətə keç</span>
                        </Link>
                    ) : (
                        <Link to="#" className="add-to-cart-btn" onClick={handleAddClick}>
                            <RiShoppingCart2Line />
                            <span className="desktop-text">Səbətə əlavə et</span>
                            <span className="mobile-text">Səbətə at</span>
                        </Link>
                    )
                )}

                <Link className={`add-to-wish-btn ${wishClass}`} onClick={handleWishClick}>
                    <FaRegHeart />
                </Link>
            </div>
            <div className="listed-details">
                <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                    <p className="product-title">{product.title}</p>
                </Link>
                <div className="details">
                    <p className="rate"><FaStar />{product.rating}</p>
                    <p className="review-count"><FaCommentDots />{product.reviewCount}<span>rəy</span></p>
                    {product.count === 0 &&
                        <p className="stock-info">Stokda yoxdur</p>
                    }
                </div>
            </div>
            <div className="listed-ending">
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
                    {product.count === 0 ? (
                        <Link to="#" className="add-to-cart-btn disabled" onClick={(e) => e.preventDefault()}>
                            <RiShoppingCart2Line /><span>Stokda yoxdur</span>
                        </Link>
                    ) : (
                        inCart(product.id) ? (
                            <Link to="/cart" className="add-to-cart-btn clicked">
                                <RiShoppingCart2Fill /><span>Səbətə keç</span>
                            </Link>
                        ) : (
                            <Link to="#" className="add-to-cart-btn" onClick={handleAddClick}>
                                <RiShoppingCart2Line />
                                <span className="desktop-text">Səbətə əlavə et</span>
                                <span className="mobile-text">Səbətə at</span>
                            </Link>
                        )
                    )}
                    <Link className={`add-to-wish-btn ${wishClass}`} onClick={handleWishClick}>
                        <FaRegHeart />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
