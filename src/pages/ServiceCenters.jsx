import React, { useState } from "react";
import { BiSolidMapPin } from "react-icons/bi";
import { CgPin } from "react-icons/cg";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const serviceCentersData = [
    {
        id: 1,
        name: '"BSC" MMC-nin Nərimanov filialı',
        address: "Bakı şəhəri, Nərimanov Rayonu, Əhməd Rəcəbli 50C",
        phone: "(012) 991 ext 7400; 055-414-39-00; 055-330-50-04",
        brand: "Samsung"
    },
    {
        id: 2,
        name: '"BSC" MMC-nin Əhmədli filialı',
        address: "Bakı şəhəri, Xətai r-nu M.Hadi küç 41Y",
        phone: "(012) 991 ext 7451",
        brand: "Apple"
    },
    {
        id: 3,
        name: '"BSC" MMC-nin M.Rəsulzadə filialı',
        address: "Bakı şəhəri, M.Rəsulzadə ev 10",
        phone: "(012) 991 ext 7463",
        brand: "XIAOMI"
    }
];

const brands = ["Samsung", "Apple", "Tognana", "DivanEv", "Koopman", "XIAOMI", "Bosch", "Liqui Moly", "Cotton box"];

const ServiceCenters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    const filteredCenters = serviceCentersData.filter((center) => {
        return (
            center.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedBrand === "" || center.brand === selectedBrand)
        );
    });

    return (
        <div className="service-centers">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Servis mərkəzləri</span></div>
            <div className="filter-line">
                <h2>Servis mərkəzləri</h2>
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Axtar ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div>
                        <select onChange={(e) => setSelectedBrand(e.target.value)}>
                            <option value="">Brendlər</option>
                            {brands.map((brand, index) => (
                                <option key={index} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>
                    <Link to='/map' className="map-btn"><CgPin />Xəritədə bax</Link>
                </div>
            </div>
            <h5 className="tab-note"><strong>Qeyd:</strong>Siyahıda qeyd olunmayan ərazilərdə xidmət üçün, vahid çağrı mərkəzimizə müraciət edə bilərsiniz <strong>(012) 991</strong></h5>
            <div className="centers-list">
                {filteredCenters.length > 0 ? (
                    filteredCenters.map((center) => (
                        <div className="center-box" key={center.id}>
                            <div className="center-icon"><BiSolidMapPin /></div>
                            <h3>{center.name}</h3>
                            <p><strong>Ünvan:</strong> {center.address}</p>
                            <p><strong>Telefon:</strong> {center.phone}</p>
                            <p><strong>İş saat:</strong></p>
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