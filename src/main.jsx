import React, { StrictMode } from "react";
import App from "./App";
import "./sass/style.scss";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from "react-redux";
import store from "./tools/store/store";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
)
