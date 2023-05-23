import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";
import Router from "./Router";
import { LoginStateAtom } from './state/LoginState';
import { useRecoilValue } from "recoil";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const isLoggedIn = useRecoilValue(LoginStateAtom).state;
  console.log(axios.defaults.baseURL)
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
  )
}

export default App;
