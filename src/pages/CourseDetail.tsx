
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { mockTopics, currentStudent } from '@/data/mockData';
import { Course } from '@/types';

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  // Find course in topics
  let course: Course | undefined;
  let topicTitle = '';
  
  for (const topic of mockTopics) {
    if (topic.courses) {
      const foundCourse = topic.courses.find((c) => c.id === courseId);
      if (foundCourse) {
        course = foundCourse;
        topicTitle = topic.title;
        break;
      }
    }
  }
  
  if (!course) {
    return (
      <div className="min-h-screen bg-tutor-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/curriculum')}>Back to Curriculum</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header with Student Info - removed dailyGoalPercentage */}
        <Header student={currentStudent} />
        
        {/* Back Navigation */}
        <div className="mt-8 mb-6">
          <Button
            variant="link"
            className="flex items-center gap-1 text-gray-300 hover:text-white pl-0"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} />
            Back to {topicTitle}
          </Button>
        </div>
        
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold gradient-text">{course.title}</h1>
          <p className="text-gray-400">{course.description}</p>
          <div className="mt-3 flex items-center gap-1 text-sm text-tutor-purple">
            <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
          </div>
        </div>
        
        {/* Lessons List */}
        <div className="glass-card p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Lessons</h2>
          <div className="space-y-4">
            {course.lessons.map((lesson) => (
              <div key={lesson.id} className="glass-card p-4 hover:border-tutor-purple/40 transition duration-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">{lesson.description}</p>
                    <div className="text-xs text-tutor-gray mt-1">
                      {Math.floor(lesson.duration / 60)} minutes • {lesson.sections.length} sections
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <Circle className="text-gray-500" size={20} />
                    )}
                    <Button 
                      onClick={() => navigate(`/lesson/${lesson.id}`)}
                      size="sm" 
                      className="gap-1 bg-tutor-purple hover:bg-tutor-dark-purple"
                    >
                      <Play size={14} />
                      {lesson.completed ? 'Replay' : 'Start'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
