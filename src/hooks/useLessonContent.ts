import { useEffect } from 'react';
import { ContentItem } from '@/types';

export const useLessonContent = (
  lessonId: string | undefined,
  currentSectionIndex: number,
  lesson: any,
  setActiveContent: (content: ContentItem[]) => void,
  setCustomAudioUrl: (url: string | null) => void,
  setIsSecondPartPlayed: (value: boolean) => void,
  setSecondPartFinished: (value: boolean) => void,
  setIsThirdPartPlayed: (value: boolean) => void,
  setThirdPartFinished: (value: boolean) => void,
  setVideoCompleted: (value: boolean) => void,
  setVideoStarted: (value: boolean) => void,
  setAudioSevenPlayed: (value: boolean) => void,
  setQuizDisplayed: (value: boolean) => void,
) => {
  useEffect(() => {
    if (lesson && lesson.sections.length > 0) {
      if (lessonId === '4001' && currentSectionIndex === 0) {
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
        setCustomAudioUrl('https://hlearn.b-cdn.net/what%20is%20work/whatisworkaudio1.mp3');
        resetLessonState();
      } else if (lessonId === '4002' && currentSectionIndex === 0) {
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
        resetLessonState();
      } else if (lessonId === '4003' && currentSectionIndex === 0) {
        const initialImage: ContentItem = {
          id: 'wants-needs-intro',
          type: 'image',
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/wantsvsneeds/toystore.gif',
            alt: 'Toy store with many toys'
          },
          timing: 0
        };
        setActiveContent([initialImage]);
        setCustomAudioUrl('https://hlearn.b-cdn.net/wantsvsneeds/wantsvsneeds1.mp3');
        resetLessonState();
      } else if (lessonId === '4004' && currentSectionIndex === 0) {
        const initialImage: ContentItem = {
          id: 'make-money-dog-image',
          type: 'image',
          data: {
            type: 'image',
            url: 'https://hlearn.b-cdn.net/How%20do%20I%20make%20money/dog.gif',
            alt: 'Dog walking - a way to make money'
          },
          timing: 0
        };
        setActiveContent([initialImage]);
        setCustomAudioUrl('https://hlearn.b-cdn.net/How%20do%20I%20make%20money/howdoimakemoney.mp3');
        resetLessonState();
      } else {
        setActiveContent([]);
      }
    }
  }, [lesson, currentSectionIndex, lessonId]);

  const resetLessonState = () => {
    setIsSecondPartPlayed(false);
    setSecondPartFinished(false);
    setIsThirdPartPlayed(false);
    setThirdPartFinished(false);
    setVideoCompleted(false);
    setVideoStarted(false);
    setAudioSevenPlayed(false);
    setQuizDisplayed(false);
  };
};
