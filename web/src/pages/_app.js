import * as React from "react";
import withMuiThemeProvider from "../withMuiThemeProvider";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withMuiThemeProvider(MyApp);
