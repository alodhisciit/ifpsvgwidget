import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const WidgetDiv = document.getElementById("ifp_widget");

console.log("widget div: ", WidgetDiv);

ReactDOM.render(
  <React.StrictMode>
    <App domElement={WidgetDiv} />
  </React.StrictMode>,
  WidgetDiv
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
