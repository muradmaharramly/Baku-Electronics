import React, { StrictMode } from "react";
import App from "./App";
import "./sass/style.scss";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from "react-redux";
import store from "./tools/store/store";
import { CartProvider } from "react-use-cart";
import { WishlistProvider } from "./context/WishlistContext";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <CartProvider>
                <WishlistProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </WishlistProvider>
            </CartProvider>
        </Provider>
    </StrictMode>,
)
