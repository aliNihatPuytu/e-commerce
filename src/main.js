import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App";
import store from "./store/store";
import CenterNoticeHost from "./components/CenterNoticeHost";
import AppBootstrap from "./components/AppBootstrap";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppBootstrap />
        <App />
        <CenterNoticeHost />
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
