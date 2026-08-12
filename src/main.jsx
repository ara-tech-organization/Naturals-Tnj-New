import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/sections.css";
import "./styles/pages.css";
// Last, so its `.editorial` scope can refine anything above it without !important
import "./styles/editorial.css";
// Later still: the homepage's own sections, which exist nowhere else
import "./styles/home.css";

// Marks that JS is running. Reveal animations only hide their elements under
// `.js`, so if the bundle ever fails to load the content stays visible.
document.documentElement.classList.add("js");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
