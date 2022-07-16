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
          <p>Choose radio stations by country and filter by your favorite musical genre.</p>
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



export default Home;
