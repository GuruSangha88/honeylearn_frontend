
import { Star, Trophy, Rocket, Heart, Lock } from 'lucide-react';
import { Topic } from '@/types';
import { useNavigate } from 'react-router-dom';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const navigate = useNavigate();
  
  const isLocked = topic.title.toLowerCase() !== 'money explorers';
  
  // Function to get a fun icon based on the topic title
  const getTopicIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'money explorers':
        return <Star className="text-[#FEC6A1]" size={32} />;
      case 'life learning':
        return <Trophy className="text-[#D3E4FD]" size={32} />;
      case 'leadership':
        return <Heart className="text-[#FFDEE2]" size={32} />;
      case 'communication':
        return <Rocket className="text-[#E5DEFF]" size={32} />;
      default:
        return <Star className="text-[#FEC6A1]" size={32} />;
    }
  };

  return (
    <div 
      className={`glass-card p-5 ${!isLocked ? 'cursor-pointer hover:border-tutor-purple/40' : 'opacity-40 grayscale cursor-not-allowed'} transition duration-200`}
      onClick={() => !isLocked && navigate(`/topic/${topic.id}`)}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className={`font-semibold text-xl mb-1 ${isLocked ? 'text-gray-500' : ''}`}>{topic.title}</h2>
            {isLocked && <Lock size={24} className="text-gray-400" />}
          </div>
          <p className={`text-sm ${isLocked ? 'text-gray-500' : 'text-gray-400'}`}>{topic.description}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {getTopicIcon(topic.title)}
        </div>
      </div>
      
      <div className="mt-4 h-1.5 rounded-full bg-gray-700 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-tutor-purple to-tutor-blue rounded-full ${isLocked ? 'opacity-30' : ''}`} 
          style={{ width: `${(topic.completedLessons / topic.totalLessons) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TopicCard;
