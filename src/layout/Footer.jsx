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
                            <li><Link to="/loan-purchase">Nisyə alış</Link></li>
                            <li><Link to="/shops">Mağazalar</Link></li>
                            <li><Link to="/service-centers">Servis mərkəzləri</Link></li>
                            <li><Link to="/delivery-and-billing">Çatdırılma və ödəniş</Link></li>
                            <li><Link to="/double-guarantee">İkiqat zəmanət</Link></li>
                            <li className="footer-privacy"><Link to='/privacy-policy'>Məxfilik siyasəti</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Məlumat</h5>
                        <ul>
                            <li><Link to="/campaigns">Kampaniyalar</Link></li>
                            <li><Link to='/customer-card' >Müştəri kartı</Link></li>
                            <li><Link to="/brands">Brendlər</Link></li>
                            <li><Link to="/news">Bloq və xəbərlər</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Haqqımızda</h5>
                        <ul>
                            <li><Link to="/about-us">Haqqımızda</Link></li>
                            <li><Link to="https://careers.bakuelectronics.az/az/" target="_blank">Vakansiyalar</Link></li>
                            <li><Link to="/corporative-sales">Korporativ satışlar</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-social">
                    <div className="social">
                        <p>Bizi sosial mediada izləyin:</p>
                        <div className="footer-icons">
                            <Link to="https://www.facebook.com/bakuelectronics.mmc" target="_blank"><FaFacebookF /></Link>
                            <Link to="https://t.me/baku_electronics" target="_blank"><FaTelegramPlane /></Link>
                            <Link to="https://www.linkedin.com/company/bakuelectronics/" target="_blank"><FaLinkedinIn /></Link>
                            <Link to="https://www.instagram.com/bakuelectronics.az/" target="_blank"><FaInstagram /></Link>
                            <Link to="https://www.youtube.com/user/BakuElectronicsMMC" target="_blank"><FaYoutube /></Link>
                        </div>
                    </div>
                    <Link to="tel:143" className="footer-call">
                        <h1><FiPhoneCall />143</h1>
                    </Link>
                </div>
                <div className="footer-info">
                    <div className="footer-apps">
                        <Link to="https://play.google.com/store/apps/details?id=com.bakuelectronics&hl=en&pli=1" className="img play" target="_blank"></Link>
                        <Link to="https://apps.apple.com/us/app/baku-electronics/id6444839980" className="img apple" target="_blank"></Link>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>
                    Copyright © {currentYear} <strong>Baku Electronics</strong>. <span>Bütün hüquqlar qorunur.</span>
                </p>
                <Link to='/privacy-policy'>Məxfilik siyasəti</Link>
            </div>
        </footer>
    );
};

export default Footer;
