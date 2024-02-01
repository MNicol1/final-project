import styled from "styled-components";

import { GoRadioTower } from "react-icons/go";
import "./Radio.css";
import { useAudio } from "./AudioContext";

import { FaPlay, FaStop } from "react-icons/fa";

import { BsGeoAlt } from "react-icons/bs";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";

import { ImSpinner2 } from "react-icons/im";

const Radio = ({
  item,
  isRecentPlay,
  onRemove,
  isInFavoritesList,
  removeFromRecentPlays,
}) => {
  const {
    playAudio,
    pauseAudio,
    isPlaying,
    currentURL,
    isLoading,
    setCurrentItem,
    sourceError,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useAudio();

  const isFavorite = favorites.some((fav) => fav.url === item.urlResolved);

  // const showRemoveIcon = isRecentPlay || isInFavoritesList;

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(item.urlResolved);
    } else {
      addToFavorites(item);
    }
  };

  const isCurrentRadioPlaying = currentURL === item.urlResolved && isPlaying;

  const handleTogglePlay = () => {
    if (isCurrentRadioPlaying) {
      pauseAudio();
    } else {
      setCurrentItem(item);
      playAudio(item.urlResolved, item);
    }
  };

  const renderAudioControl = () => {
    if (sourceError === item.urlResolved) {
      return <ErrorMsg>Error: No source found</ErrorMsg>;
    } else if (isLoading && isCurrentRadioPlaying) {
      return <ImSpinner2 className="spin-icon" style={{ fontSize: "20px" }} />;
    } else if (isCurrentRadioPlaying) {
      return <FaStop />;
    } else {
      return <FaPlay />;
    }
  };

  //For MAP functionality
  const openMapInNewTab = () => {
    if (!hasValidCoordinates) return;

    const mapUrl = `${window.location.origin}/#map?lat=${item.geoLat}&lng=${item.geoLong}`;
    window.open(mapUrl, "_blank");
  };

  const hasValidCoordinates =
    item && Number.isFinite(item.geoLat) && Number.isFinite(item.geoLong);

  const showFavoriteIcon = !isRecentPlay && !isInFavoritesList;

  const handleAddToFavorites = () => {
    addToFavorites(item);
    removeFromRecentPlays(item.urlResolved);
  };

  return (
    <Container>
      {isInFavoritesList && (
        <RemoveIcon title="Remove" size={24} onClick={onRemove} />
      )}

      {/* Favorite icon */}
      {!isInFavoritesList && (
        <Favorite onClick={toggleFavorite}>
          {isFavorite ? (
            <MdPlaylistAddCheck size={24} />
          ) : (
            <MdPlaylistAdd size={24} />
          )}
          {/* {isFavorite ? <IoIosStar size={18} /> : <IoIosStarOutline size={18} /> } */}
        </Favorite>
      )}

      {isRecentPlay && (
        <button onClick={handleAddToFavorites}>Add to Favorites</button>
      )}

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
          title={isCurrentRadioPlaying ? "Stop" : "Play"}
        >
          {renderAudioControl()}
        </AudioButton>
      </Audio>
    </Container>
  );
};

const Favorite = styled.button`
  position: absolute;
  top: 10px;
  right: 1px;
  cursor: pointer;
  background: none;
  color: inherit;
  border: none;
  /* padding: 2px;            */
  margin: 0;

  outline: inherit;

  @media (min-width: 1025px) {
    font-size: 0.8em;
    :hover {
      color: grey;
    }
  }
`;

const RemoveIcon = styled(IoIosCloseCircleOutline)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  @media (min-width: 1025px) {
    font-size: 0.8em;
    :hover {
      color: grey;
    }
  }
`;

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
    background: linear-gradient(to bottom, black, rgb(26, 26, 44));
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
