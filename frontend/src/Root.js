import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
//frontend에서 가장 처음 실행되는 파일입니다. App.js를 호출합니다. 
const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
