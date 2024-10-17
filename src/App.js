import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/login";
import LogInPasswordPage from "./pages/login-password";
import LogInMfaPage from "./pages/login-mfa";
import { useEffect } from "react";
import apiClient from "./api";
import { generateSessionID } from "./utils";
import MainPanelPage from "./pages/panel";
import SettingsPage from "./pages/settings";

const App = () => {
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await apiClient.get("/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        // Extract the CSRF token from the response headers
        const csrfToken = response.headers["set-cookie"]?.find((cookie) =>
          cookie.startsWith("XSRF-TOKEN")
        );

        if (csrfToken) {
          console.log("csrfToken", csrfToken);
          // Set the CSRF token as a cookie in the browser
          document.cookie = csrfToken;
        }
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    getCsrfToken();
    generateSessionID();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/login-password" element={<LogInPasswordPage />} />
        <Route path="/login-mfa" element={<LogInMfaPage />} />
        <Route path="/panel" element={<MainPanelPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
