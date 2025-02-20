import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import ThemeProvider from "./Context/ThemeProvider.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
