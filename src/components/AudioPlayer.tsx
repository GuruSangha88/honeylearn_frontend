
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  audioUrl: string;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  autoPlay?: boolean;
}

const AudioPlayer = ({ audioUrl, onTimeUpdate, onEnded, autoPlay = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isPulsing, setIsPulsing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (autoPlay) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(_ => {
              setIsPlaying(true);
              setIsPulsing(true);
            })
            .catch(error => {
              console.log('Autoplay prevented:', error);
            });
        }
      }
      
      const audio = audioRef.current;
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        if (audio) {
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [audioRef, audioUrl, autoPlay, onEnded, onTimeUpdate]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsPulsing(false);
    onEnded?.();
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPulsing(false);
      } else {
        audioRef.current.play();
        setIsPulsing(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (value: number[]) => {
    const seekTime = value[0];
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* New Audio Circle Design */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-tutor-blue to-tutor-purple opacity-30 blur-md transform scale-125 ${isPulsing ? 'animate-pulse-glow' : ''}`}></div>
        
        {/* Outer circle with gradient */}
        <div className="relative flex items-center justify-center w-56 h-56 rounded-full bg-gradient-to-br from-tutor-blue to-tutor-purple p-1.5">
          
          {/* Inner dark circle */}
          <div className="w-full h-full rounded-full bg-tutor-dark-gray flex items-center justify-center cursor-pointer" onClick={togglePlay}>
            
            {/* Audio wave visualization */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className={`h-10 w-2.5 rounded-full bg-tutor-blue ${isPulsing ? 'animate-[audio-wave1_1.2s_ease-in-out_infinite]' : ''}`}></div>
              <div className={`h-14 w-2.5 rounded-full bg-tutor-blue ${isPulsing ? 'animate-[audio-wave2_1s_ease-in-out_infinite]' : ''}`}></div>
              <div className={`h-20 w-2.5 rounded-full bg-tutor-blue ${isPulsing ? 'animate-[audio-wave3_1.4s_ease-in-out_infinite]' : ''}`}></div>
              <div className={`h-16 w-2.5 rounded-full bg-tutor-blue ${isPulsing ? 'animate-[audio-wave4_0.9s_ease-in-out_infinite]' : ''}`}></div>
              <div className={`h-8 w-2.5 rounded-full bg-tutor-purple ${isPulsing ? 'animate-[audio-wave5_1.1s_ease-in-out_infinite]' : ''}`}></div>
            </div>

            {/* Play/Pause overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-opacity duration-200">
              {!isPulsing && (
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-tutor-purple bg-opacity-80">
                  <Play size={32} fill="white" className="ml-1.5" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Progress Bar (for seeking functionality) */}
      <div className="w-full hidden">
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 1}
          step={0.01}
          onValueChange={handleSeek}
        />
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 mt-2 self-end">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
