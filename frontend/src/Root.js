import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
//frontend���� ���� ó�� ����Ǵ� �����Դϴ�. App.js�� ȣ���մϴ�. 
const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
