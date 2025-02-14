import React, { useState, useEffect, useContext } from "react";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiScalesFill, RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoTvOutline } from "react-icons/io5";
import { PiLaptop } from "react-icons/pi";
import { FiSun } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi2";
import { ThemeContext } from "../context/ThemeContext";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "antd";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";

const categories = [
    {
        id: 1,
        title: "Telefonlar və qadcetlər",
        icon: <IoPhonePortraitOutline />,
        content: {
            subcategories: [
                { title: "Smartfonlar", items: ["Apple", "Samsung", "Infinix", "Honor", "Vivo", "Motorola", "Bütün telefonlar"] },
                { title: "Planşetlər", items: ["Apple iPad", "Samsung Galaxy Tab", "Xiaomi", "Honor", "Lenovo", "Bütün planşetlər"] },
                { title: "Smart saatlar", items: ["Apple", "Samsung", "Huawei", "Xiaomi", "Borofone", "Wonlex", "Bütün saatlar"] },
                { title: "Qulaqlıqlar", items: ["Apple AirPods", "Samsung", "Huawei", "JBL", "Simsiz qulaqlıqlar", "Simli qulaqlıqlar"] },
                { title: "Ev və ofis telefonları", items: ["Panasonic", "Gigaset"] },
                { title: "Aksessuarlar", items: ["Adapterlər", "Telefon üçün keyslər", "Ekran qoruyucuları və plyonkalar", "USB və AUX kabellər", "Power Bank", "Yaddaş kartları", "Selfi çubuqları və ştativlər", "Smart saatlar üçün aksesuarlar", "Müxtəlif"] },
            ],
        },
    },
    {
        id: 2,
        title: "TV, audio-video, foto",
        icon: <IoTvOutline />,
        content: {
            subcategories: [
                { title: "TV-lər", items: ["Samsung", "LG", "TCL", "Yoshiro", "Sony", "Haier", "Bütün brendlər"] },
                { title: "Diaqonal üzrə", items: ["43\" qədər", "43\"-55", "55\"-75", "75\"-85", "85\"-100", "Bütün diaqonal"] },
                { title: "TV aksesuarları", items: ["Kronşteyn", "TV tumbalar", "Uzatma kabelləri", "Batareyalar", "TV bokslar"] },
                { title: "Audio sistemlər", items: ["Soundbarlar", "Ev kinoteatrları", "Smart TV Box", "Ekşn kameralar", "Smart akustikalar", "Musiqi mərkəzləri"] },
                { title: "Fotoaparatlar", items: ["Fujifilm", "Polaroid", "Canon", "Panasonic"] },
            ],
        },
    },
    {
        id: 3,
        title: "Notbuklar və kompüterlər, planşetlər",
        icon: <PiLaptop />,
        content: {
            subcategories: [
                { title: "Notbuklar", items: ["Apple", "HUAWEI", "HP", "ASUS", "Acer", "LENOVO", "Bütün brendlər"] },
                { title: "Printerlər və kartuçlar", items: ["Printerlər", "Skanerlər", "Kartuçlar"] },
                { title: "Monitorlar", items: ["Samsung", "LG", "Bütün monitorlar"] },
                { title: "Masaüstü kompüterlər", items: ["HP", "Şəbəkə avadanlığı"] },
                { title: "Monobloklar", items: ["Apple", "ASUS", "HP", "LENOVO", "Bütün monobloklar"] },
                { title: "Xarici toplayıcı disklər HDD və SSD", items: ["Sandisk", "Kingston", "Bütün brendlər"] },
                { title: "Klavatura və kompüter siçanları", items: ["Apple", "Logitec", "Bütün brendlər"] },
                { title: "UPS", items: [] },
                { title: "Aksessuarlar", items: ["Notbuk üçün çantalar", "Notbuklar üçün altlıqlar"] },
            ],
        },
    },
];


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

    const handleBurgerClick = () => {
        setIsClicked(!isClicked);
        if (!isClicked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    const [isOtherNav, setIsOtherNav] = useState(false);

    const handleOtherNavClick = () => {
        setIsOtherNav(!isOtherNav);
    };
    const handleOtherNavClickOff = () => {
        setIsOtherNav(!isOtherNav);
    };

    const [isPanelActive, setIsPanelActive] = useState(false);

    const handleCatalogueClick = () => {
        setIsPanelActive(!isPanelActive);
    };

    const [activeCategory, setActiveCategory] = useState(categories[0]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const [theme, setTheme] = useContext(ThemeContext);

    const changeTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    useEffect(() => {
        const mainBody = document.querySelector("body");
        if (theme === "dark") {
            mainBody.classList.remove("light");
            mainBody.classList.add("dark");
        } else {
            mainBody.classList.remove("dark");
            mainBody.classList.add("light");
        }
    }, [theme]);

    useEffect(() => {
        const handleLinkClick = () => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); 
          setTimeout(() => {
            window.location.reload(); 
          }, 100);
        };
    
        const links = document.querySelectorAll(".mobile-navbar-menu a, .mobile-navbar-top-icons a");
    
        links.forEach((link) => {
          link.addEventListener("click", handleLinkClick);
        });
    
        return () => {
          links.forEach((link) => {
            link.removeEventListener("click", handleLinkClick);
          });
        };
      }, []);

    const {
        totalUniqueItems,
    } = useCart();

    const {
        totalWishlistItems,
    } = useWishlist();

    return (
        <header className={`header ${isScrolled ? "fixed" : ""}`}>
            <div className={`top-navbar ${showTopNavbar ? "visible" : "hidden"}`}>
                <nav>
                    <div className={`burger ${isClicked ? "clicked" : ""}`} onClick={handleBurgerClick}>
                        <ion-icon name={isClicked ? "close-outline" : "menu-outline"}></ion-icon>
                    </div>
                    <ul>
                        <li><NavLink>Kampaniyalar</NavLink></li>
                        <li><NavLink to="/corporative-sales">Korporativ satışlar</NavLink></li>
                        <li><NavLink to="/shops">Mağazalar</NavLink></li>
                        <li>Aylıq ödəniş</li>
                        <li className="droped">Digər<ion-icon name="chevron-down-outline"></ion-icon>
                            <ul className="dropdown">
                                <li>Arxayın al</li>
                                <li>Müştəri kartı</li>
                                <li>Zəmanət</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="mode-toggle" onClick={changeTheme}>
                        <div className={`toggle-round ${theme === "dark" ? "right" : "left"}`}></div>
                        <span role="button"><HiOutlineMoon /><FiSun /></span>
                    </div>
                </nav>
            </div>

            <div className={`main-navbar ${isScrolled ? "fixed" : ""}`}>
                <Link to="/" className="logo">
                    <img src="https://img.b-e.az/media/logo/baku-electronics-logo.svg" alt="Logo" />
                </Link>
                <div className={`catalogue-btn ${isPanelActive ? "clicked" : ""}`} onClick={handleCatalogueClick}><span className="clicker">{isPanelActive ? <IoClose /> : <HiOutlineViewGrid />}</span> Kataloq</div>
                <div className={`category-panel ${isScrolled ? "fixed" : ""} ${isPanelActive ? "active" : ""}`}>
                    <div className="side-panel">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className={`side-panel-item ${activeCategory.id === category.id ? "active" : ""}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.icon}{category.title}
                            </div>
                        ))}
                    </div>
                    <div className="content-panel">
                        {activeCategory.content.subcategories.map((subcategory, index) => (
                            <div key={index} className="subcategory">
                                <h6>{subcategory.title}</h6>
                                <ul>
                                    {subcategory.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Məhsul axtar..." />
                    <button className="search-icon"><ion-icon name="search-outline"></ion-icon></button>
                </div>
                <div className="actions">
                    <NavLink to="/scale"><button><RiScalesFill /></button></NavLink>
                    {totalUniqueItems === 0 ? (<NavLink to="/cart"><button><RiShoppingCart2Line /></button></NavLink>) :
                        (<Badge count={totalUniqueItems} className="custom-badge" showZero>
                            <NavLink to="/cart"><button><RiShoppingCart2Line /></button></NavLink>
                        </Badge>)}
                    {totalWishlistItems === 0 ? (<NavLink to="/wishlist"><button><FaRegHeart /></button></NavLink>) :
                        (<Badge count={totalWishlistItems} className="custom-badge" showZero>
                            <NavLink to="/wishlist"><button><FaRegHeart /></button></NavLink>
                        </Badge>)}
                    <NavLink to="/user"><button><FaRegUser /></button></NavLink>
                </div>
            </div>
            <div className={`mobile-navbar ${isClicked ? "active" : ""}`}>
                <div className="mobile-menu-content">
                    <p className="top-text">Sayt üzrə naviqasiya</p>
                    <div className="mobile-navbar-top-icons">
                        <button>
                            <RiScalesFill />
                        </button>
                        {totalUniqueItems === 0 ? (<NavLink to="/cart"><button><RiShoppingCart2Line /></button></NavLink>) :
                            (<Badge count={totalUniqueItems} className="custom-badge" showZero>
                                <NavLink to="/cart"><button><RiShoppingCart2Line /></button></NavLink>
                            </Badge>)}
                        {totalWishlistItems === 0 ? (<NavLink to="/wishlist"><button><FaRegHeart /></button></NavLink>) :
                            (<Badge count={totalWishlistItems} className="custom-badge" showZero>
                                <NavLink to="/wishlist"><button><FaRegHeart /></button></NavLink>
                            </Badge>)}
                    </div>
                    <nav className="mobile-navbar-menu">
                        <ul>
                            <li>
                                <a>
                                    Kampaniyalar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                            <li>
                                <Link to="/corporative-sales">
                                    Korporativ satışlar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </Link>
                            </li>
                            <li>
                                <Link to="/shops">
                                    Mağazalar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </Link>
                            </li>
                            <li>
                                <a>
                                    Aylıq ödəniş <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                            <li onClick={handleOtherNavClick}>
                                <p>
                                    Digər <ion-icon name="chevron-forward-outline"></ion-icon>
                                </p>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className={`mobile-navbar other ${isOtherNav && isClicked ? "active" : ""}`}>
                <div className="mobile-menu-content">
                    <h4><button onClick={handleOtherNavClickOff}><FaArrowLeft /></button>  Digər linklər</h4>
                    <nav className="mobile-navbar-menu">
                        <ul>
                            <li>
                                <a>
                                    Arxayın al <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                            <li>
                                <a>
                                    Müştəri kartı <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </li>
                            <li>
                                <a>
                                    Zəmanət <ion-icon name="chevron-forward-outline"></ion-icon>
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
