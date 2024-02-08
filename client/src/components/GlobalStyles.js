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

.spin-icon-two {
  animation: spins 1s infinite linear;
}

@keyframes spins {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}



@media only screen and (max-width: 767px) {
    .spin-icon-two {
        font-size: 44px; 
    }
}

/* Desktop styles */
@media only screen and (min-width: 769px) {
    .spin-icon-two {
        font-size: 62px; 
    }
}

`;
