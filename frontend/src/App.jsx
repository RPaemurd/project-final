import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/Globalstyles";
import { theme } from "./styles/theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MedicinPage from "./pages/MedicinPage";
import FaqPage from "./pages/FaqPage";
import OmOssPage from "./pages/OmossPage";
import HurdetFungerar from "./pages/Hurdetfungerarpage"
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilPage from "./pages/ProfilPage";

export const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter> 
      <Routes> 
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profil" element={
            <ProtectedRoute> 
              <ProfilPage /> 
            </ProtectedRoute> } />
          <Route path="/medicin" element={<MedicinPage />} />
          <Route path="/oss" element={<OmOssPage />} />
          <Route path="/hurdetfungerar" element={<HurdetFungerar />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
