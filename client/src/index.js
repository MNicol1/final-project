import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter} from 'react-router-dom';

import App from "./App";
import { AudioProvider } from "./components/AudioContext";

 
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AudioProvider>
    <HashRouter>
  
      <App />

    </HashRouter>
    </AudioProvider>
  </React.StrictMode>
);
