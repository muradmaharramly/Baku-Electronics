import React, { useEffect, useState } from 'react'
import { BsCashStack } from 'react-icons/bs';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { IoCardOutline } from 'react-icons/io5';
import { LuRedoDot, LuTicketPercent } from 'react-icons/lu';
import { MdOutlineDone } from 'react-icons/md';
import { RiMastercardFill, RiVisaLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { supabase } from '../services/supabaseClient';
import { loginSuccess } from '../tools/actions/userActions';
import Swal from 'sweetalert2';

const CheckOut = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [tel, setTel] = useState(user?.phoneNumber || "");
    const [selectedTab, setSelectedTab] = useState("home");
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const navigate = useNavigate();

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
                setTel(data.phoneNumber || "");
            } catch (error) {
                console.error("Fetch User Data Error:", error.message);
            }
        };

        fetchUserData();
    }, [dispatch]);

    const {
        cartTotal,
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();

    const handleSelectBranch = (index) => {
        setSelectedBranch(index);
    };

    const handleSelect = (id) => {
        setSelectedId(selectedId === id ? null : id);
    };

    const handleCardClick = (id) => {
        setActiveCard(id);
    };

    const branches = [
        "Nərimanov filialı",
        "Azadlıq filialı"
    ];

    const Cities = [
        "Bakı",
        "Gəncə",
        "Sumqayıt",
        "Mingəçevir",
        "Şirvan",
        "Naxçıvan",
        "Şəki",
        "Lənkəran",
        "Yevlax",
        "Xankəndi",
        "Quba",
        "Qusar",
        "Xaçmaz",
        "Zaqatala",
        "Qəbələ",
        "İsmayıllı",
        "Ağdaş",
        "Tovuz",
        "Şəmkir",
        "Bərdə",
        "Ağcabədi",
        "Füzuli",
        "Cəlilabad",
        "Masallı",
        "Astara",
        "Lerik",
        "Biləsuvar",
        "Saatlı",
        "Sabirabad",
        "Hacıqabul",
        "Salyan",
        "Neftçala",
        "Goranboy",
        "Göyçay",
        "Ucar",
        "Zərdab",
        "Şamaxı",
        "Qobustan",
        "Balakən",
        "Culfa",
        "Ordubad",
        "Şahbuz",
        "Babək",
        "Kəngərli",
        "Şuşa",
        "Xocalı",
        "Xocavənd",
        "Ağdam",
        "Kəlbəcər",
        "Laçın",
        "Qubadlı",
        "Zəngilan",
        "Lerik",
        "Yardımlı",
        "Göygöl",
        "Samux",
        "Daşkəsən",
        "Gədəbəy",
        "Ağstafa",
        "Qazax",
        "Füzuli",
        "Cəbrayıl",
        "Xızı",
        "Abşeron"
    ];

    const paymentOptions = [
        { id: 1, title: "Kartla ödə", description: "Seçmək üçün kliklə", icon: <IoCardOutline /> },
        { id: 2, title: "Qapıda ödə", description: "Seçmək üçün kliklə", icon: <BsCashStack /> },
        { id: 3, title: "Taksitlə alıram", description: "Seçmək üçün kliklə", icon: <LuTicketPercent /> },
        { id: 4, title: "Nisyə alıram", description: "Seçmək üçün kliklə", icon: <LuRedoDot /> }
    ];

    const totalDiscount = items.reduce((acc, item) => {
        const itemDiscount = (item.price * item.discount) / 100;
        return acc + itemDiscount * item.quantity;
    }, 0);

    const handleCompleteOrder = () => {
        localStorage.removeItem('react-use-cart');
    
        Swal.fire({
            title: "Sifarişiniz tamamlandı!",
            text: 'Əməliyyat uğurla başa çatdı.',
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: "custom-swal-popup",
                title: "custom-swal-title",
                content: "custom-swal-text"
            }
        }).then(() => {
            navigate('/');
            window.location.reload();        
        });
    };
    

    return (
        <div className='checkout'>
            <h2 className="page-title"><Link to="/checkout"><FaArrowLeft /></Link>  Sifarişi rəsmiləşdir</h2>
            <div className='left'>
                <div className="personal-info">
                    <h2 className="title">Şəxsi məlumatlar</h2>
                    <div className="info-boxes">
                        <div className="info-box">
                            <span>{user?.firstName ? `${user.firstName}` : "İstifadəçi adı yoxdur"}</span>
                        </div>
                        <div className="info-box">
                            <span>{user?.lastName ? `${user.lastName}` : "İstifadəçi soyadı yoxdur"}</span>
                        </div>
                        <input className="info-box" placeholder='Telefon' value={user?.phoneNumber ? `${user.phoneNumber}` : ""}>

                        </input>
                        <div className="info-box">
                            <span>{user?.email ? `${user.email}` : "İstifadəçi emaili yoxdur"}</span>
                        </div>
                    </div>
                    <div className="step-indicator">
                        <div className="step active">1</div>
                        <div className="line"></div>
                        <div className="step">2</div>
                        <div className="line"></div>
                        <div className="step">3</div>
                    </div>
                </div>
                <div className="delivery-container">
                    <h2 className="title">Çatdırılma məlumatları</h2>
                    <div className="tab-menu">
                        <span
                            className={selectedTab === "home" ? "active" : ""}
                            onClick={() => setSelectedTab("home")}
                        >
                            Ünvana çatdırılma
                        </span>
                        <span
                            className={selectedTab === "store" ? "active" : ""}
                            onClick={() => setSelectedTab("store")}
                        >
                            Mağazadan götürəcəm
                        </span>
                    </div>

                    {selectedTab === "home" ? (
                        <div className="address-section">
                            <button className="add-address" onClick={() => setShowAddressForm(!showAddressForm)}>
                                <span className='icon'><FaCirclePlus /></span> Ünvan əlavə et
                            </button>
                            {showAddressForm && (
                                <div className="address-form">
                                    <select>
                                        <option>Şəhər / Rayon</option>
                                        {Cities.map((city, index) =>
                                            <>
                                                <option key={index}>{city}</option>
                                            </>)}

                                    </select>
                                    <div className='double-form'>
                                        <input type="text" placeholder="Dəqiq ünvan" />
                                        <select>
                                            <option>Ünvan növü</option>
                                            <option>Ev</option>
                                            <option>Iş</option>
                                            <option>Digər</option>
                                        </select>
                                    </div>
                                    <div className='ending'>
                                        <Link>Ünvanı xəritədən seçin<IoIosArrowForward /></Link>
                                        <button className="confirm-address">Ünvanı təsdiq et</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="store-pickup-section">
                            {branches.map((branch, index) => (
                                <div
                                    key={index}
                                    className={`branch-box ${selectedBranch === index ? "clicked" : ""}`}
                                    onClick={() => handleSelectBranch(index)}
                                >
                                    <div className="icon">
                                        <MdOutlineDone />
                                    </div>
                                    {branch}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="step-indicator">
                        <div className="step completed">✔</div>
                        <div className="line red"></div>
                        <div className="step active">2</div>
                        <div className="line"></div>
                        <div className="step">3</div>
                    </div>
                </div>
                <div className="payment-methods">
                    <h2>Ödəniş üsulu</h2>
                    <div className="payment-options">
                        {paymentOptions.map((option) => (
                            <div
                                key={option.id}
                                className={`payment-card ${selectedId === option.id ? "selected" : ""}`}
                                onClick={() => handleSelect(option.id)}
                            >
                                <div className="icon">{option.icon}</div>
                                <h3>{option.title}</h3>
                                <p>{option.description}</p>
                                <FaCheckCircle className="check-icon" />
                            </div>
                        ))}
                    </div>

                    {selectedId === 1 && (
                        <div className="selected-info">
                            <div className='cards'>
                                <div className={`card ${activeCard === 1 ? "active" : ""}`}
                                    onClick={() => handleCardClick(1)}>
                                    <RiMastercardFill />
                                    <p>Master card</p>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 2 ? "active" : ""}`}
                                    onClick={() => handleCardClick(2)}>
                                    <RiVisaLine />
                                    <p>Visa</p>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedId === 2 && (
                        <div className="selected-info">
                            <p className='note'><strong>Qeyd:</strong>Sifarişinizi aldıqda ödənişi nağd və ya bank kartı ilə ödəyə bilərsiniz.</p>
                        </div>
                    )}
                    {selectedId === 3 && (
                        <div className="selected-info">
                            <h3>Taksit kart məlumatları</h3>
                            <div className='cards'>
                                <div className={`card ${activeCard === 3 ? "active" : ""}`}
                                    onClick={() => handleCardClick(3)}>
                                    <p>3 ay</p>
                                    <span>Aylıq {(cartTotal / 3).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 4 ? "active" : ""}`}
                                    onClick={() => handleCardClick(4)}>
                                    <p>6 ay</p>
                                    <span>Aylıq {(cartTotal / 6).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 5 ? "active" : ""}`}
                                    onClick={() => handleCardClick(5)}>
                                    <p>9 ay</p>
                                    <span>Aylıq {(cartTotal / 9).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 6 ? "active" : ""}`}
                                    onClick={() => handleCardClick(6)}>
                                    <p>12 ay</p>
                                    <span>Aylıq {(cartTotal / 12).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedId === 4 && (
                        <div className="selected-info">
                            <h3>Nisyə alıram məlumatları</h3>
                            <div className='cards'>
                                <div className={`card ${activeCard === 7 ? "active" : ""}`}
                                    onClick={() => handleCardClick(7)}>
                                    <p>3 ay</p>
                                    <span>Aylıq {(cartTotal / 3).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 8 ? "active" : ""}`}
                                    onClick={() => handleCardClick(8)}>
                                    <p>6 ay</p>
                                    <span>Aylıq {(cartTotal / 6).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 9 ? "active" : ""}`}
                                    onClick={() => handleCardClick(9)}>
                                    <p>9 ay</p>
                                    <span>Aylıq {(cartTotal / 9).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 10 ? "active" : ""}`}
                                    onClick={() => handleCardClick(10)}>
                                    <p>12 ay</p>
                                    <span>Aylıq {(cartTotal / 12).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 11 ? "active" : ""}`}
                                    onClick={() => handleCardClick(11)}>
                                    <p>15 ay</p>
                                    <span>Aylıq {(cartTotal / 15).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 12 ? "active" : ""}`}
                                    onClick={() => handleCardClick(12)}>
                                    <p>18 ay</p>
                                    <span>Aylıq {(cartTotal / 18).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 13 ? "active" : ""}`}
                                    onClick={() => handleCardClick(13)}>
                                    <p>21 ay</p>
                                    <span>Aylıq {(cartTotal / 21).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                                <div className={`card ${activeCard === 14 ? "active" : ""}`}
                                    onClick={() => handleCardClick(14)}>
                                    <p>24 ay</p>
                                    <span>Aylıq {(cartTotal / 24).toFixed(2)}</span>
                                    <FaCheckCircle className="check-icon" />
                                </div>
                            </div>
                        </div>
                    )}

                    <button className="complete-order" onClick={handleCompleteOrder}>Sifarişi tamamla</button>
                    <div className="step-indicator">
                        <div className="step completed">✔</div>
                        <div className="line red"></div>
                        <div className="step completed">✔</div>
                        <div className="line red"></div>
                        <div className="step active">3</div>
                    </div>
                </div>
            </div>

            <div className='right'>
                <div className="cart-summary">
                    <h6>Ümumi baxış</h6>
                    <div className="item-div">
                        {items.map((item, index) => (
                            <div className="item-elements">
                                <div className="summary-item">
                                    <p>{item.title}</p>
                                    <div className="pricing">
                                        {item.discount > 0 && <p className="old-price">${item.price}</p>}
                                        <p className="new-price">
                                            ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <p className="summary-quantity">{item.quantity} ədəd</p>
                            </div>
                        ))}
                    </div>
                    <div className="summary-discount">
                        <span>Ümumi endirim</span>
                        <span>${totalDiscount.toFixed(2)}</span>
                    </div>
                    <div className="summary-total">
                        <span>Cəmi məbləğ:</span>
                        <span className="total-price">${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
                <div className='common-info'>
                    <h6>Məlumat</h6>
                    <div className='text'>
                        <p>Hörmətli müştəri, xahiş edirik tələb olunan bütün məlumatları tam və doğru formada doldurasınız.</p>
                        <p>* Saytımızda onlayn alın, 30 gün müddətində istər dəyişin, istər geri qaytarın.</p>
                        <p>Xüsusi şərtlər ilə saytımızdan daha ətraflı tanış ola bilərsiniz. Məlumatları bizimlə paylaşmaqla siz şirkətimizin onlayn alış şərtlərinə razılıq verirsiniz. Hər hansı sualınız yaranarsa, 143 nömrəsi ilə əlaqə saxlayın.</p>
                        <p>Bizi seçdiyinizə görə təşəkkür edirik!</p>
                    </div>
                </div>
            </div>
            <button className="complete-order mb" onClick={handleCompleteOrder}>Sifarişi tamamla</button>
        </div>
    )
}

export default CheckOut