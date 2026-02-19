import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/Globalstyles";
import { theme } from "./styles/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter> 
      <Routes> 
          <Route path="/" element={<LandingPage />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
