import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import LoanPurchase from "./pages/LoanPurchase";
import CorporativeSales from "./pages/CorporativeSales"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoubleGuarantee from "./pages/DoubleGuarantee";
import Brands from "./pages/Brands";
import AboutUs from "./pages/AboutUs";
import ServiceCenters from "./pages/ServiceCenters";
import DeliveryandBilling from "./pages/DeliveryandBilling";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";



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
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
