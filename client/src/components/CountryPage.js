import { useParams } from "react-router-dom";
import useRadio from "../hooks/useRadio";

import Radio from "./Radio";
import { RadioContainer, RadioList } from "./styles";

const CountryPage = () => {
  const { country } = useParams();
  console.log(country);

  const stations = useRadio({ country: country, limit: 20 });

  if (stations.length === 0) {
    return <p>LOADING</p>;
  }

  return (
    <RadioContainer>
      <RadioList>
        {stations.map((item) => {
          return (
            // place Radio componet here

            <Radio item={item}
            key={item.id}/>
          );
        })}
      </RadioList>
    </RadioContainer>
  );
};

export default CountryPage;
