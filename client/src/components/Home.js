import useRadio from "../hooks/useRadio";
import { RadioContainer, RadioList } from "./styles";
import Radio from "./Radio";
import styled from "styled-components";


const Home = () => {
  const stations = useRadio({ country: "", limit: 8 });

  if (stations) {
    return (
      <>
        <RadioContainer>
          <h3>Welcome!</h3>
          <RadioList>
            {stations.map((item) => {
              return <Radio item={item} key={item.id} />;
            })}
          </RadioList>
        </RadioContainer>
      </>
    );
  } else {
    return null;
  }
};





export default Home;
