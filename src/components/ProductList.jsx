import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../tools/request/fetchProducts";
import ProductCard from "./PorductCard";
import PreLoader from "./PreLoader";

function ProductList() {
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        fetchProducts(); 
    }, []);

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;