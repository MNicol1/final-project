import styled from "styled-components";

import { GoRadioTower } from "react-icons/go";
import "./Radio.css";
import { useAudio } from "./AudioContext";

import { FaPlay, FaPause, FaSpinner } from "react-icons/fa";

const Radio = ({ item }) => {
  const {
    playAudio,
    pauseAudio,
    isPlaying,
    currentURL,
    isLoading,
    setCurrentItem,
  } = useAudio();

  const isCurrentRadioPlaying = currentURL === item.urlResolved && isPlaying;

  const handleTogglePlay = () => {
    if (isCurrentRadioPlaying) {
      pauseAudio();
    } else {
      playAudio(item.urlResolved);
      setCurrentItem(item);
    }
  };
  const renderAudioControl = () => {
    if (isLoading && isCurrentRadioPlaying) {
      return <FaSpinner className="spin-icon" />;
    } else if (isCurrentRadioPlaying) {
      return <FaPause />;
    } else {
      return <FaPlay />;
    }
  };

  return (
    <Container>
      <StationName>
        <GoRadioTower size={20} /> {item.name}
      </StationName>

      <hr />
      <CountryName>
        {item.country} <State>{item.state}</State>
      </CountryName>

      <Audio>
        <AudioButton onClick={handleTogglePlay}>
          {renderAudioControl()}
        </AudioButton>
      </Audio>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid white;
  padding: 20px 25px;
  transition: 400ms linear;

  :hover {
    transform: scale(1.1);
    border: 2px solid #f8d6fe;
    border-radius: 5%;

    /* * this fixes the janky movement issue for full screen size ...  */
    margin: -2px;
  }

  @media (max-width: 650px) {
    transition: none;
    :hover {
      transform: none;
      border-radius: 0%;
      border: 1px solid white;
      margin: 0;
    }
  }

  /* @media (max-width: 380px) {
    padding: 20px 30px;
  } */
`;

const StationName = styled.div`
  height: 110px;
  width: 220px;
`;
const CountryName = styled.div`
  margin: 10px 0px;
  height: 40px;
`;

const State = styled.span`
  font-size: 0.8em;
  font-style: italic;
  color: #f8d6fe;
`;

const Audio = styled.div`
  /* margin-top: 20px; */
`;

const AudioButton = styled.button`
  width: 200px;
  padding-top: 5px;
  height: 40px;
  font-size: 1.3em;
`;

export default Radio;
