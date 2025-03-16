import React, { useState } from 'react'
import { CiViewList } from 'react-icons/ci';
import { RiArrowRightDoubleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const cities = ["Bakı", "Gəncə", "İsmayıllı", "Lənkəran", "Mingəçevir", "Şəki", "Bərdə", "Şəmkir", "Quba", "Sumqayıt", "Xırdalan", "Xaçmaz", "Imişli", "Masallı", "Göyçay"];

const Map = () => {
    return (
        <div className='map'>
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Mağazalar</span></div>
            <div className="filter-line">
                <h2>Mağazalar</h2>
                <div className="filters">
                    <div>
                        <select>
                            <option value="">Hamısı</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <Link to='/shops' className="list-btn"><CiViewList />Listə bax</Link>
                </div>
            </div>
            <div className='map-frame' style={{ width: "100%", height: "450px", borderRadius: "10px", overflow: "hidden" }}>
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.8478633294723!2d49.867092375508355!3d40.40926147140939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6cb8a53041%3A0x942f5ff93678528e!2sBaku%20Electronics!5e0!3m2!1sen!2saz!4v1710440481724!5m2!1sen!2saz"
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

        </div>
    )
}

export default Map