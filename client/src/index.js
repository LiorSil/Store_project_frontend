import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// React Router
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";
import "./index.css";

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
