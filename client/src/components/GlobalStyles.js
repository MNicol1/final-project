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

/* @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.spinner {
  border: 5px solid rgba(255, 255, 255, 0.3); 
  border-top: 5px solid #fff; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;  
  top: 50%;         
  left: 50%;          
  transform: translate(-50%, -50%); 
  animation: spin 2s linear infinite;
} */




`;
