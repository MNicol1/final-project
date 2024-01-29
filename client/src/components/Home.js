import styled, { keyframes } from "styled-components";
// import React, { Suspense } from "react";
// const SphereComponent = React.lazy(() => import("./SphereComponent"));
import SphereComponent from "./SphereComponent";

const Home = () => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path d="M0 10 L20 0 L20 10" stroke="white" stroke-width="1" fill="none"/>
</svg>


`;

  // Function to encode SVG
  const encodeSVG = (svg) => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Encode SVG to Data URI
  const svgDataUri = encodeSVG(svgContent);

  return (
    <Main>
      <ContentWrapper>
        <Title>Welcome!</Title>
        <Content>
          To tune in and listen to radio broadcasts from around the world,
          simply select any country to start browsing stations. Further filter
          by genre or search for a specific station name. Additionally, create a
          list of favorites.
        </Content>
        <Wave svgDataUri={svgDataUri}></Wave>
      </ContentWrapper>
      <SphereWrapper>
        <SphereComponent />
      </SphereWrapper>
    </Main>
  );
};

const fillIn = keyframes`
  from {
    width: 0;
  }
  to {
    width: 50%;
  }
`;

const Wave = styled.div`
  position: relative;
  padding: 10px; /* Adjust as needed */

  color: white; /* Text color */

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 10px; /* Height of the zig-zag pattern */
    background-image: url("${(props) => props.svgDataUri}");
    background-repeat: repeat-x;
    animation: ${fillIn} 2s forwards;
  }
`;

const Title = styled.div`
  font-size: 1.4em;
  /* border-bottom: 1px solid white; */
`;
const Content = styled.p`
  text-align: left;
  text-justify: inter-word;
  font-size: 1.1em;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85vh; // Adjust the height as needed
  position: relative; // Added for relative positioning
  background: linear-gradient(to right, black, rgb(28, 28, 38));

  @media (max-width: 1025px) {
    padding-top: 7%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(to right, black 1%, rgb(70, 70, 90));
  }
`;

const ContentWrapper = styled.div`
  margin-top: -220px;
  max-width: 45%;
  margin-left: 40px;
  z-index: 1; // Make sure content is above the SphereComponent

  @media (max-width: 1025px) {
    position: absolute; // Overlay on top of the SphereComponent
    top: 2; // Adjust top position as needed
    left: 2%; // Start from a bit from the left
    transform: translate(0, 0); // Remove centering
    max-width: 95%; // Adjust width as needed to make it wider
    width: auto; // Adjust width as per content
    margin: 0;
    padding: 20px; // Add padding for better readability
    font-size: 0.9em;
    color: white; // Ensure text is readable over the background
    text-align: left; // Align text to left if preferred
  }
`;

const SphereWrapper = styled.div`
  flex: 2;
  width: 55%;
  height: 100%;
  margin-right: 15px;
  position: relative; // This is important for absolute positioning of children
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1025px) {
    height: 100%; // Or 'auto' depending on desired aspect ratio
    padding: 0px 5px;
    width: 100%;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden; // To handle any overflow issues
  }
`;

export default Home;
