import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RikerRumble from "./RikerRumble";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RikerRumble />
  </StrictMode>
);
