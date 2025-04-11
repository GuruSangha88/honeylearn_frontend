
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
    
    // Reset states when lesson changes
    setIsSecondPartPlayed(false);
    setSecondPartFinished(false);
    setIsThirdPartPlayed(false);
    setVideoCompleted(false);
    setQuizDisplayed(false);
    setIsQuizAnswered(false);
    setIsAnswerCorrect(false);
    setLessonCompleted(false);
    setProgressPercentage(25); // Start with 25% progress
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
        setCustomAudioUrl('https://hlearn.b-cdn.net/intro.mp3');
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
  
  // Update student's progress
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
    
    // After video completes, play the fourth audio and show quiz
    if (lessonId === '4001') {
      setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/whatisworkaudio5.mp3');
      
      // Display quiz after a short delay
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
    }
  };
  
  const handleQuizAnswered = (isCorrect: boolean) => {
    setIsQuizAnswered(true);
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      // Play success audio
      setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/welldone.mp3');
      
      // After the success audio completes, play the congratulations audio
      setTimeout(() => {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/congrats.mp3');
        setLessonCompleted(true);
      }, 3000); // Approximate duration of the welldone.mp3
    } else {
      // Play try again audio
      setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/tryagain.mp3');
      
      // Reset quiz state to allow another attempt
      setTimeout(() => {
        setIsQuizAnswered(false);
        
        // Update the quiz in activeContent to reset it
        setActiveContent(prev => prev.map(item => 
          item.id === 'work-quiz' 
            ? {
                ...item, 
                data: {
                  ...item.data,
                  userAnswer: undefined
                }
              } 
            : item
        ));
      }, 3000); // Approximate duration of the tryagain.mp3
    }
  };
  
  const handleSectionEnd = () => {
    if (lessonId === '4001' && currentSectionIndex === 0) {
      if (!isSecondPartPlayed) {
        // First audio part ended, now play second part
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
        // Second audio part has finished, now play the third part
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/letswatch.mp3');
        setSecondPartFinished(true);
        setIsThirdPartPlayed(true);
        
        // Show video in the chatbox
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
        // Final audio has finished, navigate to next lesson/section
        if (lesson && lesson.nextLessonId) {
          navigate(`/lesson/${lesson.nextLessonId}`);
        } else {
          // If there's no next lesson, navigate back to the topic
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
      
      // Add navigation to the next lesson or back to topic detail
      if (lesson && lesson.nextLessonId) {
        navigate(`/lesson/${lesson.nextLessonId}`);
      } else {
        // If there's no next lesson, navigate back to the topic
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
