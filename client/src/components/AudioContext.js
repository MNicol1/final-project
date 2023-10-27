import { createContext, useState, useContext } from "react";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  // const [currentURL, setCurrentURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentlyPlayingURL, setCurrentlyPlayingURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentItem, setCurrentItem] = useState(null);

  const [isAudioFooterVisible, setIsAudioFooterVisible] = useState(false);

  const [sourceError, setSourceError] = useState(null);

  // const playAudio = (url) => {
  //   setCurrentlyPlayingURL(url);
  //   setIsPlaying(true);
  // };

  const playAudio = (url) => {
    setCurrentlyPlayingURL(url);
    setIsPlaying(true);
    setIsLoading(true); // Add this
    setIsAudioFooterVisible(true);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider
      value={{
        currentURL: currentlyPlayingURL,
        isPlaying,
        setIsPlaying,
        playAudio,
        pauseAudio,
        isLoading,
        setIsLoading,
        currentItem,
        setCurrentItem,
        isAudioFooterVisible,
        setIsAudioFooterVisible,
        sourceError,
        setSourceError,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
