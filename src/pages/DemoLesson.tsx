
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import ChatBox from '@/components/ChatBox';
import { ContentItem } from '@/types';
import { currentStudent } from '@/data/mockData';

const DemoLesson = () => {
  const [activeContent, setActiveContent] = useState<ContentItem[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>('https://hlearn.b-cdn.net/what%20is%20money/whatismoney1.mp3');
  const [lessonProgress, setLessonProgress] = useState(25);
  const [isQuizDisplayed, setIsQuizDisplayed] = useState(false);

  useEffect(() => {
    // Initialize with first content item
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
  }, []);

  const handleTimeUpdate = (currentTime: number) => {
    // Add content based on audio time
    if (currentTime >= 5 && !activeContent.some(item => item.id === 'money-definition')) {
      const definitionContent: ContentItem = {
        id: 'money-definition',
        type: 'text',
        data: {
          type: 'text',
          content: "Money is a tool that helps us trade things easily!"
        },
        timing: 5
      };
      setActiveContent(prev => [...prev, definitionContent]);
      setLessonProgress(40);
    }
    
    if (currentTime >= 10 && !activeContent.some(item => item.id === 'coins-image')) {
      const coinsImage: ContentItem = {
        id: 'coins-image',
        type: 'image',
        data: {
          type: 'image',
          url: 'https://hlearn.b-cdn.net/what%20is%20money/catmoney.gif',
          alt: 'Cat and Money'
        },
        timing: 10
      };
      setActiveContent(prev => [...prev, coinsImage]);
      setLessonProgress(60);
    }
    
    if (currentTime >= 15 && !isQuizDisplayed) {
      setIsQuizDisplayed(true);
      const quizContent: ContentItem = {
        id: 'money-quiz',
        type: 'quiz',
        data: {
          question: "What is money?",
          options: [
            { text: "Money is just paper that adults use", color: "blue" },
            { text: "Money is a tool to help trade", color: "purple" }
          ],
          correctOptionIndex: 1
        },
        timing: 15
      };
      setActiveContent(prev => [...prev, quizContent]);
      setLessonProgress(80);
    }
  };

  const handleVideoComplete = () => {
    console.log("Video completed");
    setLessonProgress(90);
  };

  const handleQuizAnswered = (isCorrect: boolean) => {
    console.log(`Quiz answered ${isCorrect ? 'correctly' : 'incorrectly'}`);
    if (isCorrect) {
      setLessonProgress(100);
    }
  };

  const handleAudioEnd = () => {
    console.log("Audio ended");
    // You could transition to the next section or show completion here
  };

  const lessonTitle = "What is Money? (Demo)";
  const topicTitle = "Financial Literacy Basics";

  return (
    <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        <Header student={currentStudent} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-semibold gradient-text">{lessonTitle}</h1>
          <p className="text-sm text-gray-400">From: {topicTitle}</p>
          
          {/* Progress indicator */}
          <div className="mt-4 bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-tutor-blue to-tutor-purple h-full transition-all duration-500 ease-out"
              style={{ width: `${lessonProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex flex-col items-center justify-center">
            <AudioPlayer 
              audioUrl={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleAudioEnd}
              autoPlay={true}
            />
          </div>
          
          <div className="h-[500px]">
            <ChatBox 
              contentItems={activeContent}
              initialMessage="Welcome to the 'What is Money?' demo lesson. As the audio plays, content will appear here!"
              hideInputField={true}
              onVideoComplete={handleVideoComplete}
              onQuizAnswered={handleQuizAnswered}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="bg-tutor-purple hover:bg-tutor-blue text-white border-none">
            Back to Lessons
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoLesson;
