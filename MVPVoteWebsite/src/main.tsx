import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/mockServiceWorker.js").catch(error => {
      console.error("Service Worker registration failed:", error);
    });
  });
} else {
  console.error("Service Worker is not supported in this browser.");
}

if (import.meta.env.VITE_MOCK_API === "1") {
  import("./mocks/browser")
    .then(({worker}) => {
      worker.start({
        onUnhandledRequest: "bypass",
      });
    })
    .then(() => {
      root.render( <React.StrictMode>
        <App />
      </React.StrictMode>);
    });
} else {
  root.render( <React.StrictMode>
    <App />
  </React.StrictMode>);
}