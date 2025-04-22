
import { useNavigate } from 'react-router-dom';
import TopicCard from '@/components/TopicCard';
import { mockTopics, currentStudent } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Student Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome, {currentStudent.name}</h1>
          <p className="text-gray-400">Let's continue learning today!</p>
        </div>
        
        {/* Topics Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">My Topics</h2>
        </div>
        
        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {mockTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
