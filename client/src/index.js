import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";




// React Router
import { BrowserRouter } from "react-router-dom";

// Redux configuration
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./app/App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
