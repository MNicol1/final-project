import { useParams } from "react-router-dom";
import useRadio from "../hooks/useRadio";
import { GiMusicalNotes } from "react-icons/gi";

import Radio from "./Radio";
import { RadioContainer, RadioList } from "./styles";
import styled from "styled-components";

const CountryPage = () => {
  const { country } = useParams();
  console.log(country);

  const stations = useRadio({ country: country, limit: 20 });

  if (stations.length === 0) {
    return (
      <Main>
        <Msg>
        <GiMusicalNotes size={22} />  Loading...sorry, no stations found 
        </Msg>
      </Main>
    );
  }

  return (
    <RadioContainer>
      <RadioList>
        {stations.map((item) => {
          return (
            // place Radio componet here

            <Radio item={item} key={item.id} />
          );
        })}
      </RadioList>
    </RadioContainer>
  );
};

const Main = styled.div`
  display: flex;
  justify-content: center;
`;
const Msg = styled.h3`
  margin-top: 150px;
`;

export default CountryPage;
