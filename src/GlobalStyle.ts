import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    }

    body {
    display: flex;
    justify-content: center;
    background-color: #f8f8f8;
    }

    #root {
    margin: 0 auto;
    text-align: center;
    }

`;

export default GlobalStyle;