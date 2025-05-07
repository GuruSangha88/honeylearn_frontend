import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Play, ArrowRight, CheckCircle, Star } from "lucide-react";
interface HeroSectionProps {
  onWatchVideo?: () => void;
}
const HeroSection = ({
  onWatchVideo
}: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.log("Video playback was prevented:", error);
        });
      }
      setIsPlaying(!isPlaying);
      if (onWatchVideo) onWatchVideo();
    }
  };
  const benefits = ["Real-world skills schools don't teach", "Personalized AI learning path", "Safe, ad-free environment"];
  return <section className="container mx-auto px-6 pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text leading-tight">
            What If Your Kid Learned the Skills That Actually Mattered?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl">
            Schools teach facts. HoneyLearn teaches how to think, lead, earn, and thrive — in the real world.
          </p>
          
          <ul className="space-y-2">
            {benefits.map((benefit, index) => <li key={index} className="flex items-center gap-2">
                <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </li>)}
          </ul>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black px-8 text-base font-bold">
                Try for free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              Join thousands of parents already helping their kids get ahead
            </p>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-[#FCE20B] text-[#FCE20B]" strokeWidth={1} />)}
              
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl overflow-hidden relative shadow-xl border border-purple-500/20">
            {!isPlaying ? <>
                <video ref={videoRef} className="w-full h-full object-cover" playsInline loop muted={true} controls={false}>
                  <source src="https://hlearn.b-cdn.net/HoneyLearnIntro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer" onClick={handlePlayVideo}>
                  <div className="bg-white/90 rounded-full p-4 shadow-lg hover:bg-white transition-all">
                    <Play className="h-10 w-10 text-[#FCE20B] stroke-[1.5px] fill-purple-600" />
                  </div>
                </div>
              </> : <video ref={videoRef} className="w-full h-full object-cover" playsInline loop controls={true} autoPlay>
                <source src="https://hlearn.b-cdn.net/HoneyLearnIntro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>}
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;