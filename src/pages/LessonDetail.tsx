
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import ChatBox from '@/components/ChatBox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockTopics, currentStudent } from '@/data/mockData';
import { LessonSection, ContentItem } from '@/types';

const LessonDetail = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState<LessonSection | null>(null);
  const [activeContent, setActiveContent] = useState<ContentItem[]>([]);
  const [topicTitle, setTopicTitle] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lesson, setLesson] = useState<any>(null);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [hasMovedToSecondPart, setHasMovedToSecondPart] = useState(false);
  const [isSecondPartActive, setIsSecondPartActive] = useState(false);
  const [secondPartPlaybackTime, setSecondPartPlaybackTime] = useState(0);
  
  // Store a stable reference to the active content
  const activeContentRef = useRef<ContentItem[]>([]);

  useEffect(() => {
    let foundLesson = null;
    let foundTopicTitle = '';
    let foundLessonTitle = '';
    for (const topic of mockTopics) {
      const found = topic.lessons.find(l => l.id === lessonId);
      if (found) {
        foundLesson = found;
        foundTopicTitle = topic.title;
        foundLessonTitle = found.title;
        break;
      }
    }
    setLesson(foundLesson);
    setTopicTitle(foundTopicTitle);
    setLessonTitle(foundLessonTitle);
  }, [lessonId]);

  useEffect(() => {
    if (lesson && lesson.sections.length > 0) {
      setCurrentSection(lesson.sections[currentSectionIndex]);
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
        activeContentRef.current = [initialImage];
        setCustomAudioUrl('https://hlearn.b-cdn.net/intro.mp3');
        setIsSecondPartActive(false);
        setSecondPartPlaybackTime(0);
        setHasMovedToSecondPart(false);
      } else {
        setActiveContent([]);
        activeContentRef.current = [];
      }
    }
  }, [lesson, currentSectionIndex, lessonId]);

  const todayGoal = currentStudent.dailyGoals[currentStudent.dailyGoals.length - 1];
  const dailyGoalPercentage = todayGoal ? Math.min(Math.round(todayGoal.completedMinutes / todayGoal.targetMinutes * 100), 100) : 0;

  const handleTimeUpdate = (currentTime: number) => {
    if (!isSecondPartActive && currentSection) {
      // Use functional update to ensure we have the latest state
      const contentToShow = currentSection.content?.filter(item => 
        item.timing <= currentTime && 
        !activeContentRef.current.some(ac => ac.id === item.id)
      );
      
      if (contentToShow && contentToShow.length > 0) {
        const updatedContent = [...activeContentRef.current, ...contentToShow];
        setActiveContent(updatedContent);
        activeContentRef.current = updatedContent;
      }
      
      if (lessonId === '4001' && currentSectionIndex === 0 && currentTime >= 41 && 
          !activeContentRef.current.some(item => item.id === 'high-five-gif')) {
        const highFiveContent = [{
          id: 'high-five-gif',
          type: 'image',
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/what%20is%20work/high%20five.gif',
            alt: 'High Five'
          },
          timing: 41
        }];
        setActiveContent(highFiveContent);
        activeContentRef.current = highFiveContent;
      }
    } else if (isSecondPartActive) {
      setSecondPartPlaybackTime(currentTime);
      let updatedContent = [...activeContentRef.current];
      let contentUpdated = false;
      
      if (currentTime < 6) {
        if (!activeContentRef.current.some(item => item.id === 'helping-gif')) {
          updatedContent = [{
            id: 'helping-gif',
            type: 'image',
            data: {
              type: 'image',
              url: 'https://hlearn.b-cdn.net/what%20is%20work/helping.gif',
              alt: 'People Helping Each Other'
            },
            timing: 0
          }];
          contentUpdated = true;
        }
      } else if (currentTime >= 6 && currentTime < 12) {
        if (!activeContentRef.current.some(item => item.id === 'fixing-gif')) {
          updatedContent = [{
            id: 'fixing-gif',
            type: 'image',
            data: {
              type: 'image',
              url: 'https://hlearn.b-cdn.net/what%20is%20work/fixing.gif',
              alt: 'People Fixing Things'
            },
            timing: 6
          }];
          contentUpdated = true;
        }
      } else if (currentTime >= 12) {
        if (!activeContentRef.current.some(item => item.id === 'reward-gif')) {
          updatedContent = [{
            id: 'reward-gif',
            type: 'image',
            data: {
              type: 'image',
              url: 'https://hlearn.b-cdn.net/what%20is%20work/reward.gif',
              alt: 'People Getting Rewards for Work'
            },
            timing: 12
          }];
          contentUpdated = true;
        }
      }
      
      if (contentUpdated) {
        setActiveContent(updatedContent);
        activeContentRef.current = updatedContent;
      }
    }
  };

  const handleSectionEnd = () => {
    if (lessonId === '4001' && currentSectionIndex === 0 && !hasMovedToSecondPart) {
      setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/whatsworkpart2.mp3');
      const helpingGifContent = [{
        id: 'helping-gif',
        type: 'image',
        data: {
          type: 'image',
          url: 'https://hlearn.b-cdn.net/what%20is%20work/helping.gif',
          alt: 'People Helping Each Other'
        },
        timing: 0
      }];
      setActiveContent(helpingGifContent);
      activeContentRef.current = helpingGifContent;
      setIsSecondPartActive(true);
      setSecondPartPlaybackTime(0);
      setHasMovedToSecondPart(true);
      if (lesson && currentSectionIndex < lesson.sections.length - 1) {
        setCurrentSectionIndex(prevIndex => prevIndex + 1);
      }
    } else if (lesson && currentSectionIndex < lesson.sections.length - 1) {
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
    } else {
      console.log('Lesson completed');
    }
  };

  const getAudioUrl = () => {
    if (customAudioUrl) {
      return customAudioUrl;
    }
    return currentSection?.audioUrl || '';
  };

  if (!lesson) {
    return <div className="min-h-screen bg-tutor-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Button onClick={() => navigate('/curriculum')}>Back to Curriculum</Button>
        </div>
      </div>;
  }

  return <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        <Header student={currentStudent} dailyGoalPercentage={dailyGoalPercentage} />
        <div className="mb-6">
          <h1 className="text-2xl font-semibold gradient-text">{lessonTitle}</h1>
          <p className="text-sm text-gray-400">From: {topicTitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex flex-col items-center justify-center h-[450px] w-full overflow-hidden">
            <AudioPlayer 
              audioUrl={getAudioUrl()} 
              onTimeUpdate={handleTimeUpdate} 
              onEnded={handleSectionEnd} 
              autoPlay={true} 
              key={getAudioUrl()} 
            />
          </div>
          <div className="h-[500px] w-full">
            <ScrollArea className="h-full w-full">
              <ChatBox 
                contentItems={activeContent} 
                initialMessage={`Listening to ${currentSection?.title}... Content will appear here as the lesson progresses.`} 
                hideInputField={true} 
                preventAutoScroll={true} 
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>;
};

export default LessonDetail;
