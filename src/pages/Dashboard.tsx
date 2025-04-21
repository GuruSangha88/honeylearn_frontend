
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import TopicCard from '@/components/TopicCard';
import { Button } from '@/components/ui/button';
import { mockTopics, currentStudent } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        <Header student={currentStudent} />
        
        {/* Topics Grid */}
        <div className="mt-8">
          <h1 className="text-2xl font-semibold mb-6 gradient-text">My Topics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {mockTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
