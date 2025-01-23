import React, { useState, useEffect } from "react";

const Header = () => {
    const [showTopNavbar, setShowTopNavbar] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                setShowTopNavbar(false);
                setIsScrolled(true);
            } else {
                setShowTopNavbar(true);
                setIsScrolled(false);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked); // Toggle the state
    };

    return (
        <header className={`header ${isScrolled ? "fixed" : ""}`}>
            <div className={`top-navbar ${showTopNavbar ? "visible" : "hidden"}`}>
                <nav>
                    <div className={`burger ${isClicked ? "clicked" : ""}`} onClick={handleClick}>
                    <ion-icon name={isClicked ? "close-outline" : "menu-outline"}></ion-icon>
                    </div>
                    <ul>
                        <li className="active">Kampaniyalar</li>
                        <li>Korporativ satışlar</li>
                        <li>Mağazalar</li>
                        <li>Aylıq ödəniş</li>
                        <li className="droped">Digər<ion-icon name="chevron-down-outline"></ion-icon>
                            <ul className="dropdown">
                                <li>Arxayın al</li>
                                <li>Müştəri kartı</li>
                                <li>Zəmanət</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="dark-mode-toggle">
                        <div className="toggle-round"></div>
                        <span role="button"><ion-icon name="moon-outline"></ion-icon><ion-icon name="sunny-outline"></ion-icon></span>
                    </div>
                </nav>
            </div>

            <div className={`main-navbar ${isScrolled ? "fixed" : ""}`}>
                <div className="logo">
                    <img src="https://img.b-e.az/media/logo/baku-electronics-logo.svg" alt="Logo" />
                </div>
                <div className="catalogue-btn"><span className="clicker"><ion-icon name="grid-outline"></ion-icon></span> Kataloq</div>
                <div className="search-bar">
                    <input type="text" placeholder="Məhsul axtar..." />
                    <button className="search-icon"><ion-icon name="search-outline"></ion-icon></button>
                </div>
                <div className="actions">
                    <button><ion-icon name="repeat-outline"></ion-icon></button>
                    <button><ion-icon name="cart-outline"></ion-icon></button>
                    <button><ion-icon name="heart-outline"></ion-icon></button>
                    <button><ion-icon name="person-outline"></ion-icon></button>
                </div>
            </div>
            <div className={`mobile-navbar ${isClicked ? "active" : ""}`}>
                <div className="mobile-menu-content">
                    <p className="top-text">Sayt üzrə naviqasiya</p>
                    <div className="mobile-navbar-top-icons">
                        <button>
                            <ion-icon name="repeat-outline"></ion-icon>
                        </button>
                        <button>
                            <ion-icon name="cart-outline"></ion-icon>
                        </button>
                        <button>
                            <button><ion-icon name="heart-outline"></ion-icon></button>
                        </button>
                    </div>
                    <nav className="mobile-navbar-menu">
                        <ul>
                            <li>
                                <a>
                                    Kampaniyalar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                            <li>
                                <a>
                                    Korporativ satışlar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                            <li>
                                <a>
                                    Mağazalar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                            <li>
                                <a>
                                    Aylıq ödəniş <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                            <li>
                                <a>
                                    Digər <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
