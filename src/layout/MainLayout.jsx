import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import MobileTabBar from "../components/MobileTabBar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <MobileTabBar />
      <Footer />
    </>
  );
};

export default MainLayout;
