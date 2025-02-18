"use client";
import React, { useState, useEffect, useRef } from "react";

interface MusicPlayerProps {
  trackName: string;
  artistName: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ trackName, artistName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      
      if (videoRef.current) {
        if (newState) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
      
      if (audioRef.current) {
        if (newState) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
      
      return newState;
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const handlePrev = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  };
  
  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = audioRef.current.duration;
      setProgress(100);
    }
  };
  
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <video
          ref={videoRef}
          className="w-full h-48 object-cover"
          loop
          muted
          playsInline
          width="100%"
        >
          <source src="https://i.gifer.com/5RT9.mp4" type="video/mp4" />
        </video>
      </figure>

      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      <div className="p-4 text-center">
        <h2 className="text-lg font-bold">{trackName}</h2>
        <p className="text-sm text-gray-500">{artistName}</p>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <button className="btn btn-ghost" onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7M19 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button className="btn btn-primary" onClick={handlePlayPause}>
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 9v6m4-6v6" 
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 3.868v16.264c0 .869.971 1.407 1.694.928l13.236-8.132a1.08 1.08 0 000-1.856L6.694 3.04C5.971 2.56 5 3 5 3.868z" />
            </svg>
          )}
        </button>

        <button className="btn btn-ghost" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M13 5l7 7-7 7M5 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div>

      <progress className="progress progress-primary w-full mt-4" value={progress} max={100}></progress>
    </div>
  );
};

export default MusicPlayer;
