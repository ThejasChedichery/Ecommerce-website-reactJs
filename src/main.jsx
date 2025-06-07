import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from './Utilities/Store.jsx';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
