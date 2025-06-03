// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Tailwind directives live here
import App from "./App";
// import { DarkModeProvider } from "./Components/DarkModeContext"; // adjust path if needed


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
