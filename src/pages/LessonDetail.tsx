
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
  const [lesson, setLesson] = useState<any>(null);
  
  // Find lesson in topics
  useEffect(() => {
    let foundLesson = null;
    let foundCourseTitle = '';
    let foundLessonTitle = '';
    
    for (const topic of mockTopics) {
      for (const course of topic.courses) {
        const found = course.lessons.find((l) => l.id === lessonId);
        if (found) {
          foundLesson = found;
          foundCourseTitle = course.title;
          foundLessonTitle = found.title;
          break;
        }
      }
      if (foundLesson) break;
    }
    
    setLesson(foundLesson);
    setCourseTitle(foundCourseTitle);
    setLessonTitle(foundLessonTitle);
  }, [lessonId]);
  
  useEffect(() => {
    if (lesson && lesson.sections.length > 0) {
      setCurrentSection(lesson.sections[currentSectionIndex]);
      
      // For the "What is Work?" lesson, add the image as initial content
      if (lessonId === '4001' && currentSectionIndex === 0) {
        const initialImage: ContentItem = {
          id: 'intro-image',
          type: 'image',
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/what%20is%20work/whatswork.png',
            alt: 'What Is Work?'
          },
          timing: 0
        };
        setActiveContent([initialImage]);
      } else {
        // Reset active content when section changes
        setActiveContent([]);
      }
    }
  }, [lesson, currentSectionIndex, lessonId]);
  
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
    } else {
      // End of lesson
      console.log('Lesson completed');
    }
  };
  
  // Override audio URL for What is Work lesson
  const getAudioUrl = () => {
    if (lessonId === '4001' && currentSectionIndex === 0) {
      return 'https://hlearn.b-cdn.net/intro.mp3';
    }
    return currentSection?.audioUrl || '';
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
    <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
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
        </div>
        
        {/* Lesson Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Audio Player */}
          <div className="glass-card p-6 flex flex-col items-center justify-center">
            <AudioPlayer 
              audioUrl={getAudioUrl()} 
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleSectionEnd}
              autoPlay={true}
            />
          </div>
          
          {/* Right Column - Chat Interface */}
          <div className="h-[500px]">
            <ChatBox 
              contentItems={activeContent}
              initialMessage={`Listening to ${currentSection?.title}... Content will appear here as the lesson progresses.`}
              hideInputField={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
