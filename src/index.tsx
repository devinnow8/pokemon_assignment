import React from 'react';
import ReactDOM from 'react-dom';  // Changed import statement
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from "../src/redux/store"
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);

reportWebVitals();
