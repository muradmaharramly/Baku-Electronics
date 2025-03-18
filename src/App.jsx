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
import MonthlyPayment from "./pages/MonthlyPayment";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import DashboardPage from "./components/Dashboard/pages/DashboardPage";
import AdminProducts from "./components/Dashboard/pages/AdminProducts";
import AdminNews from "./components/Dashboard/pages/AdminNews";
import AdminCampaigns from "./components/Dashboard/pages/AdminCampaigns";
import AdminUsers from "./components/Dashboard/pages/AdminUsers";
import Administrators from "./components/Dashboard/pages/Administrators";
import AddProduct from "./components/Dashboard/pages/AddProduct";
import EditProduct from "./components/Dashboard/pages/EditProduct";
import AddNews from "./components/Dashboard/pages/AddNews";
import EditNews from "./components/Dashboard/pages/EditNews";
import AddCampaign from "./components/Dashboard/pages/AddCampaign";
import EditCampaign from "./components/Dashboard/pages/EditCampaign";
import EditUser from "./components/Dashboard/pages/EditUser";
import AddUser from "./components/Dashboard/pages/AddUser";
import AddAdministrator from "./components/Dashboard/pages/AddAdministrator";
import EditAdministrator from "./components/Dashboard/pages/EditAdministrator";
import AdministratorLogin from "./components/Dashboard/auth/AdministratorLogin";
import AdministratorProfile from "./components/Dashboard/pages/AdministratorProfile";
import CheckOut from "./pages/CheckOut";
import BuyTrusted from "./pages/BuyTrusted";
import CustomerCard from "./pages/CustomerCard";
import Map from "./pages/Map";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoute from "./components/Dashboard/auth/ProtectRoute";
import CampaignPopup from "./components/CampaignPopup";

const App = () => {
  return (
    <BrowserRouter>
    <CampaignPopup />
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/loan-purchase" element={<LoanPurchase />} />
          <Route path="/corporative-sales" element={<CorporativeSales />} />
          <Route path="/double-guarantee" element={<DoubleGuarantee />} />
          <Route path="/buy-trusted" element={<BuyTrusted />} />
          <Route path="/customer-card" element={<CustomerCard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/service-centers" element={<ServiceCenters />} />
          <Route path="/delivery-and-billing" element={<DeliveryandBilling />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/news" element={<NewsAndBlogs />} />
          <Route path="/news/:slug" element={<NewsDetails />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:slug" element={<CampaignDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-profile/change-password" element={<ChangePassword />} />
          <Route path="/monthly-payment" element={<MonthlyPayment />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/confirm-email" element={<ConfirmEmail />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/confirm-reset" element={<ConfirmReset />} />
          <Route path="/auth/set-password" element={<SetPassword />} />
          <Route path="/administrative/auth/login" element={<AdministratorLogin />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/administrative/*" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/addproduct" element={<AddProduct />} />
            <Route path="products/editproduct/:slug" element={<EditProduct />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="news/addnews" element={<AddNews />} />
            <Route path="news/editnews/:slug" element={<EditNews />} />
            <Route path="campaigns" element={<AdminCampaigns />} />
            <Route path="campaigns/addcampaign" element={<AddCampaign />} />
            <Route path="campaigns/editcampaign/:slug" element={<EditCampaign />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/adduser" element={<AddUser />} />
            <Route path="users/edituser/:slug" element={<EditUser />} />
            <Route path="administrators" element={<Administrators />} />
            <Route path="administrators/addadministrator" element={<AddAdministrator />} />
            <Route path="administrators/editadministrator/:slug" element={<EditAdministrator />} />
            <Route path="profile" element={<AdministratorProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
