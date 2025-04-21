
import { useState, useEffect } from 'react';
import { LessonSection, ContentItem } from '@/types';
import { mockTopics } from '@/data/mockData';

export const useLessonState = (lessonId: string | undefined) => {
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
  const [thirdPartFinished, setThirdPartFinished] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isSixthPartPlayed, setIsSixthPartPlayed] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [audioSevenPlayed, setAudioSevenPlayed] = useState(false);
  const [quizDisplayed, setQuizDisplayed] = useState(false);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    // Clear all state when lessonId changes to prevent mixing lesson content
    setActiveContent([]);
    setCustomAudioUrl(null);
    setCurrentSectionIndex(0);
    setCurrentSection(null);
    
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
    
    // Reset all state variables for the new lesson
    setIsSecondPartPlayed(false);
    setSecondPartFinished(false);
    setIsThirdPartPlayed(false);
    setThirdPartFinished(false);
    setVideoCompleted(false);
    setVideoStarted(false);
    setAudioSevenPlayed(false);
    setQuizDisplayed(false);
    setIsQuizAnswered(false);
    setIsAnswerCorrect(false);
    setLessonCompleted(false);
    setProgressPercentage(25);
  }, [lessonId]);

  return {
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
  };
};
