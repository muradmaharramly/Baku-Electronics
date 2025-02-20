import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../tools/request/fetchProducts";
import ProductCard from "./PorductCard";
import PreLoader from "./PreLoader";
import { PiEmpty } from "react-icons/pi";
import { SlRefresh } from "react-icons/sl";

const categories = [
    { id: "electronic", label: "Elektronika" },
    { id: "smartphone", label: "Smartfonlar" },
    { id: "tv", label: "Televizorlar" },
    { id: "smartwatch", label: "Ağıllı saatlar" },
    { id: "computer", label: "Kompüter" }
];

function ProductList() {
    const { products, loading, error } = useSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    const filteredProducts = products.filter((product) =>
        selectedCategory === "all" || product.category === selectedCategory
    );
    const resetFilters = () => {
        setSelectedCategory("all");
    };

    return (
        <div className="products-container">
            <div className="area-head filtered">
                <div className="text">
                    <p>Özəl təkliflər</p>
                    <h3>Şərtlər indi daha da sadələşdi!</h3>
                </div>

                <div className="filter-con">
                    <div className="filter">
                        <span
                            className={`filter-item ${selectedCategory === "all" ? "selected" : ""}`}
                            onClick={() => setSelectedCategory("all")}
                        >
                            Hamısı
                        </span>
                        {categories.map(({ id, label }) => (
                            <span
                                key={id}
                                onClick={() => setSelectedCategory(id)}
                                className={`filter-item ${selectedCategory === id ? "selected" : ""}`}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className='empty-area'>
                        <div className='icon'><PiEmpty /></div>
                        <p>Uyğun məhsul tapılmadı.</p>
                        <button className='reset-btn' onClick={resetFilters}><SlRefresh /> Filtrləri sıfırla</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;
