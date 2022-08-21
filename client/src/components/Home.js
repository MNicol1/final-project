import useRadio from "../hooks/useRadio";
import { RadioContainer, RadioList } from "./styles";
import Radio from "./Radio";
import styled from "styled-components";




const Home = () => {
  const stations = useRadio({ country: "", limit: 8 });

  if (stations) {
    return (
      <Main>
        <RadioContainer>
          <h3>Welcome!</h3>
          <Content>To tune in and listen to radio from around the world, freely choose stations by country and filter down further by your favorite music genre.</Content>
        
          <RadioList>
            {stations.map((item) => {
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
`
const Content = styled.p`
 text-align: justify;
  text-justify: inter-word;
`;




export default Home;
