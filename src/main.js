import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App";
import store from "./store/store";
import { verifyTokenThunk } from "./store/actions/authThunks";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

store.dispatch(verifyTokenThunk());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
