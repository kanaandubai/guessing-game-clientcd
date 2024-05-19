import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import {store} from './store/index';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}> 
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
