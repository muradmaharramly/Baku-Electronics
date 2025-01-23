import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-subscribe">
                    <h4>Yeniliklərdən ilk sən xəbərdar ol!</h4>
                    <div className="footer-subscribe-box">
                        <input type="email" placeholder="E-poçt" />
                        <button>Abunə ol</button>
                    </div>
                </div>
                <div className="footer-links">
                    <div>
                        <h5>Alıcılara</h5>
                        <ul>
                            <li>Nisyə alış</li>
                            <li>Mağazalar</li>
                            <li>Servis mərkəzləri</li>
                            <li>Çatdırılma və ödəniş</li>
                            <li>İkiqat zəmanət</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Məlumat</h5>
                        <ul>
                            <li>Kampaniyalar</li>
                            <li>Müştəri kartı</li>
                            <li>Brendlər</li>
                            <li>Bloq və xəbərlər</li>
                            <li>Zəmanət</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Haqqımızda</h5>
                        <ul>
                            <li>Haqqımızda</li>
                            <li>Vakansiyalar</li>
                            <li>Korporativ satışlar</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-social">
                    <div className="social">
                        <p>Bizi sosial mediada izləyin:</p>
                        <div className="footer-icons">
                            <ion-icon name="logo-instagram"></ion-icon>
                            <ion-icon name="logo-whatsapp"></ion-icon>
                            <ion-icon name="logo-tiktok"></ion-icon>
                            <ion-icon name="logo-twitter"></ion-icon>
                            <ion-icon name="logo-youtube"></ion-icon>
                        </div>
                    </div>
                    <div className="footer-call">
                        <p><ion-icon name="call-outline"></ion-icon>143</p>
                    </div>
                </div>
                <div className="footer-info">
                    <div className="footer-apps">
                        <img src="https://new.bakuelectronics.az/img/google-play-light.svg" alt="Google Play" />
                        <img src="https://new.bakuelectronics.az/img/app-store-light.svg" alt="App Store" />
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>
                    Copyright © 2025 <span>Baku Electronics</span>. Bütün hüquqlar qorunur.
                </p>
                <a href="#">Məxfilik siyasəti</a>
            </div>
        </footer>
    );
};

export default Footer;
