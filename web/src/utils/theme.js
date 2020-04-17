import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontSize: 15,
    fontFamily: ['"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "4.8rem"
    },
    h2: {
      fontSize: "3.6rem"
    },
    h3: {
      fontSize: "2rem"
    },
    h4: {
      fontSize: "1.8rem"
    },
    h5: {
      fontSize: "1.6rem"
    }
  },
  palette: {
    common: { black: "rgb(38, 50, 56)", white: "rgb(249, 249, 249)" },
    background: { paper: "rgb(255, 255, 255)", default: "rgb(255, 255, 255)" },
    primary: {
      light: "rgb(207, 216, 220)",
      main: "rgb(20, 24, 36)",
      dark: "rgb(55, 71, 79)",
      contrastText: "rgb(255, 255, 255)"
    },
    secondary: {
      light: "rgb(209, 196, 233)",
      main: "rgb(255, 182, 0)",
      dark: "rgb(49, 27, 146)",
      contrastText: "rgb(255, 255, 255)"
    },
    error: {
      light: "rgb(229, 115, 115)",
      main: "rgb(244, 67, 54)",
      dark: "rgb(211, 47, 47)",
      contrastText: "rgb(255, 255, 255)"
    },
    text: { primary: "rgb(20, 24, 36)", secondary: "rgba(0, 0, 0, 0.54)" },
    bomColors: {
      yellow: "rgb(255, 182, 0)",
      black: "rgb(20, 24, 36)"
    }
  }
});

export default responsiveFontSizes(theme);
