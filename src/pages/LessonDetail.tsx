
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import ChatBox from '@/components/ChatBox';
import { mockTopics, currentStudent } from '@/data/mockData';
import { LessonSection, ContentItem } from '@/types';

const LessonDetail = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState<LessonSection | null>(null);
  const [activeContent, setActiveContent] = useState<ContentItem[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  
  // Find lesson in topics
  let lesson;
  
  for (const topic of mockTopics) {
    for (const course of topic.courses) {
      const foundLesson = course.lessons.find((l) => l.id === lessonId);
      if (foundLesson) {
        lesson = foundLesson;
        setCourseTitle(course.title);
        setLessonTitle(foundLesson.title);
        break;
      }
    }
    if (lesson) break;
  }
  
  useEffect(() => {
    if (lesson && lesson.sections.length > 0) {
      setCurrentSection(lesson.sections[currentSectionIndex]);
    }
  }, [lesson, currentSectionIndex]);
  
  // Calculate daily goal percentage
  const todayGoal = currentStudent.dailyGoals[currentStudent.dailyGoals.length - 1];
  const dailyGoalPercentage = todayGoal 
    ? Math.min(Math.round((todayGoal.completedMinutes / todayGoal.targetMinutes) * 100), 100)
    : 0;
  
  const handleTimeUpdate = (currentTime: number) => {
    if (currentSection) {
      // Filter content items that should be shown at this time
      const contentToShow = currentSection.content?.filter(
        item => item.timing <= currentTime && 
               (!activeContent.some(ac => ac.id === item.id))
      );
      
      if (contentToShow && contentToShow.length > 0) {
        setActiveContent(prev => [...prev, ...contentToShow]);
      }
    }
  };
  
  const handleSectionEnd = () => {
    if (lesson && currentSectionIndex < lesson.sections.length - 1) {
      // Move to next section
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
      setActiveContent([]);
    } else {
      // End of lesson
      console.log('Lesson completed');
    }
  };
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-tutor-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Button onClick={() => navigate('/curriculum')}>Back to Curriculum</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-tutor-dark text-white">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        {/* Header with Student Info */}
        <Header student={currentStudent} dailyGoalPercentage={dailyGoalPercentage} />
        
        {/* Back Navigation */}
        <div className="mt-8 mb-6">
          <Button
            variant="link"
            className="flex items-center gap-1 text-gray-300 hover:text-white pl-0"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} />
            Back to {courseTitle}
          </Button>
        </div>
        
        {/* Lesson Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold gradient-text">{lessonTitle}</h1>
          {currentSection && (
            <p className="text-tutor-purple text-sm mt-1">
              Section {currentSectionIndex + 1}/{lesson.sections.length}: {currentSection.title}
            </p>
          )}
        </div>
        
        {/* Lesson Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Audio Player */}
          <div className="glass-card p-6 flex flex-col items-center justify-center">
            {currentSection?.audioUrl ? (
              <AudioPlayer 
                audioUrl={currentSection.audioUrl} 
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleSectionEnd}
                autoPlay={true}
              />
            ) : (
              <div className="text-center text-gray-400">
                <p>No audio available for this section</p>
              </div>
            )}
            
            {/* Section Navigation */}
            <div className="w-full mt-8 flex justify-between">
              <Button 
                variant="outline" 
                disabled={currentSectionIndex === 0}
                onClick={() => {
                  if (currentSectionIndex > 0) {
                    setCurrentSectionIndex(prevIndex => prevIndex - 1);
                    setActiveContent([]);
                  }
                }}
              >
                Previous Section
              </Button>
              <Button 
                disabled={currentSectionIndex === lesson.sections.length - 1}
                className="bg-tutor-purple hover:bg-tutor-dark-purple"
                onClick={() => {
                  if (currentSectionIndex < lesson.sections.length - 1) {
                    setCurrentSectionIndex(prevIndex => prevIndex + 1);
                    setActiveContent([]);
                  }
                }}
              >
                Next Section
              </Button>
            </div>
          </div>
          
          {/* Right Column - Chat Interface */}
          <div className="h-[500px]">
            <ChatBox 
              contentItems={activeContent}
              initialMessage={`Listening to ${currentSection?.title}... Content will appear here as the lesson progresses.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
