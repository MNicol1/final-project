import useRadio from "../hooks/useRadio";
import { RadioContainer, RadioList } from "./styles";
import Radio from "./Radio";
import styled from "styled-components";

import { BiMessageAltError } from "react-icons/bi";

const Home = () => {
  const { stations, error } = useRadio({ country: "", limit: 9 });

  if (error) {
    return (
      <Main>
        <RadioContainer>
          <h3>Welcome!</h3>
          <Content>
            To tune in and listen to radio from around the world, simply choose
            stations by country and filter down further by your favorite music
            genre.
          </Content>

          <ErrorMessage>
            <span>
              <BiMessageAltError size={40} />
            </span>
            An error occurred: Please refresh your browser, or try again later.
            Check url : http://worldwaveradio.ca/
          </ErrorMessage>
        </RadioContainer>
      </Main>
    );
  }

  if (Array.isArray(stations) && stations.length > 0) {
    const uniqueStations = stations.filter((station, index, self) => {
      const nameMatch =
        index === self.findIndex((s) => s.name === station.name);
      const urlMatch =
        index === self.findIndex((s) => s.urlResolved === station.urlResolved);
      return nameMatch && urlMatch;
    });

    return (
      <Main>
        <RadioContainer>
          <h3>Welcome!</h3>
          <Content>
            To tune in and listen to radio from around the world, choose
            stations by country and filter down further by your favorite music
            genre.
          </Content>

          <RadioList>
            {uniqueStations.map((item) => {
            
              return <Radio item={item} key={item.id} />;

            })}
            
          </RadioList>
        </RadioContainer>
      </Main>
    );

    
  }

 
 
  return null;

  
};

const Main = styled.div`
  margin-bottom: 100px;
`;
const Content = styled.p`
  text-align: left;
  text-justify: inter-word;
`;

const ErrorMessage = styled.div`
  color: white;
  padding: 100px;
  display: flex;
  text-align: center;
  justify-content: center;
  border-top: 1px solid white;

  @media (max-width: 768px) {
    padding: 70px 5px;
  }
`;

export default Home;

// CHANGE FOR ERROR HANDLING

// const Home = () => {
//   const stations = useRadio({ country: "", limit: 9 });

//   if (stations) {
//     const uniqueStations = stations.filter((station, index, self) => {
//       const nameMatch =
//         index === self.findIndex((s) => s.name === station.name);
//       const urlMatch =
//         index === self.findIndex((s) => s.urlResolved === station.urlResolved);
//       return nameMatch && urlMatch;
//     });
