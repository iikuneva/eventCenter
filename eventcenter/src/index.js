import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Auth from './Auth';


ReactDOM.render(
  <BrowserRouter>
    <Auth>
      <App />
    </Auth>
  </BrowserRouter>, document.getElementById('root')
);

