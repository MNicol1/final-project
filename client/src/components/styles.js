import styled from "styled-components";

export const RadioContainer = styled.div`
  padding: 40px 40px;

  position: relative;
  max-height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
`;
export const RadioList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 30px;
  margin-top: 40px;
  /* max-width: 1200px; */
  /* border: 1px solid black; */
`;
