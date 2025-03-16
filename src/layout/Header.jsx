import React, { useState, useEffect, useContext, useRef } from "react";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoTvOutline } from "react-icons/io5";
import { PiEmpty, PiLaptop } from "react-icons/pi";
import { FiSun } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi2";
import { ThemeContext } from "../context/ThemeContext";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "antd";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { fetchProducts } from "../tools/request/fetchProducts";
import PreLoader from "../components/PreLoader";
import slugify from "slugify";
import { GoHistory } from "react-icons/go";
import { fetchCampaigns } from "../tools/request/fetchCampaigns";

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
    const { products, loading, error } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [popularFilteredProducts, setPopularFilteredProducts] = useState([]);
    const [viewedProducts, setViewedProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [showTopNavbar, setShowTopNavbar] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isOtherNav, setIsOtherNav] = useState(false);
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [theme, setTheme] = useContext(ThemeContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);
    const panelRef = useRef(null);

    const { totalUniqueItems } = useCart();
    const { totalWishlistItems } = useWishlist();

    const userEmail = localStorage.getItem("email");

    const { campaigns } = useSelector((state) => state.campaigns);

    useEffect(() => {
        fetchCampaigns();
    }, []);


    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (loading) return;
        if (error) return console.error(`Error: ${error}`);

        const storedViewed = JSON.parse(localStorage.getItem("viewedProducts")) || [];
        const filteredStoredViewed = storedViewed.filter(product => product.count > 0).slice(-3);
        setViewedProducts(filteredStoredViewed);

        const availableProducts = products.filter(product => product.count > 0);

        const popular = availableProducts.filter(product => product.rating > 4).slice(0, 3);
        setPopularProducts(popular);

        const discounted = availableProducts.filter(product => product.discount > 15).slice(0, 3);
        setDiscountedProducts(discounted);
    }, [products, loading, error]);


    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm, products]);

    useEffect(() => {
        if (searchTerm) {
            const popularfiltered = products.filter(
                (product) =>
                    (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchTerm.toLowerCase())) && product.rating > 4
            );
            setPopularFilteredProducts(popularfiltered);
        } else {
            setPopularFilteredProducts([]);
        }
    }, [searchTerm, products]);

    useEffect(() => {
        if (searchTerm) {
            const filteredCampaigns = campaigns.filter((campaign) => {
                const isTitleMatch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
                const isFutureDate = new Date(campaign.endDate) > new Date();

                return isTitleMatch && isFutureDate;
            });

            setFilteredCampaigns(filteredCampaigns);
        } else {
            setFilteredCampaigns([]);
        }
    }, [searchTerm, campaigns]);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                setShowTopNavbar(false);
                setIsScrolled(true);
            } else {
                setShowTopNavbar(true);
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBurgerClick = () => {
        setIsClicked(!isClicked);
        document.body.style.overflow = isClicked ? "auto" : "hidden";
    };

    const handleOtherNavClick = () => {
        setIsOtherNav(!isOtherNav);
    };
    const handleOtherNavClickOff = () => {
        setIsOtherNav(!isOtherNav);
    };

    const handleCatalogueClick = () => {
        setIsPanelActive(!isPanelActive);
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const mainBody = document.querySelector("body");
        if (theme === "dark") {
            mainBody.classList.add("dark");
            mainBody.classList.remove("light");
        } else {
            mainBody.classList.add("light");
            mainBody.classList.remove("dark");
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

    const handleInputClick = () => {
        setIsSearchOpen(true);
    };

    const handleSearchLinkClick = () => {
        setIsSearchOpen(false);
        if (inputRef.current) {
            setSearchTerm("");
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                panelRef.current &&
                !panelRef.current.contains(event.target)
            ) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className={`header ${isScrolled ? "fixed" : ""}`}>
            <div className={`top-navbar ${showTopNavbar ? "visible" : "hidden"}`}>
                <nav>
                    <div className={`burger ${isClicked ? "clicked" : ""}`} onClick={handleBurgerClick}>
                        <ion-icon name={isClicked ? "close-outline" : "menu-outline"}></ion-icon>
                    </div>
                    <ul>
                        <li><NavLink to="/campaigns" >Kampaniyalar</NavLink></li>
                        <li><NavLink to="/corporative-sales">Korporativ satışlar</NavLink></li>
                        <li><NavLink to="/shops">Mağazalar</NavLink></li>
                        <li><NavLink to="/monthly-payment">Aylıq ödəniş</NavLink></li>
                        <li className="droped">Digər<ion-icon name="chevron-down-outline"></ion-icon>
                            <ul className="dropdown">
                                <Link to='/buy-trusted' >Arxayın al</Link>
                                <Link to='/customer-card' >Müştəri kartı</Link>
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
                <div className={`catalogue-btn ${isPanelActive ? "clicked" : ""} ${isSearchOpen ? "deactive" : ""}`} onClick={handleCatalogueClick}><span className="clicker">{isPanelActive ? <IoClose /> : <HiOutlineViewGrid />}</span> Kataloq</div>
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
                <div className={`search-bar ${isSearchOpen ? "active" : ""}`}>
                    <input
                        type="text"
                        placeholder="Məhsul axtar..."
                        value={searchTerm || ""}
                        ref={inputRef}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={handleInputClick}
                    />
                    <button className="search-icon">
                        <ion-icon name="search-outline"></ion-icon>
                    </button>
                    {isSearchOpen && (
                        <div className="search-panel" ref={panelRef}>
                            <div className="left">
                                {searchTerm.length > 0 ? (
                                    <>
                                        <h6>Standart</h6>
                                        <ul>
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((product) => (
                                                    <Link key={product.id} to={`/products/${slugify(product.title, { lower: true })}`} onClick={handleSearchLinkClick}>
                                                        <IoIosSearch />
                                                        <li>{product.title.substring(0, 25)}...</li>
                                                    </Link>
                                                ))
                                            ) : (
                                                <li className="not-found"><span>Nəticə tapılmadı!</span><PiEmpty /></li>

                                            )}
                                        </ul>
                                    </>

                                ) : (
                                    <>
                                        <h6>Ən son baxılan</h6>
                                        <ul>
                                            {viewedProducts.length > 0 ? (
                                                viewedProducts.map((product) => (
                                                    <Link key={product.id} to={`/products/${slugify(product.title, { lower: true })}`} onClick={handleSearchLinkClick}>
                                                        <GoHistory />
                                                        <li>{product.title.substring(0, 25)}...</li>
                                                    </Link>
                                                ))
                                            ) : (
                                                <li className="not-found"><span>Nəticə tapılmadı!</span><PiEmpty /></li>
                                            )}
                                        </ul>
                                    </>

                                )}

                                <h6>Populyar</h6>
                                {searchTerm.length > 0 ? (
                                    <ul>
                                        {popularFilteredProducts.length > 0 ? (
                                            popularFilteredProducts.map((product) => (
                                                <Link key={product.id} to={`/products/${slugify(product.title, { lower: true })}`} onClick={handleSearchLinkClick}>
                                                    <IoIosSearch />
                                                    <li>{product.title.substring(0, 25)}...</li>
                                                </Link>
                                            ))
                                        ) : (
                                            <li className="not-found"><span>Nəticə tapılmadı!</span><PiEmpty /></li>
                                        )}
                                    </ul>
                                ) : (
                                    <ul>
                                        {popularProducts.length > 0 ? (
                                            popularProducts.map((product) => (
                                                <Link key={product.id} to={`/products/${slugify(product.title, { lower: true })}`} onClick={handleSearchLinkClick}>
                                                    <IoIosSearch />
                                                    <li>{product.title.substring(0, 25)}...</li>
                                                </Link>
                                            ))
                                        ) : (
                                            <li className="not-found"><span>Nəticə tapılmadı!</span><PiEmpty /></li>
                                        )}
                                    </ul>
                                )}
                            </div>
                            <div className="right">
                                <div className="searched-products">
                                    <h6>Məhsullar</h6>
                                    {searchTerm.length > 0 ? (
                                        <div className="searched-list">
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((product) => (
                                                    <Link key={product.id} to={`/products/${slugify(product.title, { lower: true })}`} className="product-box" onClick={handleSearchLinkClick}>
                                                        <div className="img-div">
                                                            <img src={product.image} alt={product.title} />
                                                        </div>
                                                        <div className="details">
                                                            <span>{product.category}</span>
                                                            <p>{product.title.substring(0, 20)}...</p>
                                                        </div>
                                                        <Link className="pricing" onClick={handleSearchLinkClick}>
                                                            {product.discount > 0 && <p className="old-price">${product.price}</p>}
                                                            <p className="current-price">{(product.price - (product.price * product.discount) / 100).toFixed(2)}$</p>
                                                        </Link>
                                                    </Link>

                                                ))
                                            ) : (
                                                <p className="not-found"><span>Məhsul tapılmadı!</span><PiEmpty /></p>
                                            )}

                                        </div>
                                    ) : (
                                        <div>
                                            {discountedProducts.length > 0 ? (
                                                discountedProducts.map((product) => (
                                                    <Link key={product.id} to={`/products/${slugify(product.title, { lower: true })}`} className="product-box" onClick={handleSearchLinkClick}>
                                                        <div className="img-div">
                                                            <img src={product.image} alt={product.title} />
                                                        </div>
                                                        <div className="details">
                                                            <span>{product.category}</span>
                                                            <p>{product.title.substring(0, 20)}...</p>
                                                        </div>
                                                        <Link className="pricing" onClick={handleSearchLinkClick}>
                                                            {product.discount > 0 && <p className="old-price">${product.price}</p>}
                                                            <p className="current-price">{(product.price - (product.price * product.discount) / 100).toFixed(2)}$</p>
                                                        </Link>
                                                    </Link>

                                                ))
                                            ) : (
                                                <p className="not-found">Məhsul tapılmadı!</p>
                                            )}


                                        </div>
                                    )}


                                </div>
                                <div className="campaign-img">
                                    {searchTerm.length > 0 ? (
                                        filteredCampaigns.length > 0 ? (
                                            <img src={filteredCampaigns[0].image} alt="Filtered Campaign" />
                                        ) : (
                                            <p className="not-found">Kampaniya tapılmadı!</p>
                                        )
                                    ) : (
                                        filteredCampaigns.length > 0 ? (
                                            <p className="not-found">Kampaniya tapılmadı!</p>
                                        ) : (
                                            <img
                                                src={
                                                    campaigns.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))[0]?.image
                                                }
                                                alt="Latest Campaign"
                                            />
                                        )
                                    )}
                                </div>


                            </div>
                        </div>
                    )}

                </div>
                <div className="actions">
                    {totalUniqueItems === 0 ? (<NavLink to="/cart"><button><RiShoppingCart2Line /></button></NavLink>) :
                        (<Badge count={totalUniqueItems} className="custom-badge" showZero>
                            <NavLink to="/cart"><button><RiShoppingCart2Line /></button></NavLink>
                        </Badge>)}
                    {totalWishlistItems === 0 ? (<NavLink to="/wishlist"><button><FaRegHeart /></button></NavLink>) :
                        (<Badge count={totalWishlistItems} className="custom-badge" showZero>
                            <NavLink to="/wishlist"><button><FaRegHeart /></button></NavLink>
                        </Badge>)}
                    <NavLink to={userEmail ? "/user-profile" : "/auth/register"}><button><FaRegUser /></button></NavLink>
                </div>
            </div>
            <div className={`mobile-navbar ${isClicked ? "active" : ""}`}>
                <div className="mobile-menu-content">
                    <p className="top-text">Sayt üzrə naviqasiya</p>
                    <div className="mobile-navbar-top-icons">
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
                                <Link to="/campaigns">
                                    Kampaniyalar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </Link>
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
                                <Link to="/monthly-payment">
                                    Aylıq ödəniş <ion-icon name="chevron-forward-outline"></ion-icon>
                                </Link>
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
                                <Link to='/buy-trusted' >
                                    Arxayın al <ion-icon name="chevron-forward-outline"></ion-icon>
                                </Link>
                            </li>
                            <li>
                                <Link to='/customer-card' >
                                    Müştəri kartı <ion-icon name="chevron-forward-outline"></ion-icon>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
