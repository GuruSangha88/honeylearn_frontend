import { useState, useEffect, useRef } from 'react';
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
  const [topicTitle, setTopicTitle] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lesson, setLesson] = useState<any>(null);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [isSecondPartPlayed, setIsSecondPartPlayed] = useState(false);
  const [secondPartFinished, setSecondPartFinished] = useState(false);
  const [isThirdPartPlayed, setIsThirdPartPlayed] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [quizDisplayed, setQuizDisplayed] = useState(false);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  const gifTimerRef = useRef<NodeJS.Timeout | null>(null);
  const secondGifTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    let foundLesson = null;
    let foundTopicTitle = '';
    let foundLessonTitle = '';
    
    for (const topic of mockTopics) {
      const found = topic.lessons.find((l) => l.id === lessonId);
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
    
    setIsSecondPartPlayed(false);
    setSecondPartFinished(false);
    setIsThirdPartPlayed(false);
    setVideoCompleted(false);
    setQuizDisplayed(false);
    setIsQuizAnswered(false);
    setIsAnswerCorrect(false);
    setLessonCompleted(false);
    setProgressPercentage(25);
  }, [lessonId]);
  
  useEffect(() => {
    if (lesson && lesson.sections.length > 0) {
      setCurrentSection(lesson.sections[currentSectionIndex]);
      
      if (lessonId === '4002' && currentSectionIndex === 0) {
        const initialImage: ContentItem = {
          id: 'money-intro-image',
          type: 'image',
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/what%20is%20money/money.gif',
            alt: 'What Is Money?'
          },
          timing: 0
        };
        setActiveContent([initialImage]);
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20money/whatismoney1.mp3');
        setIsSecondPartPlayed(false);
        setSecondPartFinished(false);
        setIsThirdPartPlayed(false);
        setVideoCompleted(false);
        setQuizDisplayed(false);
      } else if (lessonId === '4001' && currentSectionIndex === 0) {
        const initialImage: ContentItem = {
          id: 'helping-gif',
          type: 'image',
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/what%20is%20work/helping.gif',
            alt: 'People Helping Each Other'
          },
          timing: 0
        };
        setActiveContent([initialImage]);
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/whatisworkaudio5.mp3');
        setIsSecondPartPlayed(false);
        setSecondPartFinished(false);
        setIsThirdPartPlayed(false);
        setVideoCompleted(false);
        setQuizDisplayed(false);
      } else {
        setActiveContent([]);
      }
    }
  }, [lesson, currentSectionIndex, lessonId]);
  
  useEffect(() => {
    if (isSecondPartPlayed && !secondPartFinished) {
      setProgressPercentage(50);
    } else if (secondPartFinished && isThirdPartPlayed && videoCompleted && !quizDisplayed) {
      setProgressPercentage(75);
    } else if (lessonCompleted) {
      setProgressPercentage(100);
    }
  }, [isSecondPartPlayed, secondPartFinished, isThirdPartPlayed, videoCompleted, quizDisplayed, lessonCompleted]);
  
  const todayGoal = currentStudent.dailyGoals[currentStudent.dailyGoals.length - 1];
  const dailyGoalPercentage = lessonCompleted ? 100 : (
    todayGoal 
      ? Math.min(Math.round((todayGoal.completedMinutes / todayGoal.targetMinutes) * 100), 100)
      : progressPercentage
  );
  
  const handleTimeUpdate = (currentTime: number) => {
    if (currentSection) {
      const contentToShow = currentSection.content?.filter(
        item => item.timing <= currentTime && 
               (!activeContent.some(ac => ac.id === item.id))
      );
      
      if (contentToShow && contentToShow.length > 0) {
        setActiveContent(prev => [...prev, ...contentToShow]);
      }
    }
  };
  
  useEffect(() => {
    return () => {
      if (gifTimerRef.current) {
        clearTimeout(gifTimerRef.current);
      }
      if (secondGifTimerRef.current) {
        clearTimeout(secondGifTimerRef.current);
      }
    };
  }, []);
  
  const handleVideoComplete = () => {
    setVideoCompleted(true);
    console.log("Video has been completely watched!");
    
    if (lessonId === '4001') {
      setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/whatisworkaudio5.mp3');
      
      setTimeout(() => {
        setQuizDisplayed(true);
        setActiveContent(prev => [...prev, {
          id: 'work-quiz',
          type: 'quiz',
          data: {
            question: "What is work?",
            options: [
              { text: "Work is helping people in some way", color: "blue" },
              { text: "Work is typing on a computer", color: "pink" }
            ],
            correctOptionIndex: 0
          },
          timing: 0
        }]);
      }, 1000);
    } else if (lessonId === '4002') {
      setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20money/quiz_intro.mp3');
      
      setTimeout(() => {
        setQuizDisplayed(true);
        setActiveContent(prev => [...prev, {
          id: 'money-quiz',
          type: 'quiz',
          data: {
            question: "Why do we need money?",
            options: [
              { text: "To buy things we need and want", color: "blue" },
              { text: "Only to make paper airplanes", color: "pink" }
            ],
            correctOptionIndex: 0
          },
          timing: 0
        }]);
      }, 1000);
    }
  };
  
  const handleQuizAnswered = (isCorrect: boolean) => {
    setIsQuizAnswered(true);
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      if (lessonId === '4001') {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/welldone.mp3');
      } else if (lessonId === '4002') {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/welldone.mp3');
      }
      
      setTimeout(() => {
        if (lessonId === '4001') {
          setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/congrats.mp3');
        } else if (lessonId === '4002') {
          setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/congrats.mp3');
        }
        setLessonCompleted(true);
      }, 3000);
    } else {
      if (lessonId === '4001') {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/tryagain.mp3');
      } else if (lessonId === '4002') {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/tryagain.mp3');
      }
      
      setTimeout(() => {
        setIsQuizAnswered(false);
        
        setActiveContent(prev => prev.map(item => 
          item.id === 'work-quiz' || item.id === 'money-quiz' 
            ? {
                ...item, 
                data: {
                  ...item.data,
                  userAnswer: undefined
                }
              } 
            : item
        ));
      }, 3000);
    }
  };
  
  const handleSectionEnd = () => {
    if (lessonId === '4001' && currentSectionIndex === 0) {
      if (!isSecondPartPlayed) {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/whatsworkpart2.mp3');
        setIsSecondPartPlayed(true);
        
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
        
        if (gifTimerRef.current) {
          clearTimeout(gifTimerRef.current);
        }
        if (secondGifTimerRef.current) {
          clearTimeout(secondGifTimerRef.current);
        }
        
        gifTimerRef.current = setTimeout(() => {
          setActiveContent([{
            id: 'fixing-gif',
            type: 'image',
            data: {
              type: 'image',
              url: 'https://hlearn.b-cdn.net/what%20is%20work/fixing.gif',
              alt: 'People Fixing Things'
            },
            timing: 0
          }]);
          
          secondGifTimerRef.current = setTimeout(() => {
            setActiveContent([{
              id: 'reward-gif',
              type: 'image',
              data: {
                type: 'image',
                url: 'https://hlearn.b-cdn.net/what%20is%20work/reward.gif',
                alt: 'People Getting Rewards for Work'
              },
              timing: 0
            }]);
          }, 6000);
        }, 6000);
      } else if (isSecondPartPlayed && !secondPartFinished) {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/letswatch.mp3');
        setSecondPartFinished(true);
        setIsThirdPartPlayed(true);
        
        setActiveContent([{
          id: 'work-video',
          type: 'video',
          data: {
            type: 'video',
            url: 'https://hlearn.b-cdn.net/what%20is%20work/whatiswork56.mp4',
            alt: 'What Is Work Video'
          },
          timing: 0,
          onComplete: handleVideoComplete
        }]);
      } else if (lessonCompleted) {
        if (lesson && lesson.nextLessonId) {
          navigate(`/lesson/${lesson.nextLessonId}`);
        } else {
          const topicId = mockTopics.find(topic => 
            topic.lessons.some(l => l.id === lessonId)
          )?.id;
          
          if (topicId) {
            navigate(`/topic/${topicId}`);
          } else {
            navigate('/curriculum');
          }
        }
      }
    } else if (lessonId === '4002' && currentSectionIndex === 0) {
      if (!isSecondPartPlayed) {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20money/whatismoney2.mp3');
        setIsSecondPartPlayed(true);
        
        setActiveContent([{
          id: 'coins-image',
          type: 'image',
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/what%20is%20money/catmoney.gif',
            alt: 'Cat and Money'
          },
          timing: 0
        }]);
        
        if (gifTimerRef.current) {
          clearTimeout(gifTimerRef.current);
        }
        if (secondGifTimerRef.current) {
          clearTimeout(secondGifTimerRef.current);
        }
        
        gifTimerRef.current = setTimeout(() => {
          setActiveContent([{
            id: 'buying-gif',
            type: 'image',
            data: {
              type: 'image',
              url: 'https://hlearn.b-cdn.net/what%20is%20money/buying.gif',
              alt: 'Buying with Money'
            },
            timing: 0
          }]);
          
          secondGifTimerRef.current = setTimeout(() => {
            setActiveContent([{
              id: 'saving-gif',
              type: 'image',
              data: {
                type: 'image',
                url: 'https://hlearn.b-cdn.net/what%20is%20money/saving.gif',
                alt: 'Saving Money'
              },
              timing: 0
            }]);
          }, 6000);
        }, 6000);
      } else if (isSecondPartPlayed && !secondPartFinished) {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20money/letswatch.mp3');
        setSecondPartFinished(true);
        setIsThirdPartPlayed(true);
        
        setActiveContent([{
          id: 'money-video',
          type: 'video',
          data: {
            type: 'video',
            url: 'https://hlearn.b-cdn.net/what%20is%20money/whatismoney.mp4',
            alt: 'What Is Money Video'
          },
          timing: 0,
          onComplete: handleVideoComplete
        }]);
      } else if (lessonCompleted) {
        if (lesson && lesson.nextLessonId) {
          navigate(`/lesson/${lesson.nextLessonId}`);
        } else {
          const topicId = mockTopics.find(topic => 
            topic.lessons.some(l => l.id === lessonId)
          )?.id;
          
          if (topicId) {
            navigate(`/topic/${topicId}`);
          } else {
            navigate('/curriculum');
          }
        }
      }
    } else if (lesson && currentSectionIndex < lesson.sections.length - 1) {
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
    } else {
      console.log('Lesson completed');
      
      if (lesson && lesson.nextLessonId) {
        navigate(`/lesson/${lesson.nextLessonId}`);
      } else {
        const topicId = mockTopics.find(topic => 
          topic.lessons.some(l => l.id === lessonId)
        )?.id;
        
        if (topicId) {
          navigate(`/topic/${topicId}`);
        } else {
          navigate('/curriculum');
        }
      }
    }
  };
  
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
        <Header student={currentStudent} dailyGoalPercentage={dailyGoalPercentage} />
        <div className="mb-6">
          <h1 className="text-2xl font-semibold gradient-text">{lessonTitle}</h1>
          <p className="text-sm text-gray-400">From: {topicTitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex flex-col items-center justify-center">
            <AudioPlayer 
              audioUrl={getAudioUrl()} 
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleSectionEnd}
              autoPlay={true}
              key={`${getAudioUrl()}-${isSecondPartPlayed}-${secondPartFinished}-${isThirdPartPlayed}-${isQuizAnswered}-${isAnswerCorrect}-${lessonCompleted}`}
            />
          </div>
          <div className="h-[500px]">
            <ChatBox 
              contentItems={activeContent}
              initialMessage={`Listening to ${currentSection?.title}... Content will appear here as the lesson progresses.`}
              hideInputField={true}
              onVideoComplete={handleVideoComplete}
              onQuizAnswered={handleQuizAnswered}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
