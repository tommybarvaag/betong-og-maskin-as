import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import theme from "./utils/theme";

function withMuiThemeProvider(Component) {
  function WithMuiThemeProvider(props) {
    React.useEffect(() => {
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }, []);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithMuiThemeProvider;
}

export default withMuiThemeProvider;
