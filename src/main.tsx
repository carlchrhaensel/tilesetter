import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-slate-800 min-h-screen text-white">
      <App />
    </div>
  </React.StrictMode>
);
