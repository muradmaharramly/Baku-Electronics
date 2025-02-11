import React, { useEffect, useState } from 'react';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNews } from '../tools/request/fetchNews';
import NewsCard from '../components/NewsCard';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import PreLoader from '../components/PreLoader';
import NewsPageSlider from '../components/sliders/NewsPageSlider';

const NewsAndBlogs = () => {
    const { news, newsCount, loading, error } = useSelector((state) => state.news);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 6;

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    const totalPages = Math.ceil(newsCount / newsPerPage);

    const indexOfLastBrand = currentPage * newsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - newsPerPage;
    const currentNews = news.slice(indexOfFirstBrand, indexOfLastBrand);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className='news-and-blogs-page'>
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Xəbərlər və bloqlar</span></div>
            <h2>Bloq və xəbərlər</h2>
            <NewsPageSlider key={news.id} news={news} />
            <div className='news-list-con'>
                <div className='area-head'>
                    <p>Xəbərlər</p>
                    <h3>Ən son yeniliklər</h3>
                </div>
                <div className='page'>
                    <div className='news-list'>
                        {currentNews.map((singlenews) => (
                            <NewsCard key={singlenews.id} singlenews={singlenews} />
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

export default NewsAndBlogs;
