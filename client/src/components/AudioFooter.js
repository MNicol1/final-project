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
  const [volume, setVolume] = useState(0.5); // 0.5 as a default value for volume (50%)

  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (isPlaying && currentURL) {
      audioRef.current.play().catch((error) => {
        console.warn("Play was interrupted:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentURL]);

  useEffect(() => {
    // Assuming the initial volume is stored in the state `volume`
    // Adjust this logic if the volume is stored or retrieved differently
    const initialFillPercentage = `${volume * 100}%`;
    if (sliderRef.current) {
      sliderRef.current.style.setProperty(
        "--fill-percentage",
        initialFillPercentage
      );
    }
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        updateVolume(e);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const updateVolume = (e) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    let newVolume = (rect.height - y) / rect.height;
    newVolume = Math.max(0, Math.min(newVolume, 1)); // Clamp between 0 and 1

    setVolume(newVolume);
    audioRef.current.volume = newVolume;

    const fillPercentage = `${newVolume * 100}%`;
    sliderRef.current.style.setProperty("--fill-percentage", fillPercentage);
  };

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

  const handleSliderClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const y = e.clientY - rect.top; // y position within the element.
    const volumeLevel = 1 - y / rect.height;
    audioRef.current.volume = volumeLevel;
    setVolume(volumeLevel);
  };

  // Existing component code...

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

      <div className="volume-container">
        <button
          className="volume-button"
          style={{ visibility: isLoading ? "hidden" : "visible" }}
          onClick={toggleMute}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <div className="slider-container">
          <div
            className="volume-slider"
            ref={sliderRef}
            onClick={handleSliderClick}
          >
            <div
              className="volume-thumb"
              onMouseDown={handleMouseDown}
              style={{ bottom: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioFooter;
