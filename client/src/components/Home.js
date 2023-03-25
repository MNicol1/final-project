import useRadio from "../hooks/useRadio";
import { RadioContainer, RadioList } from "./styles";
import Radio from "./Radio";
import styled from "styled-components";

const Home = () => {
  const stations = useRadio({ country: "", limit: 9 });

  if (stations) {
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
  } else {
    return null;
  }
};

const Main = styled.div`
  margin-bottom: 100px;
`;
const Content = styled.p`
  text-align: left;
  text-justify: inter-word;
`;

export default Home;
