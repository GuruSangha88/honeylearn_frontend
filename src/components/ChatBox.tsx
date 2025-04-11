
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentType } from '@/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ChatMessage {
  id: string;
  type: 'text' | 'media' | 'quiz' | 'question';
  content: any;
  isUser: boolean;
}

interface ChatBoxProps {
  initialMessage?: string;
  contentItems?: {
    id: string;
    type: ContentType;
    data: any;
    timing?: number;
    onComplete?: () => void;
  }[];
  hideInputField?: boolean;
  onVideoComplete?: () => void;
  onQuizAnswered?: (isCorrect: boolean) => void;
}

const ChatBox = ({
  initialMessage = "Say something to start the conversation",
  contentItems = [],
  hideInputField = false,
  onVideoComplete,
  onQuizAnswered
}: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (contentItems.length > 0) {
      const contentMessages = contentItems.map(item => ({
        id: item.id,
        type: (item.type === 'text' ? 'text' : item.type === 'image' || item.type === 'video' ? 'media' : item.type) as 'text' | 'media' | 'quiz' | 'question',
        content: item.data,
        isUser: false
      }));
      setMessages(contentMessages);
    }
  }, [contentItems]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        type: 'text' as const,
        content: input,
        isUser: true
      };
      setMessages([...messages, newMessage]);
      setInput('');

      setTimeout(() => {
        const responseMessage = {
          id: (Date.now() + 1).toString(),
          type: 'text' as const,
          content: "I understand. Let's continue with the lesson.",
          isUser: false
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };

  const handleVideoEnded = () => {
    console.log("Video ended - marking as complete");
    if (onVideoComplete) {
      onVideoComplete();
    }
  };

  const handleQuizAnswer = (message: ChatMessage, selectedAnswer: boolean) => {
    // Update the message to show which option was selected
    const updatedMessages = messages.map(msg => {
      if (msg.id === message.id) {
        return {
          ...msg,
          content: {
            ...msg.content,
            userAnswer: selectedAnswer
          }
        };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
    
    // Notify parent component of the answer
    if (onQuizAnswered) {
      onQuizAnswered(selectedAnswer);
    }
  };

  const renderMessage = (message: ChatMessage) => {
    switch (message.type) {
      case 'text':
        return <p>{message.content}</p>;
      case 'media':
        if (message.content.type === 'image') {
          return (
            <div className="flex items-center justify-center w-full h-full">
              <img src={message.content.url} alt={message.content.alt || 'Lesson image'} className="rounded-lg max-h-72 object-contain" />
            </div>
          );
        } else if (message.content.type === 'video') {
          return (
            <div className="flex items-center justify-center w-full h-full">
              <video ref={videoRef} src={message.content.url} controls className="rounded-lg max-h-60 w-full" onEnded={handleVideoEnded} />
            </div>
          );
        }
        return null;
      case 'quiz':
        return (
          <div className="bg-tutor-dark-gray p-4 rounded-lg w-full">
            <h4 className="text-md font-medium mb-4">{message.content.question}</h4>
            <div className="flex flex-col gap-3">
              {message.content.options.map((option: any, idx: number) => (
                <Button 
                  key={idx}
                  className={`text-white text-left justify-start h-auto py-3 px-4 ${
                    message.content.userAnswer !== undefined ? 
                      idx === message.content.correctOptionIndex ? 
                        'bg-green-600 hover:bg-green-700' : 
                        'bg-red-600 hover:bg-red-700' : 
                      option.color === 'blue' ? 
                        'bg-blue-600 hover:bg-blue-700' : 
                        'bg-pink-600 hover:bg-pink-700'
                  }`}
                  onClick={() => {
                    if (message.content.userAnswer === undefined) {
                      handleQuizAnswer(message, idx === message.content.correctOptionIndex);
                    }
                  }}
                  disabled={message.content.userAnswer !== undefined}
                >
                  {option.text}
                </Button>
              ))}
            </div>
            {message.content.userAnswer !== undefined && (
              <p className={`mt-4 text-sm ${message.content.userAnswer ? 'text-green-400' : 'text-red-400'}`}>
                {message.content.userAnswer ? 'Correct! 🎉' : 'Incorrect. Please try again.'}
              </p>
            )}
          </div>
        );
      case 'question':
        return <div className="bg-tutor-dark-gray p-4 rounded-lg">
            <h4 className="text-md font-medium mb-2">{message.content.question}</h4>
            <div className="mt-2">
              <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-sm" placeholder="Type your answer..." />
              <Button size="sm" className="mt-2 bg-tutor-purple hover:bg-tutor-dark-purple">
                Submit
              </Button>
            </div>
          </div>;
      default:
        return <p>{JSON.stringify(message.content)}</p>;
    }
  };

  return <div className="flex flex-col h-full glass-card">
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {messages.length === 0 ? <div className="text-center text-gray-400 h-full flex items-center justify-center">
            <p>{initialMessage}</p>
          </div> : <div className="flex flex-col gap-4 h-full w-full mx-0 my-0">
            {messages.map(message => {
              const isImageMessage = message.type === 'media' && message.content.type === 'image';
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isImageMessage ? 'justify-center' : 
                    (message.isUser ? 'justify-end' : 'justify-start')}`}
                >
                  <div className={`${isImageMessage ? 'max-w-[90%]' : 'max-w-[75%]'} rounded-lg p-3 ${message.isUser ? 'bg-tutor-purple/30 text-white' : 'bg-tutor-dark-gray text-white'}`}>
                    {renderMessage(message)}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>}
      </div>

      {!hideInputField && <form onSubmit={handleSubmit} className="border-t border-gray-800 p-3 flex">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500" />
          <Button type="submit" size="icon" variant="ghost" className="text-tutor-purple">
            <Send size={18} />
          </Button>
        </form>}
    </div>;
};

export default ChatBox;
