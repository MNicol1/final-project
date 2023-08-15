import styled from "styled-components";

export const RadioContainer = styled.div`
  padding: 30px 40px;
  margin-bottom: 10px;

  position: relative;

  max-width: 100vw;

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    padding: 15px 40px;
  }

  @media (max-width: 769px) {
    padding-bottom: 20px;
  }

  @media (max-width: 380px) {
    padding: 10px 15px;
  }
`;
export const RadioList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  margin-top: 40px;
  /* position: absolute; */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 15px;
    margin-bottom: 10px;
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 30px;
    padding-bottom: 50px;
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
    /* grid-column-gap: 40px; 
grid-row-gap: 30px; */
    padding-bottom: 50px;
  }
`;
