import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import { AppContext } from "../contexts/AppContext";
import { API } from "../config";
import axios from "axios";
import { CookiesProvider } from "react-cookie";

axios.defaults.baseURL = `${API}/api`;

axios.defaults.withCredentials = true;

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [ctx, setCtx] = useState({
    data: [],
    loading: false,
    status: null,
    message: null,
  });
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppContext.Provider value={{ ctx, setCtx }}>
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </AppContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
