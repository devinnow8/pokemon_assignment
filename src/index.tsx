import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from "../src/redux/store"
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import ReactDOM from "react-dom/client";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root") as Element);root.render(
    <Provider store={store}>
    <BrowserRouter>
      <Routes />
      </BrowserRouter>
    </Provider>
);

reportWebVitals();
