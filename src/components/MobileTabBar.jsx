import { Badge } from "antd";
import React from "react";
import { FaHeart, FaRegHeart, FaUser, FaRegUser } from "react-icons/fa6";
import { HiViewGrid, HiOutlineViewGrid } from "react-icons/hi";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { TbHome, TbHomeFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";

const MobileTabBar = () => {
    const { totalUniqueItems } = useCart();
    const { totalWishlistItems } = useWishlist();
    const location = useLocation();

    const userEmail = localStorage.getItem("email");

    const activeTab = location.pathname;
    const tabs = {
        "/": "home",
        "/wishlist": "wishlist",
        "/cart": "cart",
        "/auth/register": "auth/register"
    };

    return (
        <div className="mobile-tab-bar">
            <div
                className="active-indicator"
                style={{ left: `${(Object.values(tabs).indexOf(tabs[activeTab]) * 19) + 6.7}%` }}
            ></div>

            <Link to="/">
                <button className={activeTab === "/" ? "clicked" : ""}>
                    {activeTab === "/" ? <TbHomeFilled /> : <TbHome />}
                </button>
            </Link>

            <Link to="/wishlist">
                <button className={activeTab === "/wishlist" ? "clicked" : ""}>
                    <Badge count={totalWishlistItems}>
                        {activeTab === "/wishlist" ? <FaHeart /> : <FaRegHeart />}
                    </Badge>
                </button>
            </Link>
            <Link to="/">
                <button>
                    <HiOutlineViewGrid />
                </button>
            </Link>

            <Link to="/cart">
                <button className={activeTab === "/cart" ? "clicked" : ""}>
                    <Badge count={totalUniqueItems}>
                        {activeTab === "/cart" ? <RiShoppingCart2Fill /> : <RiShoppingCart2Line />}
                    </Badge>
                </button>
            </Link>
            <Link to={userEmail ? "/user-profile" : "/auth/register"}>
                <button className={activeTab === "/auth/register" ? "clicked" : ""}>
                    {activeTab === "/auth/register" ? <FaUser /> : <FaRegUser />}
                </button>
            </Link>
        </div>
    );
};

export default MobileTabBar;
