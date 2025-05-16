// src/components/Dashboard/AudioPlayer.jsx
import { useRef, useState } from 'react';

const AudioPlayer = ({ url }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <div className="bg-[#f9f9f9] rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-[#602fc9] text-white flex items-center justify-center"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#faa61b]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
          }
        }}
      />
    </div>
  );
};

export default AudioPlayer;