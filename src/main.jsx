import React, { StrictMode } from "react";
import App from "./App";
import "./sass/style.scss";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>,
)
