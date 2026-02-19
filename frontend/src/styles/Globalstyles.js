import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

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
