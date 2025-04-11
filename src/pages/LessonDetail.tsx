import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import ChatBox from '@/components/ChatBox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockTopics, currentStudent } from '@/data/mockData';
import { LessonSection, ContentItem, ContentType } from '@/types';

const LessonDetail = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState<LessonSection | null>(null);
  const [activeContent, setActiveContent] = useState<ContentItem[]>([]);
  const activeContentRef = useRef<ContentItem[]>([]);
  const [topicTitle, setTopicTitle] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lesson, setLesson] = useState<any>(null);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [hasMovedToSecondPart, setHasMovedToSecondPart] = useState(false);
  const [isSecondPartActive, setIsSecondPartActive] = useState(false);
  const [secondPartPlaybackTime, setSecondPartPlaybackTime] = useState(0);
  const [audioKey, setAudioKey] = useState<string>('initial');
  
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
    
    setCurrentSectionIndex(0);
    setActiveContent([]);
    activeContentRef.current = [];
    setHasMovedToSecondPart(false);
    setIsSecondPartActive(false);
    setSecondPartPlaybackTime(0);
    setCustomAudioUrl(null);
    
    setAudioKey(`lesson-${lessonId}-${Date.now()}`);
  }, [lessonId]);

  useEffect(() => {
    if (!lesson || lesson.sections.length === 0) return;
    
    const newSection = lesson.sections[currentSectionIndex];
    setCurrentSection(newSection);
    
    if (lessonId === '4001' && currentSectionIndex === 0) {
      const initialImage: ContentItem = {
        id: 'intro-image',
        type: 'image' as ContentType,
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
      
      setAudioKey(`lesson-${lessonId}-section-${currentSectionIndex}-${Date.now()}`);
    } else {
      setActiveContent([]);
      activeContentRef.current = [];
      
      if (customAudioUrl) {
        setAudioKey(`lesson-${lessonId}-section-${currentSectionIndex}-custom-${Date.now()}`);
      } else {
        setAudioKey(`lesson-${lessonId}-section-${currentSectionIndex}-${Date.now()}`);
      }
    }
  }, [lesson, currentSectionIndex, lessonId]);

  const todayGoal = currentStudent.dailyGoals[currentStudent.dailyGoals.length - 1];
  const dailyGoalPercentage = todayGoal ? Math.min(Math.round(todayGoal.completedMinutes / todayGoal.targetMinutes * 100), 100) : 0;

  const handleTimeUpdate = useCallback((currentTime: number) => {
    if (!isSecondPartActive && currentSection) {
      const hasInitialImage = activeContentRef.current.some(item => item.id === 'intro-image');
      
      const contentToShow = currentSection.content?.filter(item => 
        item.timing <= currentTime && 
        !activeContentRef.current.some(ac => ac.id === item.id)
      ) || [];
      
      if (contentToShow.length > 0) {
        const updatedContent = [...activeContentRef.current, ...contentToShow];
        setActiveContent(updatedContent);
        activeContentRef.current = updatedContent;
      }
      
      if (lessonId === '4001' && currentSectionIndex === 0 && currentTime >= 41 && 
          !activeContentRef.current.some(item => item.id === 'high-five-gif')) {
        const highFiveContent: ContentItem = {
          id: 'high-five-gif',
          type: 'image' as ContentType,
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/what%20is%20work/high%20five.gif',
            alt: 'High Five'
          },
          timing: 41
        };
        setActiveContent([highFiveContent]);
        activeContentRef.current = [highFiveContent];
      }
      else if (contentToShow.length === 0 && hasInitialImage && activeContentRef.current.length === 0) {
        const initialImage: ContentItem = {
          id: 'intro-image',
          type: 'image' as ContentType,
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/what%20is%20work/whatswork.png',
            alt: 'What Is Work?'
          },
          timing: 0
        };
        setActiveContent([initialImage]);
        activeContentRef.current = [initialImage];
      }
    } 
    else if (isSecondPartActive) {
      setSecondPartPlaybackTime(currentTime);
      let updatedContent: ContentItem[] = [...activeContentRef.current];
      let contentUpdated = false;
      
      if (currentTime < 6) {
        if (!activeContentRef.current.some(item => item.id === 'helping-gif')) {
          updatedContent = [{
            id: 'helping-gif',
            type: 'image' as ContentType,
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
            type: 'image' as ContentType,
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
            type: 'image' as ContentType,
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
  }, [currentSection, isSecondPartActive, lessonId, currentSectionIndex]);

  const handleSectionEnd = useCallback(() => {
    if (lessonId === '4001' && currentSectionIndex === 0 && !hasMovedToSecondPart) {
      const newAudioUrl = 'https://hlearn.b-cdn.net/what%20is%20work/whatsworkpart2.mp3';
      setCustomAudioUrl(newAudioUrl);
      
      const helpingGifContent: ContentItem = {
        id: 'helping-gif',
        type: 'image' as ContentType,
        data: {
          type: 'image',
          url: 'https://hlearn.b-cdn.net/what%20is%20work/helping.gif',
          alt: 'People Helping Each Other'
        },
        timing: 0
      };
      
      setActiveContent([helpingGifContent]);
      setIsSecondPartActive(true);
      setSecondPartPlaybackTime(0);
      setHasMovedToSecondPart(true);
      setAudioKey(`lesson-${lessonId}-part2-${Date.now()}`);
      
      if (lesson && currentSectionIndex < lesson.sections.length - 1) {
        setCurrentSectionIndex(prevIndex => prevIndex + 1);
      }
    } else if (lesson && currentSectionIndex < lesson.sections.length - 1) {
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
      setAudioKey(`lesson-${lessonId}-section-${currentSectionIndex + 1}-${Date.now()}`);
    } else {
      console.log('Lesson completed');
    }
  }, [lesson, currentSectionIndex, lessonId, hasMovedToSecondPart]);

  const getAudioUrl = useCallback(() => {
    if (customAudioUrl) {
      return customAudioUrl;
    }
    return currentSection?.audioUrl || '';
  }, [customAudioUrl, currentSection]);

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
              key={audioKey} 
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
    </div>
  );
};

export default LessonDetail;
