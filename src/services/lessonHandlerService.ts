
import { useNavigate } from 'react-router-dom';
import { mockTopics } from '@/data/mockData';

export const handleLessonNavigation = (lesson: any, lessonId: string | undefined, navigate: ReturnType<typeof useNavigate>) => {
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
};

export const handleLessonEnd = (
  lessonId: string,
  lesson: any,
  isSecondPartPlayed: boolean,
  setCustomAudioUrl: (url: string) => void,
  setIsSecondPartPlayed: (value: boolean) => void,
  setLessonCompleted: (value: boolean) => void,
  setActiveContent: (content: any[]) => void,
  navigate: ReturnType<typeof useNavigate>
) => {
  if (lessonId === '4001') {
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
    } else {
      handleLessonNavigation(lesson, lessonId, navigate);
    }
  } else if (lessonId === '4004') {
    if (!isSecondPartPlayed) {
      setLessonCompleted(true);
    } else {
      handleLessonNavigation(lesson, lessonId, navigate);
    }
  }
};
