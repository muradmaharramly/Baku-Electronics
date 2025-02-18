import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const brands = [
    { id: 1, name: 'Samsung', logo: 'https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FSamsung.jpg&w=1920&q=75' },
    { id: 2, name: 'Apple', logo: 'https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fappleourtrust.png&w=1920&q=75' },
    { id: 3, name: 'TOgnana', logo: 'https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Ftognana.jpg&w=1920&q=75' },
    { "id": 4, "name": "Divan EV", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fdivanev.jpg&w=1920&q=75" },
    { "id": 5, "name": "Koopman International", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Flogo_b9z7ZVM.jpg&w=1920&q=75" },
    { "id": 6, "name": "Mi", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FXIAOMI.png&w=1920&q=75" },
    { "id": 7, "name": "Bosch", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fbosch.jpg&w=1920&q=75" },
    { "id": 8, "name": "Liqui Moly", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLiqui_Moly.png&w=1920&q=75" },
    { "id": 9, "name": "Cotton Box", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fcottonbox.jpg&w=1920&q=75" },
    { "id": 10, "name": "HP", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FHP.jpg&w=1920&q=75" },
    { "id": 11, "name": "Tefal", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Ftefal_nQ6dUE6.png&w=1920&q=75" },
    { "id": 12, "name": "Philips", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FPhilips.png&w=1920&q=75" },
    { "id": 13, "name": "Panasonic", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FPanasonic_pXuIRVB.png&w=1920&q=75" },
    { "id": 14, "name": "WMF", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fwmf.jpg&w=1920&q=75" },
    { "id": 15, "name": "LG", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLG.jpg&w=1920&q=75" },
    { "id": 16, "name": "NEVA", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Forig.jpg&w=1920&q=75" },
    { id: 1, name: 'Samsung', logo: 'https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FSamsung.jpg&w=1920&q=75' },
    { id: 2, name: 'Apple', logo: 'https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fappleourtrust.png&w=1920&q=75' },
    { id: 3, name: 'TOgnana', logo: 'https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Ftognana.jpg&w=1920&q=75' },
    { "id": 4, "name": "Divan EV", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fdivanev.jpg&w=1920&q=75" },
    { "id": 5, "name": "Koopman International", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Flogo_b9z7ZVM.jpg&w=1920&q=75" },
    { "id": 6, "name": "Mi", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FXIAOMI.png&w=1920&q=75" },
    { "id": 7, "name": "Bosch", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fbosch.jpg&w=1920&q=75" },
    { "id": 8, "name": "Liqui Moly", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLiqui_Moly.png&w=1920&q=75" },
    { "id": 9, "name": "Cotton Box", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fcottonbox.jpg&w=1920&q=75" },
    { "id": 10, "name": "HP", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FHP.jpg&w=1920&q=75" },
    { "id": 11, "name": "Tefal", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Ftefal_nQ6dUE6.png&w=1920&q=75" },
    { "id": 12, "name": "Philips", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FPhilips.png&w=1920&q=75" },
    { "id": 13, "name": "Panasonic", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FPanasonic_pXuIRVB.png&w=1920&q=75" },
    { "id": 14, "name": "WMF", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fwmf.jpg&w=1920&q=75" },
    { "id": 15, "name": "LG", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLG.jpg&w=1920&q=75" },
    { "id": 16, "name": "NEVA", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Forig.jpg&w=1920&q=75" }
];

const Brands = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const brandsPerPage = 16;

    const totalPages = Math.ceil(brands.length / brandsPerPage);

    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className="brands-page">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Brendlər</span></div>
            <h2>Brendlər</h2>
            <div className="brands">
                {currentBrands.map((brand) => (
                    <div className="brand-card" key={brand.id}>
                        <img src={brand.logo} alt={brand.name} />
                    </div>
                ))}
            </div>
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
        </div>
    );
};

export default Brands;
