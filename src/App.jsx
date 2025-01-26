import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoanPurchase from "./components/pages/LoanPurchase";
import CorporativeSales from "./components/pages/CorporativeSales"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DoubleGuarantee from "./components/pages/DoubleGuarantee";
import Brands from "./components/pages/Brands";
import AboutUs from "./components/pages/AboutUs";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/LoanPurchase" element={<LoanPurchase />}></Route>
        <Route path="/CorporativeSales" element={<CorporativeSales />}></Route>
        <Route path="/DoubleGuarantee" element={<DoubleGuarantee />}></Route>
        <Route path="/Brands" element={<Brands />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
