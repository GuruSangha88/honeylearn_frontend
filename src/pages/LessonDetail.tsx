
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  
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
        setCustomAudioUrl('https://hlearn.b-cdn.net/intro.mp3');
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
    // Special handling for What is Work lesson
    if (lessonId === '4001' && currentSectionIndex === 0) {
      // Update to the second part audio
      setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/whatsworkpart2.mp3');
      
      // Replace the image with gif
      setActiveContent([{
        id: 'helping-gif',
        type: 'image',
        data: {
          type: 'image',
          url: 'https://hlearn.b-cdn.net/what%20is%20work/helping.gif',
          alt: 'People Helping Each Other'
        },
        timing: 0
      }]);
      
      // Move to next section
      if (lesson && currentSectionIndex < lesson.sections.length - 1) {
        setCurrentSectionIndex(prevIndex => prevIndex + 1);
      }
    } else if (lesson && currentSectionIndex < lesson.sections.length - 1) {
      // Default behavior - move to next section
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
    } else {
      // End of lesson
      console.log('Lesson completed');
    }
  };
  
  // Get the audio URL to use
  const getAudioUrl = () => {
    if (customAudioUrl) {
      return customAudioUrl;
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
              key={getAudioUrl()} // Add key to ensure player resets when URL changes
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
