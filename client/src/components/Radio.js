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
    sourceError,
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
    if (sourceError === item.urlResolved) {
      return <ErrorMsg>Error: No source found</ErrorMsg>;
    } else if (isLoading && isCurrentRadioPlaying) {
      return <FaSpinner className="spin-icon" style={{ fontSize: "20px" }} />;
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

const ErrorMsg = styled.div`
  font-size: 0.7em;

  @media (max-width: 400px) {
    font-size: 0.5em;
  }
`;

const Container = styled.div`
  padding: 20px 25px;

  position: relative;
  background-color: black;
  /* border-radius: 7px; */

  border: solid 1px rgb(151, 150, 150);

  box-shadow: 4px 4px 6px rgba(246, 219, 233, 0.4);

  @media (min-width: 1020px) {
    transition: 400ms linear;
    :hover {
      transform: scale(1.1);
      border: solid 1px #f8d6fe;
      /* border-radius: 5%; */
      margin: -2px;

      box-shadow: 5px 5px 8px rgba(212, 172, 193, 0.7);
    }
  }
`;

const StationName = styled.div`
  height: 100px;
  width: 220px;
  overflow: hidden;
`;
const CountryName = styled.div`
  margin: 10px 0px;
  padding-bottom: 12px;
  height: 40px;
`;

const State = styled.span`
  font-size: 0.8em;
  font-style: italic;
  color: #f8d6fe;
`;

const Audio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* @media (max-width: 380px) {
 display: block;
  } */
`;

const AudioButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 1.3em;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  background-color: white;

  @media (min-width: 1069px) {
    :hover {
      background-color: #f8d6fe;
      transition: 0.3s ease-in-out;
    }
  }

  @media (max-width: 380px) {
    height: 35px;
    width: 70%;
  }
`;

export default Radio;
