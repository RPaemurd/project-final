import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/Globalstyles";
import { theme } from "./styles/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MedicinPage      from './pages/MedicinPage.jsx';

const API_URL = "https://project-final-vq1d.onrender.com";

export const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter> 
      <Routes> 
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/medicin" element={<MedicinPage />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
