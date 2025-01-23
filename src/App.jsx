import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
