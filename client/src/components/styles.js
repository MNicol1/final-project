import styled from "styled-components";

export const RadioContainer = styled.div`
  padding: 40px 40px;
  margin-bottom: 200px;

  position: relative;
  max-height: 100vh;
  max-width: 100vw;
  /* overflow-y: auto; */

  /* @media (max-width: 600px) { 
padding: 50px 20px;
} */


`;
export const RadioList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  margin-top: 40px;

  @media (max-width: 1200px) {
grid-template-columns: repeat(3, 1fr);
grid-row-gap: 15px; 
} 

@media (max-width: 600px) {
grid-template-columns: repeat(2, 1fr);
grid-column-gap: 10px; 
}
`;


