import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import store from "../tools/store/store";

function ProductDetails() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = store.getState().find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
    }, [id]);

    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div className="product-details">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>Rating: {product.rating} ⭐ ({product.reviews} reviews)</p>
            <p>Price: ${product.price}</p>
            {product.discount > 0 && <span className="discount">-{product.discount}%</span>}
            <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    );
}

export default ProductDetails;
