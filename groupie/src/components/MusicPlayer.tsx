"use client";
import React, { useState, useEffect } from "react";

interface MusicPlayerProps {
  trackName: string;
  artistName: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ trackName, artistName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    console.log("Next track");
  };

  const handlePrev = () => {
    console.log("Previous track");
  };

  // Simulate progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <video
          className="w-full h-48 object-cover"
          loop
          autoPlay
          muted
          playsInline
          width="100%"
        >
          <source src="https://i.gifer.com/5RT9.mp4" type="video/mp4" />
        </video>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold">{trackName}</h2>
        <p className="text-sm text-gray-500">{artistName}</p>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <button className="btn btn-ghost" onClick={handlePrev}>
            ⏮️
          </button>

          <button className="btn btn-primary" onClick={handlePlayPause}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <button className="btn btn-ghost" onClick={handleNext}>
            ⏭️
          </button>
        </div>

        <progress
          className="progress progress-primary w-full mt-4"
          value={progress}
          max={100}
        ></progress>
      </div>
    </div>
  );
};

export default MusicPlayer;
