// react dapendencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// stylesheet
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

// react component
import App from './App.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
