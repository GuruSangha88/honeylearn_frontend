import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { mockTopics, currentStudent } from '@/data/mockData';
const TopicDetail = () => {
  const navigate = useNavigate();
  const {
    topicId
  } = useParams();
  const topic = mockTopics.find(t => t.id === topicId);
  if (!topic) {
    return <div className="min-h-screen bg-tutor-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <Button onClick={() => navigate('/curriculum')}>Back to Curriculum</Button>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header with Student Info */}
        <Header student={currentStudent} />
        
        {/* Back Navigation */}
        <div className="mt-8 mb-6">
          
        </div>
        
        {/* Topic Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold gradient-text">{topic.title}</h1>
          <p className="text-gray-400">{topic.description}</p>
        </div>
        
        {/* Lessons List */}
        <div className="glass-card p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Lessons</h2>
          <div className="space-y-4">
            {topic.lessons.map(lesson => <div key={lesson.id} className="glass-card p-4 hover:border-tutor-purple/40 transition duration-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">{lesson.description}</p>
                    <div className="text-xs text-tutor-gray mt-1">
                      {Math.floor(lesson.duration / 60)} minutes
                    </div>
                  </div>
                  <Button onClick={() => navigate(`/lesson/${lesson.id}`)} size="sm" className="bg-tutor-purple hover:bg-tutor-dark-purple">
                    Start
                  </Button>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default TopicDetail;