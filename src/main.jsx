import ReactDOM from 'react-dom/client'
import React from 'react'
import Apps from './App2'
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Apps/>
  </BrowserRouter>
)
