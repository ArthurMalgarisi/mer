import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './styles'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './utils'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={ theme } >
      <Provider store={ store} >
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
