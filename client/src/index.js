import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter} from 'react-router-dom';

import App from "./App";
import { AudioProvider } from "./components/AudioContext";
import { CountriesProvider } from "./components/CountriesContext";


 
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
 
  <CountriesProvider>
  <AudioProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AudioProvider>
</CountriesProvider>

);
