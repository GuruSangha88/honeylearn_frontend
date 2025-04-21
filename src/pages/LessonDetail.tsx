
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import ChatBox from '@/components/ChatBox';
import { currentStudent } from '@/data/mockData';
import { useLessonState } from '@/hooks/useLessonState';
import { useLessonContent } from '@/hooks/useLessonContent';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { handleLessonEnd } from '@/services/lessonHandlerService';

const LessonDetail = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  
  const {
    currentSectionIndex,
    setCurrentSectionIndex,
    currentSection,
    setCurrentSection,
    activeContent,
    setActiveContent,
    topicTitle,
    lessonTitle,
    lesson,
    customAudioUrl,
    setCustomAudioUrl,
    isSecondPartPlayed,
    setIsSecondPartPlayed,
    secondPartFinished,
    setSecondPartFinished,
    isThirdPartPlayed,
    setIsThirdPartPlayed,
    thirdPartFinished,
    setThirdPartFinished,
    videoCompleted,
    setVideoCompleted,
    isSixthPartPlayed,
    setIsSixthPartPlayed,
    videoStarted,
    setVideoStarted,
    audioSevenPlayed,
    setAudioSevenPlayed,
    quizDisplayed,
    setQuizDisplayed,
    isQuizAnswered,
    setIsQuizAnswered,
    isAnswerCorrect,
    setIsAnswerCorrect,
    lessonCompleted,
    setLessonCompleted,
    progressPercentage,
    setProgressPercentage,
  } = useLessonState(lessonId);

  useLessonContent(
    lessonId,
    currentSectionIndex,
    lesson,
    setActiveContent,
    setCustomAudioUrl,
    setIsSecondPartPlayed,
    setSecondPartFinished,
    setIsThirdPartPlayed,
    setThirdPartFinished,
    setVideoCompleted,
    setVideoStarted,
    setAudioSevenPlayed,
    setQuizDisplayed
  );

  const { dailyGoalPercentage } = useProgressTracking(
    isSecondPartPlayed,
    secondPartFinished,
    isThirdPartPlayed,
    thirdPartFinished,
    videoCompleted,
    isSixthPartPlayed,
    quizDisplayed,
    lessonCompleted,
    setProgressPercentage,
    currentStudent
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

  const handleVideoComplete = () => {
    setVideoCompleted(true);
    console.log("Video has been completely watched!");
  };

  const handleQuizAnswered = (isCorrect: boolean) => {
    setIsQuizAnswered(true);
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      if (lessonId === '4001') {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/welldone.mp3');
      }
      
      setTimeout(() => {
        if (lessonId === '4001') {
          setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/congrats.mp3');
        }
        setLessonCompleted(true);
      }, 3000);
    } else {
      if (lessonId === '4001') {
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/tryagain.mp3');
      }
      
      setTimeout(() => {
        setIsQuizAnswered(false);
        setActiveContent(prev => prev.map(item => 
          item.id === 'work-quiz' || item.id === 'money-quiz' || item.id === 'wants-needs-quiz'
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
    handleLessonEnd(
      lessonId || '',
      lesson,
      isSecondPartPlayed,
      setCustomAudioUrl,
      setIsSecondPartPlayed,
      setLessonCompleted,
      setActiveContent,
      navigate
    );
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
        <Header student={currentStudent} />
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
              key={`${getAudioUrl()}-${isSecondPartPlayed}-${secondPartFinished}-${isThirdPartPlayed}-${thirdPartFinished}-${isSixthPartPlayed}-${videoStarted}-${audioSevenPlayed}-${isQuizAnswered}-${isAnswerCorrect}-${lessonCompleted}`}
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
