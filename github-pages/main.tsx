import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "../app/globals.css";
import Home from "../app/page";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Missing root element");
}

createRoot(container).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
