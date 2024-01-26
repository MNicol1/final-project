import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`



body {
    height: 100%;
    margin: 0;
    padding: 0;
   font-family: 'Inter', sans-serif;
   background-color: black;
   color: white;

} 

html {
  -webkit-text-size-adjust: none;  /* WebKit browsers */
  -ms-text-size-adjust: none;      /* IE Mobile */
  text-size-adjust: none;          /* Modern browsers */
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.spinner {
  border: 5px solid rgba(255, 255, 255, 0.3); /* Light grey border */
  border-top: 5px solid #fff; /* White border for the top side */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;  // Position it absolutely within SphereWrapper
  top: 50%;           // Center vertically
  left: 50%;          // Center horizontally
  transform: translate(-50%, -50%); // Adjust for spinner's own size
  animation: spin 2s linear infinite;
}




`;
