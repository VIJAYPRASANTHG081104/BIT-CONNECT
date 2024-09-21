import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers/index.js";

const store = configureStore({reducer:rootReducer}, composeWithDevTools());
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
