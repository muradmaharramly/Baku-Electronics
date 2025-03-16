import React, { useState } from 'react'
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { RiArrowRightDoubleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const CustomerCard = () => {
    const [activeTab, setActiveTab] = useState("terms");

    return (
        <div className='customer-card'>
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Müştəri kartı</span></div>
            <h2>Müştəri kartı</h2>
            <div className="container">
                <div className="tabs">
                    <button
                        className={activeTab === "terms" ? "active" : ""}
                        onClick={() => setActiveTab("terms")}
                    >
                        Terminlər
                    </button>
                    <button
                        className={activeTab === "conditions" ? "active" : ""}
                        onClick={() => setActiveTab("conditions")}
                    >
                        Ümumi şərtlər
                    </button>
                </div>

                <div className="content">
                    {activeTab === "terms" ? (
                        <div className="terms-section">
                            <div className="info-box">
                                <span className="icon"><HiOutlineComputerDesktop /></span>
                                <p>Ödənişdə istifadə et, ya da topla, istədiyini al</p>
                            </div>
                            <div className="terms-list">
                                <h3>Terminlər</h3>
                                <ul>
                                    <li><span className="dot"></span>Müştəri kartı - “Baku Electronics” MMC-nin müştəri loyallıq proqramına üzvlük kartıdır.</li>
                                    <li><span className="dot"></span>Müştəri - “Baku Electronics” MMC-nin loyallıq proqramında qeydiyyatdan keçmiş şəxs.</li>
                                    <li><span className="dot"></span>OTP (One-time password) - Əməliyyatların icrası zamanı istifadə edilən birdəfəlik məxfi koddur.</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="conditions-section">
                            <div className="terms-list">
                                <h3>Ümumi şərtlər</h3>
                                <ul>
                                    <li><span className="dot"></span> Müştəri kartı Baku Electronics şirkətinə məxsusdur və müştəri tərəfindən qorunması vacibdir.</li>
                                    <li><span className="dot"></span> Müştəri kartını 18 yaşına çatmış fiziki şəxslər könüllü və heç bir məbləğ ödəmədən əldə edə bilər.</li>
                                    <li><span className="dot"></span> Proqramda iştirak etmək üçün müvafiq anketi doldurmaqla qeydiyyatdan keçmək tələb olunur.</li>
                                    <li><span className="dot"></span> Anketdə göstərilən şəxsi məlumatlar müştəri tərəfindən qeyd edilməli və verdiyi məlumatların düzgünlüyünü imzası ilə təsdiqlənməlidir.</li>
                                    <li><span className="dot"></span> “Baku Electronics” MMC-nin loyallıq proqramı çərçivəsində müştəriyə eyni zamanda iki və daha çox kart verilə bilməz.</li>
                                    <li><span className="dot"></span> Müştərilər qeyd etdiyi əlaqə məlumatı (mobil nömrə) vasitəsi ilə OTP kod əldə edir.</li>
                                    <li><span className="dot"></span> OTP Müştəri kartında toplanan keşbeki xərcləmək üçün istifadə olunur.</li>
                                    <li><span className="dot"></span> Baku Electronics MMC loyallıq proqramının şərtlərində dəyişiklik hüququnu özündə saxlayır.</li>
                                    <li><span className="dot"></span> Müştəri şəxsi məlumatlarının loyallıq proqramı daxilində istifadəsinə tam icazə verir.</li>
                                    <li><span className="dot"></span> Müştəri reklam xarakteri daşıyan informasiyanın SMS, elektron poçt və zəng vasitəsi ilə ona çatdırılmasına tam icazə verir.</li>
                                    <li><span className="dot"></span> Baku Electronics loyallıq proqramına üzv olan müştərini üzvlükdən çıxartmaq hüququna malikdir.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default CustomerCard