import React, { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LoanPurchase = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="loan-container">
            <div className="breadcrumb"><Link>Ana səhifə</Link><RiArrowRightDoubleFill /><span>Nisyə alış</span></div>
            <h1 className="top-h1">Nisyə alış</h1>
            <div className="inner-container">
                <div className="content-box">
                    <h2>Nisyə alış prosesi</h2>
                    <p>Məhsulu seçirsiniz.</p>
                    <p>Müraciət formasını doldurursunuz.</p>
                    <p>Ekspert rəy verir.</p>
                    <p>Məhsul sizindir.</p>
                    <p className="note">
                        Qeyd: Qiyməti 60 manatdan aşağı olan məhsullar nisyə alışa şamil edilmir.
                    </p>
                    <p>
                        Aylıq ödənişləri aşağıda qeyd olunan ödəniş terminallarından edə
                        bilərsiniz.
                    </p>
                    <p className="ques">Baku Electronics-də nisyə alış məbləğini necə öyrənmək olar?</p>
                    {!isExpanded && (
                        <div>
                            <h3><strong>1. Hesab.az</strong> və ya <strong>e-pul.az</strong> portalları vasitəsilə</h3>
                            <p>
                                <strong>Addım 1: Hesab.az</strong> və ya ...
                            </p>
                        </div>

                    )}
                    {isExpanded && (
                        <div className="expanded-content">
                            <div className="section">
                                <h3><strong>1. Hesab.az</strong> və ya <strong>e-pul.az</strong> portalları vasitəsilə</h3>
                                <p>
                                    <strong>Addım 1: Hesab.az</strong> və ya <strong>e-pul.az</strong> portalına daxil olun.
                                </p>
                                <p>
                                    <strong>Addım 2:</strong> “Mağaza kreditləri” bölməsini seçin.
                                </p>
                                <p>
                                    <strong>Addım 3:</strong> Açılan pəncərədə Baku Electronics bölməsini klikləyin.
                                </p>
                                <p>
                                    <strong>Addım 4:</strong> Müqavilə nömrəsi və doğum tarixi xanalarını doldurun.
                                    Məlumatlar ekranda göstəriləcək.
                                </p>
                            </div>

                            <div className="section">
                                <h3><strong>2. MilliÖn, eManat</strong> və ya <strong>Bank of Baku</strong> ödəniş terminalları vasitəsilə</h3>
                                <p>
                                    <strong>Addım 1:</strong> MilliÖn, eManat və ya Bank of Baku ödəniş terminallarında
                                    “Mağazalar şəbəkəsi” bölməsinə daxil olun.
                                </p>
                                <p>
                                    <strong>Addım 2:</strong> Açılan pəncərədə Baku Electronics bölməsini klikləyin.
                                </p>
                                <p>
                                    <strong>Addım 3:</strong> Müqavilə nömrəsi və doğum tarixi xanalarını doldurun.
                                    Məlumatlar ekranda göstəriləcək.
                                </p>
                            </div>

                            <div className="section">
                                <h3><strong>3. ABB</strong> və ya <strong>Bank of Baku</strong> tətbiqi vasitəsilə</h3>
                                <p>
                                    <strong>Addım 1:</strong> ABB və ya Bank of Baku tətbiqində “Ödə” bölməsinə daxil olun.
                                </p>
                                <p>
                                    <strong>Addım 2:</strong> “Kredit” xanasını klikləyin, açılan bölmədə Baku Electronics-i seçin.
                                </p>
                                <p>
                                    <strong>Addım 3:</strong> Müqavilə nömrəsi və doğum tarixi xanalarını doldurun.
                                    Məlumatlar ekranda göstəriləcək.
                                </p>
                            </div>

                            <div className="section">
                                <h3><strong>4.</strong> Baku Electronics filiallarında <strong>“Kassa və kredit”</strong> bölməsinə yaxınlaşın</h3>
                                <p>
                                    Ad, soyad, mobil nömrə və ya vəsiqə məlumatlarını təqdim edin. Sizə ödəniş haqqında məlumat təqdim ediləcək.
                                </p>
                            </div>

                            <div className="section">
                                <h3><strong >5. 143</strong> qısa nömrəsi ilə əlaqə saxlayın</h3>
                                <p>
                                    Operatora ad, soyad, mobil nömrə və ya vəsiqə məlumatlarını təqdim edin.
                                    Sizə ödəniş haqqında məlumat veriləcək.
                                </p>
                            </div>

                            <div className="note-section">
                                <p>
                                    <strong>Qeyd 1:</strong> Müqavilə nömrəsi məhsulun alışı zamanı sizə təqdim edilən
                                    müqavilənin ilk səhifəsində qeyd edilir. <strong>Nümunə: BL123456</strong>
                                </p>
                                <p>
                                    <strong>Qeyd 2:</strong> Açılan pəncərədə məhsulun alışı zamanı qeyd olunan ilkin borc
                                    və aylıq məbləğlər qeyd edilir.
                                </p>
                            </div>
                        </div>
                    )}
                    <span className="toggle-text" onClick={toggleContent}>
                        {isExpanded ? "Daha az oxu" : "Daha çox oxu"}
                    </span>
                </div>
                <div className="image-box">
                    <img
                        src="https://img.b-e.az/media/credit_page/Nisy%C9%99_al%C4%B1%C5%9F.jpg"
                        alt="Nisyə alış"
                    />
                </div>
            </div >
        </div >
    );
};

export default LoanPurchase;
