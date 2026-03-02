import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    min-height: 100%;
    font-family: 'DM Sans', sans-serif;
    background: #0a2e33;
    color: #ffffff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  a { text-decoration: none; color: inherit; }
  button { font-family: 'DM Sans', sans-serif; }
`;

export default GlobalStyles;
