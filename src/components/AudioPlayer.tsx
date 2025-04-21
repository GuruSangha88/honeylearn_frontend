
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

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
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reset state when audio URL changes
  useEffect(() => {
    if (audioUrl) {
      console.log(`Loading new audio: ${audioUrl}`);
      setAudioError(null);
      setIsPlaying(false);
      setIsPulsing(false);
      setCurrentTime(0);
      setIsLoading(true);
    }
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleCanPlay = () => {
        console.log("Audio can play now:", audioUrl);
        setIsLoading(false);
        if (autoPlay) {
          playAudio();
        }
      };
      
      const handleError = (e: Event) => {
        const error = e as ErrorEvent;
        const errorMessage = `Audio error: ${error.message || 'Failed to load audio'}`;
        console.error(errorMessage, e);
        console.error("Failed to load audio URL:", audioUrl);
        setAudioError(errorMessage);
        setIsLoading(false);
        toast.error("Audio failed to load. Please try again.");
      };
      
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      
      return () => {
        if (audio) {
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('ended', handleEnded);
          audio.removeEventListener('canplay', handleCanPlay);
          audio.removeEventListener('error', handleError);
        }
      };
    }
  }, [audioRef, audioUrl, autoPlay, onEnded, onTimeUpdate]);

  // Function to safely play audio
  const playAudio = () => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            console.log("Audio playing successfully");
            setIsPlaying(true);
            setIsPulsing(true);
          })
          .catch(error => {
            console.error('Playback prevented:', error);
            // Handle autoplay policy restrictions
            if (error.name === "NotAllowedError") {
              toast.error("Autoplay was prevented. Please click to play.");
            } else {
              setAudioError(`Failed to play: ${error.message}`);
              toast.error("Could not play audio. Please try again.");
            }
          });
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      console.log(`Audio loaded, duration: ${audioRef.current.duration}s`);
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
    console.log("Audio playback ended");
    onEnded?.();
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPulsing(false);
        setIsPlaying(false);
      } else {
        playAudio();
      }
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

  // Check if URL is valid
  const finalAudioUrl = audioUrl ? audioUrl.trim() : '';
  const isUrlValid = finalAudioUrl && finalAudioUrl !== '';
  
  return (
    <div className="w-full flex flex-col items-center">
      {isUrlValid && (
        <audio 
          ref={audioRef} 
          src={finalAudioUrl} 
          preload="metadata" 
        />
      )}
      
      {audioError && (
        <div className="text-red-500 text-sm mb-2 px-4 py-2 bg-red-100 rounded-md">
          <p>{audioError}</p>
          <p className="text-xs mt-1">URL: {finalAudioUrl || 'No URL provided'}</p>
        </div>
      )}
      
      {isLoading && !audioError && (
        <p className="text-blue-500 text-sm mb-2">Loading audio...</p>
      )}
      
      <div className="relative mb-8">
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-tutor-blue to-tutor-purple opacity-30 blur-md transform scale-125 ${isPulsing ? 'animate-pulse-glow' : ''}`}></div>
        
        <div 
          className="relative flex items-center justify-center w-56 h-56 rounded-full bg-gradient-to-br from-tutor-blue to-tutor-purple p-1.5 cursor-pointer" 
          onClick={togglePlay}
        >
          <div className="w-full h-full rounded-full bg-tutor-dark-gray flex items-center justify-center">
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className={`h-10 w-2.5 rounded-full bg-tutor-blue ${isPulsing ? 'animate-[audio-wave1_1.2s_ease-in-out_infinite]' : ''}`}></div>
              <div className={`h-14 w-2.5 rounded-full bg-tutor-blue ${isPulsing ? 'animate-[audio-wave2_1s_ease-in-out_infinite]' : ''}`}></div>
              <div className={`h-20 w-2.5 rounded-full bg-tutor-blue ${isPulsing ? 'animate-[audio-wave3_1.4s_ease-in-out_infinite]' : ''}`}></div>
              <div className={`h-16 w-2.5 rounded-full bg-tutor-blue ${isPulsing ? 'animate-[audio-wave4_0.9s_ease-in-out_infinite]' : ''}`}></div>
              <div className={`h-8 w-2.5 rounded-full bg-tutor-purple ${isPulsing ? 'animate-[audio-wave5_1.1s_ease-in-out_infinite]' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full hidden">
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 1}
          step={0.01}
          onValueChange={handleSeek}
        />
      </div>

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
      
      {finalAudioUrl && (
        <p className="text-xs text-gray-400 mt-2 text-center">
          {isPlaying ? 'Playing' : 'Paused'}: {finalAudioUrl.split('/').pop()}
        </p>
      )}
    </div>
  );
};

export default AudioPlayer;
