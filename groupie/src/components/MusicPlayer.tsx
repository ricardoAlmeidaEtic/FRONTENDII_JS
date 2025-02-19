"use client";
import React, { useState, useEffect, useRef } from "react";

interface MusicPlayerProps {
  trackName: string;
  artistName: string;
  onClose: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ trackName, artistName, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-play when component mounts
  useEffect(() => {
    const playMedia = async () => {
      if (audioRef.current && videoRef.current) {
        try {
          await audioRef.current.play();
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Autoplay failed:', error);
        }
      }
    };
    
    playMedia();
  }, []); // Empty dependency array means this runs once on mount

  const handlePlayPause = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      
      if (audioRef.current) {
        if (newState) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
  
      if (videoRef.current) {
        if (newState) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
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
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800/95 rounded-xl p-8 w-full max-w-2xl shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Artwork */}
        <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted={!isPlaying}
            playsInline
          >
            <source src="https://i.gifer.com/5RT9.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Track Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{trackName}</h2>
          <p className="text-gray-400">{artistName}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-1.5 mb-6">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => audioRef.current && (audioRef.current.currentTime = 0)}
            className="text-gray-400 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v16H4zm12 0h4v16h-4z" />
            </svg>
          </button>

          <button
            onClick={handlePlayPause}
            className="bg-green-500 text-white rounded-full p-4 hover:bg-green-400 transition"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3.868v16.264c0 .869.971 1.407 1.694.928l13.236-8.132a1.08 1.08 0 000-1.856L6.694 3.04C5.971 2.56 5 3 5 3.868z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => audioRef.current && (audioRef.current.currentTime = audioRef.current.duration)}
            className="text-gray-400 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v16H4zm6 0h4v16h-4zm6 0h4v16h-4z" />
            </svg>
          </button>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      </div>
    </div>
  );
};

export default MusicPlayer;