import { createGlobalStyle } from "styled-components";
import JejuGothic from "../static/fonts/JejuGothic.ttf";
export const GlobalStyles = createGlobalStyle`
  @font-face {
        font-family: 'JejuGothic';
        src: local('JejuGothic'), local('JejuGothic');
        font-style: normal;
        src: url(${JejuGothic}) format('truetype');
  }
  
  * {
    font-family: 'JejuGothic'
  }
`;
