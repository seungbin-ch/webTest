import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LocalUsers from "./axios/LocalUsers.jsx";
import Photo from "./axios/Photo.jsx";
import Movies from "./axios/movies.jsx";
import WorldEwather from "./WorldEwather.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorldEwather />
  </StrictMode>
);
