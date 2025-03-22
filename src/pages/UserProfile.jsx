import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoBagHandleOutline, IoLogOutOutline } from "react-icons/io5";
import { LuHistory, LuMessageSquareShare } from "react-icons/lu";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { loginSuccess, logoutUser, updateUserSuccess } from "../tools/actions/userActions";
import ProductCard from "../components/PorductCard";
import { IoIosArrowDown } from "react-icons/io";

const UserProfile = () => {
    const tabNames = {
        personal: { name: "Şəxsi məlumatlarım", icon: <FaRegUser /> },
        orders: { name: "Sifarişlərim", icon: <IoBagHandleOutline /> },
        history: { name: "Ən son baxdıqlarım", icon: <LuHistory /> },
        addresses: { name: "Ünvanlarım", icon: <GrLocation /> },
        support: { name: "Müraciət et", icon: <LuMessageSquareShare /> },
    };
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(Object.keys(tabNames)[0]);
    const [fullName, setFullName] = useState(user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "");
    const [tel, setTel] = useState(user?.phoneNumber || "");
    const [fin, setFin] = useState(user?.fin || "");
    const [errors, setErrors] = useState({});
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isTelFocused, setIsTelFocused] = useState(false);
    const [isFinFocused, setIsFinFocused] = useState(false);
    const [showSave, setShowSave] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [viewedProducts, setViewedProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        fullName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "",
        email: "",
        phone: "",
        message: "",
        inquiryType: ""
    });
    const [focused, setFocused] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFocus = (field) => {
        setFocused({ ...focused, [field]: true });
    };

    const handleBlur = (field) => {
        setFocused({ ...focused, [field]: !!formData[field] });
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Ad və soyad boş ola bilməz';
            isValid = false;
        }

        if (tel && !/^[0-9]+$/.test(tel)) {
            newErrors.tel = 'Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır';
            isValid = false;
        }
        if (!tel.trim()) newErrors.tel = 'Nömrə boş ola bilməz';

        if (!fin.trim()) newErrors.fin = 'FIN boş ola bilməz';
        if (fin.length !== 7) newErrors.fin = "FIN-i doğru yazın"

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedEmail = localStorage.getItem("email");
                if (!storedEmail) throw new Error("İstifadəçi email tapılmadı");

                const { data, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", storedEmail)
                    .single();

                if (error) throw error;

                dispatch(loginSuccess(data));
                setFullName(data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : "");
                setTel(data.phoneNumber || "");
                setFin(data.fin || "");
            } catch (error) {
                console.error("Fetch User Data Error:", error.message);
            }
        };

        fetchUserData();
    }, [dispatch]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const { data, error } = await supabase
                .from("users")
                .update({ phoneNumber: tel, fin: fin })
                .eq("email", user.email)
                .select()
                .single();

            if (error) throw error;

            dispatch(updateUserSuccess(data));
            setShowSave(false);
            setIsEditable(false);
        } catch (error) {
            console.error("Update User Data Error:", error.message);
        }
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleInputChange = (setter, value, isPhone = false) => {
        if (isPhone && !value.startsWith("+994")) {
            value = "+994" + value;
        }
        setter(value);
        setShowSave(true);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setTimeout(() => {
            navigate("/");
            setTimeout(() => {
                localStorage.removeItem("email");
                window.location.reload();
            }, 100);
        }, 500);
    };

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];
        setViewedProducts(storedProducts);
    }, []);

    return (
        <div className="user-profile">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><Link to="/user-profile">Şəxsi kabinetim</Link><RiArrowRightDoubleFill /><span>{tabNames[activeTab].name}</span></div>
            <div className="profile-page">
                <aside className="sidebar">
                    <div className="user-info">
                        <div className="avatar"><FaRegUser /></div>
                        <div className="user-details">
                            <h5 className="user-name">
                                {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "İstifadəçi adı yoxdur"}
                            </h5>
                            <span className="user-email">{user?.email}</span>
                        </div>
                    </div>
                    <nav>
                        <ul>
                            {Object.keys(tabNames).map((key) => (
                                <li
                                    key={key}
                                    className={activeTab === key ? "active" : ""}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {tabNames[key].icon} {tabNames[key].name}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <button className="logout" onClick={handleLogout}><IoLogOutOutline /> Çıxış et</button>
                </aside>
                <main className="content">
                    {activeTab === "personal" && (
                        <div className="tab-content">
                            <div className="head"><h3>Şəxsi məlumatlarım </h3>
                                <div className="dropdown">
                                    <button className={`dropdown-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                                        {tabNames[activeTab].name} <div className="icon"><IoIosArrowDown /></div>
                                    </button>
                                    {isOpen && (
                                        <ul className="dropdown-menu">
                                            {Object.keys(tabNames).map((key) => (
                                                <li
                                                    key={key}
                                                    className={activeTab === key ? "active" : ""}
                                                    onClick={() => {
                                                        setActiveTab(key);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    {tabNames[key].name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button className="logout" onClick={handleLogout}><IoLogOutOutline /> Çıxış</button></div>
                            <form>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        className="form-control"
                                        onChange={(e) => handleInputChange(setFullName, e.target.value)}
                                        onFocus={() => setIsNameFocused(true)}
                                        onBlur={() => setIsNameFocused(fullName !== '')}
                                        value={fullName}
                                        readOnly={!isEditable}
                                    />
                                    <label className={isNameFocused || tel ? "clicked" : ""}>Ad və Soyad</label>
                                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                                    <FaRegUser />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        value={tel}
                                        onChange={(e) => handleInputChange(setTel, e.target.value)}
                                        onFocus={() => setIsTelFocused(true)}
                                        onBlur={() => setIsTelFocused(tel !== '')}
                                        className="form-control"
                                        readOnly={!isEditable}
                                        required
                                    />
                                    {errors.tel && <span className="error-message">{errors.tel}</span>}
                                    <label className={isTelFocused || tel ? "clicked" : ""}>Telefon</label>
                                    <FiPhone />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        value={fin}
                                        onChange={(e) => handleInputChange(setFin, e.target.value)}
                                        onFocus={() => setIsFinFocused(true)}
                                        onBlur={() => setIsFinFocused(fin !== '')}
                                        className="form-control"
                                        readOnly={!isEditable}
                                        required
                                    />
                                    {errors.fin && <span className="error-message">{errors.fin}</span>}
                                    <label className={isFinFocused || fin ? "clicked" : ""}>Fin</label>
                                    <FaRegUser />
                                </div>
                            </form>
                            <div className="buttons">
                                {!isEditable && <button className="edit" onClick={handleEdit}>Redaktə et</button>}
                                {isEditable && <button className="save" onClick={handleUpdate}>Yadda saxla</button>}
                                <Link to="/user-profile/change-password" className="change-password">Şifrəni dəyişdir</Link>
                            </div>
                        </div>
                    )}
                    {activeTab === "orders" && <div className="tab-content">
                        <div className="head">
                            <h3>Ən Son Baxdıqlarım</h3>
                            <div className="dropdown">
                                <button className={`dropdown-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                                    {tabNames[activeTab].name} <div className="icon"><IoIosArrowDown /></div>
                                </button>
                                {isOpen && (
                                    <ul className="dropdown-menu">
                                        {Object.keys(tabNames).map((key) => (
                                            <li
                                                key={key}
                                                className={activeTab === key ? "active" : ""}
                                                onClick={() => {
                                                    setActiveTab(key);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {tabNames[key].name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button className="logout" onClick={handleLogout}><IoLogOutOutline /> Çıxış</button>
                        </div>
                        <div className="empty">
                            <img src="https://new.bakuelectronics.az/img/alert.svg" alt="Empty Cart" />
                            <p>Sizin hal-hazırda mövcud sifarişiniz yoxdur.</p>
                            <span className="desc">Məhsullara baxmaq üçün ana səhifəyə keçid edə bilərsiniz.</span>
                            <Link to="/" className="back-home">Ana səhifə</Link>
                        </div>
                    </div>}
                    {activeTab === "history" && <div className="tab-content">
                        <div className="head">
                            <h3>Ən Son Baxdıqlarım</h3>
                            <div className="dropdown">
                                <button className={`dropdown-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                                    {tabNames[activeTab].name} <div className="icon"><IoIosArrowDown /></div>
                                </button>
                                {isOpen && (
                                    <ul className="dropdown-menu">
                                        {Object.keys(tabNames).map((key) => (
                                            <li
                                                key={key}
                                                className={activeTab === key ? "active" : ""}
                                                onClick={() => {
                                                    setActiveTab(key);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {tabNames[key].name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button className="logout" onClick={handleLogout}><IoLogOutOutline /> Çıxış</button>
                        </div>
                        <div className="products">
                            <div className="product-list">
                                {viewedProducts.length > 0 ? (
                                    viewedProducts.map((product, index) => (
                                        <ProductCard key={index} product={product} />
                                    ))
                                ) : (
                                    <div className="orders-empty">
                                        <img src="https://new.bakuelectronics.az/img/alert.svg" alt="Empty Cart" />
                                        <p>Sizin hal-hazırda mövcud sifarişiniz yoxdur.</p>
                                        <span className="desc">Məhsullara baxmaq üçün ana səhifəyə keçid edə bilərsiniz.</span>
                                        <Link to="/" className="back-home">Ana səhifə</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>}
                    {activeTab === "addresses" && <div className="tab-content">
                        <div className="head">
                            <h3>Ən Son Baxdıqlarım</h3>
                            <div className="dropdown">
                                <button className={`dropdown-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                                    {tabNames[activeTab].name} <div className="icon"><IoIosArrowDown /></div>
                                </button>
                                {isOpen && (
                                    <ul className="dropdown-menu">
                                        {Object.keys(tabNames).map((key) => (
                                            <li
                                                key={key}
                                                className={activeTab === key ? "active" : ""}
                                                onClick={() => {
                                                    setActiveTab(key);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {tabNames[key].name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button className="logout" onClick={handleLogout}><IoLogOutOutline /> Çıxış</button>
                        </div>
                        <div className="empty">
                            <img src="https://new.bakuelectronics.az/img/alert.svg" alt="Empty Cart" />
                            <p>Sizin hal-hazırda mövcud ünvanınız yoxdur.</p>
                        </div>
                    </div>}
                    {activeTab === "support" && <div className="tab-content">
                        <div className="head">
                            <h3>Müraciət et</h3>
                            <div className="dropdown">
                                <button className={`dropdown-btn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                                    {tabNames[activeTab].name} <div className="icon"><IoIosArrowDown /></div>
                                </button>
                                {isOpen && (
                                    <ul className="dropdown-menu">
                                        {Object.keys(tabNames).map((key) => (
                                            <li
                                                key={key}
                                                className={activeTab === key ? "active" : ""}
                                                onClick={() => {
                                                    setActiveTab(key);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {tabNames[key].name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button className="logout" onClick={handleLogout}><IoLogOutOutline /> Çıxış</button></div>
                        <div className="support-form">
                            <div className="form-double">
                                <div className='form-group'>
                                    <div className="custom-select">
                                        <select name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
                                            <option value="">Müraciət növü</option>
                                            <option value="complaint">Şikayət</option>
                                            <option value="suggestion">Təklif</option>
                                            <option value="question">Sual</option>
                                        </select>
                                        <IoIosArrowDown className="select-icon" />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("fullName")}
                                        onBlur={() => handleBlur("fullName")}
                                        className="form-control"
                                        required
                                    />
                                    <label className={focused.fullName ? "clicked" : ""}>Ad, soyad</label>
                                    <FaRegUser />
                                </div>
                            </div>
                            <div className="form-double">
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("phone")}
                                        onBlur={() => handleBlur("phone")}
                                        className="form-control"
                                        required
                                    />
                                    <label className={focused.phone ? "clicked" : ""}>Telefon nömrəsi</label>
                                    <FiPhone />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='email'
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("email")}
                                        onBlur={() => handleBlur("email")}
                                        className="form-control"
                                        required
                                    />
                                    <label className={focused.email ? "clicked" : ""}>E-poçt</label>
                                    <FiMail />
                                </div>
                            </div>
                            <div className='form-group'>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus("message")}
                                    onBlur={() => handleBlur("message")}
                                    className="form-control"
                                    required
                                />
                                <label className={focused.message ? "clicked" : ""}>Müraciətiniz</label>
                            </div>
                            <div className="buttons">
                                <button className="submit">Göndər</button>
                                <button className="cancel">Ləğv et</button>
                            </div>
                        </div>
                    </div>}
                </main>
            </div>
        </div>
    );
};

export default UserProfile;