import React from "react";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { RiScalesFill } from "react-icons/ri";

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="img-div">
                <img src={product.image} alt={product.title} />
                <p className="discount">{product.discount}%</p>
                <button><RiScalesFill /></button>
            </div>
            <div className="details"><p className="rate"><FaStar />{product.rating}</p> <p className="review-count"><FaCommentDots />{product.reviewCount}<span>rəy</span></p></div>
            <p>{product.title}</p>
            <div className="pricing">
                <div className="price">
                    <p className="old-price">${product.price}</p>
                    <p className="current-price">
                        ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                    </p>
                </div>
                <div className="divide">
                    <span>6 ay</span>
                    <p>${((product.price - (product.price * product.discount) / 100)/6).toFixed(2)}</p>
                </div>

            </div>
            <div className="card-ending">
                <button className="add-to-cart-btn"><LuShoppingCart />Səbətə əlavə et</button>
                <button className="add-to-wish-btn"><FaRegHeart /></button>
            </div>
        </div>
    );
}

export default ProductCard;
