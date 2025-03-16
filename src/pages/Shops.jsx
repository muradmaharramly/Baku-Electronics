import React, { useState } from "react";
import { BiSolidMapPin } from "react-icons/bi";
import { CgPin } from "react-icons/cg";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ShopsData = [
    {
        id: 1,
        name: "Azadlıq filialı",
        city: "Bakı",
        address: "Bakı ş., Binəqədi rayonu, Ə. Naxçıvani küç. 3066",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:00-dək"
    },
    {
        id: 2,
        name: "Zabrat filialı 2",
        city: "Bakı",
        address: "Bakı şəh., Zabrat qəs, Babək küçəsi 101B",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 3,
        name: "Crescent Mall filialı",
        city: "Bakı",
        address: "Bakı ş., Neftçilər prospekti 153",
        phone: "143",
        workTime: "Hər gün 10:00-dan 22:00-dək"
    },
    {
        id: 4,
        name: "İnşaatçılar filialı",
        city: "Bakı",
        address: "Bakı şəh., Yasamal r-nu, Abbas Mirzə Şərifzadə küç. 3152-ci məh.",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:00-dək"
    },
    {
        id: 5,
        name: "Əhmədli filialı",
        city: "Bakı",
        address: "Bakı şəh., Əhmədli qəs., Məhəmməd Hadi küç. 9A",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:00-dək"
    },
    {
        id: 6,
        name: "Mərdəkan filialı",
        city: "Bakı",
        address: "Bakı şəh., Xəzər r-nu, Mərdəkan qəs., Sergey Yesenin küç. 78",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 7,
        name: "Bakıxanov filialı 2",
        city: "Bakı",
        address: "Bakı ş., Sabunçu rayonu, Bakıxanov qəsəbəsi, Y.Əliyev və S.Mehmandarov küçələrinin kəsişməsi, Bakıxanov Malla üzbəüz",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:00-dək"
    },
    {
        id: 8,
        name: "Radio Zavod filialı (Bravo hipermarket)",
        city: "Bakı",
        address: "Bakı şəh. Xətai ray. Əhmədli qəs. R.Quliyev k-si. 4",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:00-dək"
    },
    {
        id: 9,
        name: "Zabrat filialı OUTLET",
        city: "Bakı",
        address: "Bakı şəh., Zabrat qəs. (Rahat marketin içi)",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 10,
        name: "Qara Qarayev filialı OUTLET",
        city: "Bakı",
        address: "Bakı şəh., Nizami r-nu, Məhsəti Gəncəvi və Mehdi Abbasov küç. kəsişməsi, 2526-2532-ci məh.",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 11,
        name: "Nərimanov filialı",
        city: "Bakı",
        address: "Bakı şəh., Nərimanov r-nu, Təbriz küç. 98, (N. Nərimanov m.)",
        phone: "143",
        workTime: "Hər gün 10:00-dan 22:00-dək"
    },
    {
        id: 12,
        name: "Ukrayna dairəsi",
        city: "Bakı",
        address: "Bakı şəh., Xətai r-nu, Məhəmməd Hadı küç. 58",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:30-dək"
    },
    {
        id: 13,
        name: "Koroğlu filialı (Bravo hipermarket)",
        city: "Bakı",
        address: "Bakı şəh. Nizami ray. Heydər Əliyev pr. 172",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:00-dək"
    },
    {
        id: 14,
        name: "Gəncə filialı",
        city: "Gəncə",
        address: "Gəncə şəh., Üzeyir Hacıbəyov küç. və Şah İsmayıl Xətai pr. kəsişməsi",
        phone: "143",
        workTime: "Hər gün 9:00-dan 20:00-dək"
    },
    {
        id: 15,
        name: "Gəncə filialı 2",
        city: "Gəncə",
        address: "Gəncə şəh., Nizami Gəncəvi küç. 75",
        phone: "143",
        workTime: "Hər gün 9:00-dan 20:00-dək"
    },
    {
        id: 16,
        name: "İsmayıllı filialı",
        city: "İsmayıllı",
        address: "İsmayıllı şəh., Heydər Əliyev pr., 99",
        phone: "(020) 285 59 12",
        workTime: "Hər gün 09:00-dan 19:00-dək"
    },
    {
        id: 17,
        name: "Lənkəran filialı 2",
        city: "Lənkəran",
        address: "Lənkəran şəh., Həzi Aslanov Xiyabani küç. 62",
        phone: "143",
        workTime: "Hər gün 9:00-dan 20:00-dək"
    },
    {
        id: 18,
        name: "Mingəçevir filialı",
        city: "Mingəçevir",
        address: "Mingəçevir şəh., Müslüm Maqomayev küç., 81/20",
        phone: "(024) 274 40 42",
        workTime: "Hər gün 9:00-dan 20:00-dək"
    },
    {
        id: 19,
        name: "Şəki filialı",
        city: "Şəki",
        address: "Şəki şəh., Sabit Rəhman küç",
        phone: "143",
        workTime: "Hər gün 9:00-dan 20:00-dək"
    },
    {
        id: 20,
        name: "Bərdə filialı",
        city: "Bərdə",
        address: "Bərdə şəh., Üzeyir Hacıbəyov küç.",
        phone: "143",
        workTime: "Hər gün 09:00-dan 19:00-dək"
    },
    {
        id: 21,
        name: "Şəki filialı 2",
        city: "Şəki",
        address: "Şəki şəh., Mikayıl Müşviq küç. 55 (159)",
        phone: "143",
        workTime: "Hər gün 09:00-dan 19:00-dək"
    },
    {
        id: 22,
        name: "Şəmkir filialı",
        city: "Şəmkir",
        address: "Şəmkir şəh., 20 Yanvar küç., 6",
        phone: "(022) 305 34 54",
        workTime: "Hər gün 09:00-dan 19:00-dək"
    },
    {
        id: 23,
        name: "Quba filialı",
        city: "Quba",
        address: "Quba şəh., Heydər Əliyev pr., məh. 29 (Quba bazarın yanı)",
        phone: "(023) 335 56 31",
        workTime: "Hər gün 09:00-dan 19:00-dək"
    },
    {
        id: 24,
        name: "Sumqayıt filialı",
        city: "Sumqayıt",
        address: "Sumqayıt şəh., Üzeyir Hacıbəyov küç. 216",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:00-dək"
    },
    {
        id: 25,
        name: "Hökməli filialı",
        city: "Xırdalan",
        address: "Xırdalan ş., Abşeron rayonu, Hökməli dairəsi Şamaxı şossesi 16",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 26,
        name: "Xaçmaz filialı",
        city: "Xaçmaz",
        address: "Xaçmaz şəh., Nəriman Nərimanov 27L, Xaçmaz 2700",
        phone: "143",
        workTime: "Hər gün 9:00-dan 19:00-dək"
    },
    {
        id: 27,
        name: "Xırdalan filialı 2",
        city: "Xırdalan",
        address: "Xırdalan şəh., Heydər Əliyev pros. 453",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 28,
        name: "Memar Əcəmi filialı",
        city: "Bakı",
        address: "Bakı ş., Nəsimi rayonu, A. Məhərrəmov küç. 24B",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 29,
        name: "Yeni Günəşli",
        city: "Bakı",
        address: "Bakı ş., Suraxanı rayonu, Yeni Günəşli qəsəbəsi, V yaşayış sahəsi, 2Q",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 30,
        name: "İmişli filialı",
        city: "İmişli",
        address: "İmişli şəh., Heydər Əliyev pr",
        phone: "143",
        workTime: "Hər gün 9:00-dan 19:00-dək"
    },
    {
        id: 31,
        name: "Masallı filialı",
        city: "Masallı",
        address: "Masallı şəh., H.Əliyev pr. (Təzə bazar ərazisi, Masallı Mall-un yanı)",
        phone: "143",
        workTime: "Hər gün 9:00-dan 19:00-dək"
    },
    {
        id: 32,
        name: "Masazır filialı",
        city: "Bakı",
        address: "Bakı şəhəri, Masazır qəsəbəsi, Əliağa Vahid küçəsi 362A",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    },
    {
        id: 33,
        name: "DivanEv mağazası",
        city: "Bakı",
        address: "Bakı şəhəri, Xətai rayonu, Babək prospekti ev 2199-cu məhəllə",
        phone: "143",
        workTime: "Hər gün 10:00-dan 19:00-dək"
    },
    {
        id: 34,
        name: "Göyçay filialı",
        city: "Göyçay",
        address: "Heydər Əliyev prospekti 88",
        phone: "143",
        workTime: "Hər gün 9:00-dan 19:00-dək"
    },
    {
        id: 35,
        name: "20 Yanvar filialı (Bravo hipermarket)",
        city: "Bakı",
        address: "Tbilisi prospekti 3007 (Bravo hipermarketin daxilində)",
        phone: "143",
        workTime: "Hər gün 10:00-dan 21:00-dək"
    },
    {
        id: 36,
        name: "Sumqayıt filialı Sülh Plaza",
        city: "Sumqayıt",
        address: "Sumqayıt şəhəri, Bakı küçəsi, 60 Sülh Plaza, Sumqayit 5006",
        phone: "143",
        workTime: "Hər gün 10:00-dan 20:00-dək"
    }

];

const cities = ["Bakı", "Gəncə", "İsmayıllı", "Lənkəran", "Mingəçevir", "Şəki", "Bərdə", "Şəmkir", "Quba", "Sumqayıt", "Xırdalan", "Xaçmaz", "Imişli", "Masallı", "Göyçay"];

const ServiceCenters = () => {
    const [selectedShop, setSelectedShop] = useState("");

    const filteredShops = ShopsData.filter((shop) => {
        return selectedShop === "" || shop.city === selectedShop;
    });

    return (
        <div className="shops">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Mağazalar</span></div>
            <div className="filter-line">
                <h2>Mağazalar</h2>
                <div className="filters">
                    <div>
                        <select onChange={(e) => setSelectedShop(e.target.value)}>
                            <option value="">Mağazalar</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <Link to='/map' className="map-btn"><CgPin />Xəritədə bax</Link>
                </div>
            </div>
            <div className="centers-list">
                {filteredShops.length > 0 ? (
                    filteredShops.map((shop) => (
                        <div className="center-box" key={shop.id}>
                            <Link to='/map' >Xəritədə bax</Link>
                            <div className="center-icon"><BiSolidMapPin /></div>
                            <h3>{shop.name}</h3>
                            <p><strong>Ünvan:</strong> {shop.address}</p>
                            <p><strong>Telefon:</strong> {shop.phone}</p>
                            <p><strong>İş saat:</strong>{shop.workTime}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-results">Nəticə tapılmadı</p>
                )}
            </div>
        </div>
    );
};

export default ServiceCenters;