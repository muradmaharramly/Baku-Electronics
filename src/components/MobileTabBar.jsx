import { Badge } from "antd";
import React, { useEffect } from "react";
import { FaHeart, FaRegHeart, FaUser, FaRegUser } from "react-icons/fa6";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { TbHome, TbHomeFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";

const MobileTabBar = () => {
    const { totalUniqueItems } = useCart();
    const { totalWishlistItems } = useWishlist();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedEmail = localStorage.getItem("email");
                if (!storedEmail) throw new Error("İstifadəçi email tapılmadı");

                const { data, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", storedEmail)
                    .single();

                if (error) throw error;

                dispatch(loginSuccess(data));
            } catch (error) {
                console.error("Fetch User Data Error:", error.message);
            }
        };

        fetchUserData();
    }, [dispatch]);

    const userEmail = localStorage.getItem("email");

    const tabs = {
        "/": "home",
        "/wishlist": "wishlist",
        "/cart": "cart",
        "/auth/register": "auth/register",
        "/user-profile": "user/profile"
    };

    const activeTab = Object.keys(tabs).includes(location.pathname) ? location.pathname : null;

    const indicatorPositions = {
        "/": 5.5,
        "/wishlist": 32,
        "/cart": 58.5,
        "/auth/register": 85,
        "/user-profile": 85
    };

    return (
        <div className="mobile-tab-bar">
            {activeTab && (
                <div
                    className="active-indicator"
                    style={{ left: `${indicatorPositions[activeTab] || 6.7}%` }}
                ></div>
            )}

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

            <Link to="/cart">
                <button className={activeTab === "/cart" ? "clicked" : ""}>
                    <Badge count={totalUniqueItems}>
                        {activeTab === "/cart" ? <RiShoppingCart2Fill /> : <RiShoppingCart2Line />}
                    </Badge>
                </button>
            </Link>

            <Link to={user && user.emailConfirmed ? "/user-profile" : "/auth/register"}>
                <button className={activeTab === "/user-profile" || activeTab === "/auth/register" ? "clicked" : ""}>
                    {activeTab === "/user-profile" && user?.emailConfirmed ? <FaUser /> : <FaRegUser />}
                </button>
            </Link>

        </div>
    );
};

export default MobileTabBar;