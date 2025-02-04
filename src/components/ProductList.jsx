import React, { useEffect, useState } from "react";
import store from "../tools/store/store";
import { fetchProducts } from "../tools/request/fetchProducts";
import ProductCard from "./PorductCard";

function ProductList() {
    const [products, setProducts] = useState(store.getState());

    useEffect(() => {
        fetchProducts();
        const unsubscribe = store.subscribe(() => {
            setProducts(store.getState());
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
