import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/Home";
import LoanPurchase from "./pages/LoanPurchase";
import CorporativeSales from "./pages/CorporativeSales";
import DoubleGuarantee from "./pages/DoubleGuarantee";
import Brands from "./pages/Brands";
import AboutUs from "./pages/AboutUs";
import ServiceCenters from "./pages/ServiceCenters";
import DeliveryandBilling from "./pages/DeliveryandBilling";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import NotFoundPage from "./pages/NotFoundPage";
import NewsDetails from "./pages/NewsDetails";
import NewsAndBlogs from "./pages/NewsAndBlogs";
import Shops from "./pages/Shops";
import Products from "./pages/Products";
import Campaigns from "./pages/Campaigns";
import CampaignDetails from "./pages/CampaignDetails";
import Login from "./assets/auth/Login";
import Register from "./assets/auth/Register";
import ScrollToTop from "./components/ScrollToTop";
import ConfirmEmail from "./assets/auth/CofirmEmail";
import ResetPassword from "./assets/auth/ResetPassword";
import ConfirmReset from "./assets/auth/ConfirmReset";
import SetPassword from "./assets/auth/SetPassword";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/loan-purchase" element={<LoanPurchase />} />
          <Route path="/corporative-sales" element={<CorporativeSales />} />
          <Route path="/double-guarantee" element={<DoubleGuarantee />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/service-centers" element={<ServiceCenters />} />
          <Route path="/delivery-and-billing" element={<DeliveryandBilling />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/news" element={<NewsAndBlogs />} />
          <Route path="/news/:slug" element={<NewsDetails />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:slug" element={<CampaignDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-profile/change-password" element={<ChangePassword />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/confirm-email" element={<ConfirmEmail />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/confirm-reset" element={<ConfirmReset />} />
          <Route path="/auth/set-password" element={<SetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
