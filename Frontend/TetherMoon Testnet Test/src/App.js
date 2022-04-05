import React, { useState } from "react";
// import { Web3ReactProvider } from "@web3-react/core";
import Sample from "./TetherSimple/view/Sample";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LightTheme from "./components/themes/LightTheme";
import DarkTheme from "./components/themes/DarkTheme";

function App() {
  const [isUsingLightTheme, setIsUsingLightTheme] = useState(false);
  const toggleTheme = () => {
    setIsUsingLightTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isUsingLightTheme ? LightTheme : DarkTheme}>
      <CssBaseline />
      <Sample toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
