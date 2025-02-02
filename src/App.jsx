import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./components/pages/Home";
import LoanPurchase from "./components/pages/LoanPurchase";
import CorporativeSales from "./components/pages/CorporativeSales"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoubleGuarantee from "./components/pages/DoubleGuarantee";
import Brands from "./components/pages/Brands";
import AboutUs from "./components/pages/AboutUs";
import ServiceCenters from "./components/pages/ServiceCenters";
import DeliveryandBilling from "./components/pages/DeliveryandBilling";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/loan-purchase" element={<LoanPurchase />}></Route>
        <Route path="/corporative-sales" element={<CorporativeSales />}></Route>
        <Route path="/double-guarantee" element={<DoubleGuarantee />}></Route>
        <Route path="/brands" element={<Brands />}></Route>
        <Route path="/service-centers" element={<ServiceCenters />}></Route>
        <Route path="/delivery-and-billing" element={<DeliveryandBilling />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
