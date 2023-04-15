import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";
import Router from "./Router";
import { LoginStateAtom } from './state/LoginState';
import { useRecoilValue } from "recoil";

function App() {
  const isLoggedIn = useRecoilValue(LoginStateAtom).state;
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
  )
}

export default App;
