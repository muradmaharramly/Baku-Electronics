import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-subscribe">
                    <h5>Yeniliklərdən ilk sən xəbərdar ol!</h5>
                    <div className="footer-subscribe-box">
                        <input type="email" placeholder="E-poçt" />
                        <button>Abunə ol</button>
                    </div>
                </div>
                <div className="footer-links">
                    <div>
                        <h5>Alıcılara</h5>
                        <ul>
                            <li><Link to="/LoanPurchase">Nisyə alış</Link></li>
                            <li>Mağazalar</li>
                            <li>Servis mərkəzləri</li>
                            <li>Çatdırılma və ödəniş</li>
                            <li><Link to="/DoubleGuarantee">İkiqat zəmanət</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Məlumat</h5>
                        <ul>
                            <li>Kampaniyalar</li>
                            <li>Müştəri kartı</li>
                            <li><Link to="/Brands">Brendlər</Link></li>
                            <li>Bloq və xəbərlər</li>
                            <li>Zəmanət</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Haqqımızda</h5>
                        <ul>
                            <li><Link to="/AboutUs">Haqqımızda</Link></li>
                            <li>Vakansiyalar</li>
                            <li><Link to="/CorporativeSales">Korporativ satışlar</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-social">
                    <div className="social">
                        <p>Bizi sosial mediada izləyin:</p>
                        <div className="footer-icons">
                            <FaFacebookF />
                            <FaTelegramPlane />
                            <FaLinkedinIn />
                            <FaInstagram />
                            <FaYoutube />
                        </div>
                    </div>
                    <div className="footer-call">
                        <h1><FiPhoneCall />143</h1>
                    </div>
                </div>
                <div className="footer-info">
                    <div className="footer-apps">
                        <div className="img play"></div>
                        <div className="img apple"></div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>
                    Copyright © {currentYear} <strong>Baku Electronics</strong>. <span>Bütün hüquqlar qorunur.</span>
                </p>
                <a href="#">Məxfilik siyasəti</a>
            </div>
        </footer>
    );
};

export default Footer;
