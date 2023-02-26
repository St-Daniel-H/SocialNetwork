import ReactDOM from 'react-dom/client'
import React from 'react'
import Apps from './App2'
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware  } from "redux";
import { Provider } from "react-redux";
import allReducer from "./FrontEnd/Redux/reducer/allReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { useState,useEffect,useHistory} from "react";
import jwt_decode from "jwt-decode";


let store = createStore(
  allReducer, composeWithDevTools(
    applyMiddleware(),
    // other store enhancers if any
  ));

store.subscribe(() => {
  console.log(store.getState());
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
   <Apps/>
  </BrowserRouter>
  </Provider>
)
