import styled from "styled-components";

import { GoRadioTower } from "react-icons/go";
import "./Radio.css";
import { useAudio } from "./AudioContext";

import { FaPlay, FaPause, FaSpinner } from "react-icons/fa";

import { BsGeoAlt } from "react-icons/bs";

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

  //   const openMapInNewTab = () => {
  //     const bboxPadding = 20; // Increase this value to zoom out more
  //     const bbox = `${item.geoLong - bboxPadding},${item.geoLat - bboxPadding},${
  //       item.geoLong + bboxPadding
  //     },${item.geoLat + bboxPadding}`;

  //     const mapHtml = `
  //     <style>
  //     body, html {
  //         margin: 0;
  //         padding: 0;
  //         height: 100%;
  //         width: 100%;
  //         overflow: hidden;
  //     }
  //     .map-container {
  //         position: fixed; /* Changed to fixed */
  //         top: 0;
  //         left: 0;
  //         right: 0;
  //         bottom: 0;
  //         width: 100%;
  //         height: 100%;
  //     }
  //     .map-container iframe {
  //         width: 100%;
  //         height: 100%;
  //         border: none; /* Remove border */
  //     }
  // </style>
  //         <div class="map-container">
  //             <iframe src="https://www.osmap.us/export/embed.html?bbox=${bbox}&marker=${item.geoLat},${item.geoLong}&layers=ND" style="border:0" loading="lazy" allowfullscreen></iframe>
  //         </div>
  //     `;

  //     const mapWindow = window.open();
  //     mapWindow.document.write(mapHtml);
  //     mapWindow.document.title = "Map View"; // Optionally set the title of the new window
  //   };

  const openMapInNewTab = () => {
    const mapUrl = `https://www.openstreetmap.org/?mlat=${item.geoLat}&mlon=${item.geoLong}#map=3/${item.geoLat}/${item.geoLong}`;
    window.open(mapUrl, "_blank");
  };

  const hasValidCoordinates =
    item && Number.isFinite(item.geoLat) && Number.isFinite(item.geoLong);

  return (
    <Container>
      <StationName>
        <GoRadioTower size={20} /> {item.name}
      </StationName>

      <hr />
      <CountryName>
        {item.country} <State>{item.state}</State>{" "}
        {hasValidCoordinates && (
          <Map title="Map" onClick={openMapInNewTab}>
            <BsGeoAlt size={18} />
            Map
          </Map>
        )}
      </CountryName>

      <Audio>
        <AudioButton
          onClick={handleTogglePlay}
          title={isCurrentRadioPlaying ? "Pause" : "Play"}
        >
          {renderAudioControl()}
        </AudioButton>
      </Audio>
    </Container>
  );
};

const Map = styled.div`
  cursor: pointer;
  /* padding-top: 6px; */
  padding: 5px;
  font-size: 0.9em;
  /* color: #c3e4ff; */
  /* color: rgb(253, 255, 225); */
  color: rgb(255, 224, 224);

  width: fit-content;
  display: inline-block;

  @media (min-width: 1025px) {
    font-size: 0.8em;
    :hover {
      /* text-decoration-line: underline; */
      color: grey;
    }
  }
`;

const ErrorMsg = styled.div`
  font-size: 0.7em;

  @media (max-width: 400px) {
    font-size: 0.5em;
  }
`;

const Container = styled.div`
  transform: translateZ(0);
  padding: 20px 25px;

  position: relative;
  background: linear-gradient(to bottom, black, rgb(37, 37, 52));
  /* background-color: black; */
  /* border-radius: 7px; */

  border: ridge 1px white;

  box-shadow: 0px 0px 6px 4px rgba(246, 219, 233, 0.4);

  @media (min-width: 1025px) {
    background: linear-gradient(to bottom, black, rgb(26, 26, 37));
    border: solid 1px rgb(151, 150, 150);
    box-shadow: 4px 4px 6px rgba(246, 219, 233, 0.4);
    transition: 250ms ease-in-out;

    :hover {
      border: solid 1.2px;
      transform: translate(-7px, -7px);

      /* border-radius: 5%; */
      /* margin: -2px; */

      box-shadow: 9px 9px 11px rgba(212, 172, 193, 0.7);
    }
  }
`;

const StationName = styled.div`
  height: 100px;
  width: 220px;
  overflow: hidden;

  transform: translate3d(0, 0, 0);

  @media (max-width: 768px) {
    height: 110px;
  }
`;
const CountryName = styled.div`
  margin: 10px 0px;
  padding-bottom: 12px;
  height: 45px;
  transform: translateZ(0);
  font-size: 0.9em;
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
      background-color: #c3afc7;
      transition: 0.2s ease-in-out;
    }
  }

  @media (max-width: 380px) {
    height: 35px;
    width: 65%;
  }
`;

// const StyledFaPlay = styled(FaPlay)`
//  ${AudioButton}:hover & {
//   color: rgba(3, 1, 2, 0.7);
//  }
// `

export default Radio;
