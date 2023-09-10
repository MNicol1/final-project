import { useState, useRef, useEffect } from "react";

import { useAudio } from "./AudioContext";
import "./AudioFooter.css";
import { FaVolumeUp, FaVolumeMute, FaSpinner } from "react-icons/fa";

import { RiPauseFill, RiPlayFill } from "react-icons/ri";

const AudioFooter = () => {
  const {
    currentURL,
    isPlaying,
    setIsLoading,
    isLoading,
    setIsPlaying,
    pauseAudio,
    playAudio,
    currentItem,
    setSourceError,
  } = useAudio();

  const audioRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isPlaying && currentURL) {
        audioRef.current.play().catch(error => {
            console.warn("Play was interrupted:", error);
        });
    } else {
        audioRef.current.pause();
    }
}, [isPlaying, currentURL]);


  

  const [volume, setVolume] = useState(0.5); // 0.5 as a default value for volume (50%)

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio(); // Use the method from AudioContext
    } else {
      // If you want to play the last played station when hitting play in footer
      if (currentURL) {
        playAudio(currentURL);
      }
    }
  };

  //   const handleVolumeChange = (e) => {
  //     const newVolume = e.target.value;
  //     audioRef.current.volume = newVolume;
  //     setVolume(newVolume);
  //   };

  const renderAudioControl = () => {
    if (isLoading) {
      return <FaSpinner className="spin-icon" />;
    } else if (isPlaying) {
      return <RiPauseFill />;
    } else {
      return <RiPlayFill />;
    }
  };

  const [displayedItem, setDisplayedItem] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setDisplayedItem(currentItem);
    }
  }, [isLoading, currentItem]);

  return (
    <div className="footer">
      <audio
        className="audio-player"
        ref={audioRef}
        src={currentURL}
        onPlay={() => setIsLoading(false)}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => {
          setIsLoading(false);
          setSourceError(null); // Reset the error state when the audio is ready to play.
        }}
        onWaiting={() => setIsLoading(true)}
        // onStalled={() => setIsLoading(true)}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
          // Update your context with an error state
          setSourceError(currentURL); // Or use some unique identifier if not the URL
        }}
      />

      <button className="playpause-button" onClick={togglePlay}>
        {renderAudioControl()}
      </button>

      {/* <div className="marquee-wrapper">
    <div className="marquee"  style={{ animationPlayState: isPlaying ? "running" : "paused", visibility: isLoading ? "hidden" : "visible" 
 }} key={currentItem?.id || JSON.stringify(currentItem)} >
        {currentItem && currentItem.name}
    </div>
</div> */}

      <div className="marquee-wrapper">
        <div
          className="marquee"
          key={displayedItem?.id || JSON.stringify(displayedItem)}
          style={{
            animationPlayState: isPlaying ? "running" : "paused",
            visibility: isLoading ? "hidden" : "visible",
          }}
        >
          {displayedItem
            ? `Playing: ${displayedItem.name} from ${displayedItem.country} `
            : ""}
        </div>
      </div>

      <button
        className="volume-button"
        style={{ visibility: isLoading ? "hidden" : "visible" }}
        onClick={toggleMute}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default AudioFooter;
