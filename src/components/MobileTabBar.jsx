import { Badge } from "antd";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaUser, FaRegUser } from "react-icons/fa6";
import { HiViewGrid, HiOutlineViewGrid } from "react-icons/hi";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { TbHome, TbHomeFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";

const MobileTabBar = () => {
  const { totalUniqueItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  const tabs = ["home", "wishlist", "categories", "cart", "account"];
  const storedActive = localStorage.getItem("activeTab") || "home";
  const [activeTab, setActiveTab] = useState(storedActive);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mobile-tab-bar">
      <div
        className="active-indicator"
        style={{ left: `${(tabs.indexOf(activeTab) * 19) + 6.7}%` }}
      ></div>

<Link to="/">
                <button
                    className={activeTab === "home" ? "clicked" : ""}
                    onClick={() => handleTabClick("home")}
                >
                    {activeTab === "home" ? <TbHomeFilled /> : <TbHome />}
                </button>
            </Link>

            <Link to="/wishlist">
                <button
                    className={activeTab === "wishlist" ? "clicked" : ""}
                    onClick={() => handleTabClick("wishlist")}
                >
                    <Badge count={totalWishlistItems}>
                        {activeTab === "wishlist" ? <FaHeart /> : <FaRegHeart />}
                    </Badge>
                </button>
            </Link>

            <button
                className={activeTab === "categories" ? "clicked" : ""}
                onClick={() => handleTabClick("categories")}
            >
                {activeTab === "categories" ? <HiViewGrid /> : <HiOutlineViewGrid />}
            </button>

            <Link to="/cart">
                <button
                    className={activeTab === "cart" ? "clicked" : ""}
                    onClick={() => handleTabClick("cart")}
                >
                    <Badge count={totalUniqueItems}>
                        {activeTab === "cart" ? <RiShoppingCart2Fill /> : <RiShoppingCart2Line />}
                    </Badge>
                </button>
            </Link>

            <button
                className={activeTab === "account" ? "clicked" : ""}
                onClick={() => handleTabClick("account")}
            >
                {activeTab === "account" ? <FaUser /> : <FaRegUser />}
            </button>
    </div>
  );
};

export default MobileTabBar;
