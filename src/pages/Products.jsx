import React, { useEffect, useRef, useState } from 'react';
import { CgTrashEmpty } from 'react-icons/cg';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from 'react-icons/io';
import { LuLayoutList } from 'react-icons/lu';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ProductCard from '../components/PorductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../tools/request/fetchProducts';
import PreLoader from '../components/PreLoader';
import { MdDone, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa6';
import { FiFilter } from 'react-icons/fi';

const categories = ['electronic', 'smartphone', 'TV', 'smartwatch'];

const Products = () => {
    const { products, productCount, loading, error } = useSelector((state) => state.products);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(20000);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('standart');
    const [stockFilter, setStockFilter] = useState(null);
    const [isListed, setIsListed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productPerPage = 6;
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length]);

    if (loading) return <PreLoader />;

    if (error) return <p>Xəta baş verdi: {error}</p>;

    if (!products) return <p>Məhsul tapılmadı!</p>;

    const totalPages = Math.ceil(productCount / productPerPage);

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    const handleListStyle = () => {
        setIsListed(!isListed);
    };
    const handlePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };
    const handleStockChange = (filterType) => {
        setStockFilter((prev) => (prev === filterType ? null : filterType));
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setMinPrice(1);
        setMaxPrice(23999);
        setSearchTerm('');
        setFilterType('standart');
    };

    const filteredProducts = currentProducts
        .filter((product) =>
            selectedCategories.length ? selectedCategories.includes(product.category) : true
        )
        .filter((product) => product.price >= minPrice && product.price <= maxPrice)
        .filter((product) => (searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true))
        .sort((a, b) => {
            if (filterType === 'ucuzdan-bahaya') return a.price - b.price;
            if (filterType === 'bahadan-ucuza') return b.price - a.price;
            return 0;
        })
        .filter((product) => {
            if (filterType === 'popular') return product.rating > 4;
            if (filterType === 'endirim') return product.discount > 0;
            return true;
        })
        .filter((product) => {
            if (stockFilter === 'inStock') return product.count > 0;
            if (stockFilter === 'outOfStock') return product.count === 0;
            return true;
        });

    const options = ["standart", "popular", "endirim", "ucuzdan-bahaya", "bahadan-ucuza"];

    const handleSelect = (type) => {
        setFilterType(type);
        setIsSelectOpen(false);
    };
    return (
        <div className='products-page'>
            <div className='breadcrumb'>
                <Link to='/'>Ana səhifə</Link>
                <RiArrowRightDoubleFill />
                <span>Məhsullar</span>
            </div>
            <div className='page-head'>
                <h2><Link onClick={() => window.history.back()}><FaArrowLeft /></Link>Məhsullar<span>({productCount} məhsul)</span></h2>
                <div className='filter-area'>
                    <div className="filter">
                        {['standart', 'popular', 'endirim', 'ucuzdan-bahaya', 'bahadan-ucuza'].map((type) => (
                            <span
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`filter-item ${filterType === type ? 'selected' : ''}`}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                    <div className='filter-clicker' onClick={handlePanel}>Filter<FiFilter /></div>
                    <div className="custom-filter" ref={dropdownRef}>
                        <div className="selected-option" onClick={() => setIsSelectOpen(!isSelectOpen)}>
                            {filterType}
                            <span className="arrow">{isSelectOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                        </div>
                        {isSelectOpen && (
                            <ul className="dropdown-list">
                                {options.map((type) => (
                                    <li
                                        key={type}
                                        className={`dropdown-item ${filterType === type ? "selected" : ""}`}
                                        onClick={() => handleSelect(type)}
                                    >
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button className={`grid ${isListed ? "" : "active"}`} onClick={handleListStyle}><HiOutlineViewGrid /></button>
                    <button className={`list ${isListed ? "active" : ""}`} onClick={handleListStyle}><LuLayoutList /></button>
                </div>
            </div>
            <div className='product-container'>
                <div className={`sidebar ${isPanelOpen ? "active" : ""}`}>
                    <div className='inner'>
                        <h4 className='back'><button onClick={handlePanel}><FaArrowLeft /></button>Filter</h4>
                        <div className='btns'>
                            <button className='reset-btn' onClick={resetFilters}><CgTrashEmpty /> Seçimi sıfırla</button>
                            <button className='apply-btn'>Tətbiq et<MdDone /></button>
                        </div>
                        <div className='filter-section'>
                            <h6>Qiymət</h6>
                            <div className='price-range'>
                                <input type='number' value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
                                <input type='number' value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                            </div>
                            <div className='slider'>
                                <input type='range' min='1' max='20000' value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
                                <input type='range' min='1' max='20000' value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className='filter-section'>
                            <h6>Brendlər</h6>
                            <form>
                                <input
                                    type='text'
                                    placeholder='Axtar...'
                                    className='search-input'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <IoIosSearch />
                            </form>
                        </div>
                        <div className='filter-section'>
                            <h6>Kateqoriya</h6>
                            <div className='category-list'>
                                {categories.map((category) => (
                                    <label key={category}>
                                        <input
                                            type='checkbox'
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryToggle(category)}
                                        />
                                        {category}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='filter-section'>
                            <h6>Stok məlumatı</h6>
                            <div className="stock-list">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={stockFilter === 'inStock'}
                                        onChange={() => handleStockChange('inStock')}
                                    />
                                    Stokda var
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={stockFilter === 'outOfStock'}
                                        onChange={() => handleStockChange('outOfStock')}
                                    />
                                    Stokda olmayan
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='page'>
                    <div className={`product-list ${isListed ? "listed" : ""}`}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                <MdOutlineKeyboardArrowLeft />
                            </button>
                            <div className='numbers'>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <span
                                        key={index + 1}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </span>
                                ))}
                            </div>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                <MdOutlineKeyboardArrowRight />
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Products;
