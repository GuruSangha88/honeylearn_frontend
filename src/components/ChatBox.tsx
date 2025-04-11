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
  }[];
  hideInputField?: boolean;
  preventAutoScroll?: boolean;
}

const ChatBox = ({
  initialMessage = "Say something to start the conversation",
  contentItems = [],
  hideInputField = false,
  preventAutoScroll = false
}: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [stabilizedContent, setStabilizedContent] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (contentItems.length > 0) {
      const contentMessages = contentItems.map(item => ({
        id: item.id,
        type: (item.type === 'text' ? 'text' : item.type === 'image' || item.type === 'video' ? 'media' : item.type) as 'text' | 'media' | 'quiz' | 'question',
        content: item.data,
        isUser: false
      }));
      
      setMessages(contentMessages);
      setStabilizedContent(contentMessages);
    }
  }, [contentItems]);

  useEffect(() => {
    if (!preventAutoScroll) {
      scrollToBottom();
    }
  }, [messages, preventAutoScroll]);

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
      setStabilizedContent(prev => [...prev, newMessage]);
      setInput('');

      setTimeout(() => {
        const responseMessage = {
          id: (Date.now() + 1).toString(),
          type: 'text' as const,
          content: "I understand. Let's continue with the lesson.",
          isUser: false
        };
        setMessages(prev => [...prev, responseMessage]);
        setStabilizedContent(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };

  const renderMessage = (message: ChatMessage) => {
    switch (message.type) {
      case 'text':
        return <p>{message.content}</p>;
      case 'media':
        if (message.content.type === 'image') {
          return (
            <div className="image-container w-full flex items-center justify-center" style={{ minHeight: '240px', maxHeight: '320px' }}>
              <img 
                src={message.content.url} 
                alt={message.content.alt || 'Lesson image'} 
                className="rounded-lg object-contain" 
                style={{ 
                  height: 'auto',
                  maxHeight: '280px', 
                  width: 'auto', 
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          );
        } else if (message.content.type === 'video') {
          return (
            <div className="w-full flex items-center justify-center" style={{ minHeight: '240px' }}>
              <video src={message.content.url} controls className="rounded-lg w-full" style={{ maxHeight: '280px' }} />
            </div>
          );
        }
        return null;
      case 'quiz':
        return <div className="bg-tutor-dark-gray p-4 rounded-lg">
            <h4 className="text-md font-medium mb-2">{message.content.question}</h4>
            <div className="flex flex-col gap-2">
              {message.content.options.map((option: string, idx: number) => <button key={idx} className={`text-left p-2 rounded-md text-sm ${message.content.userAnswer === idx ? message.content.correctAnswerIndex === idx ? 'bg-green-600/30 border border-green-600' : 'bg-red-600/30 border border-red-600' : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-700'}`} onClick={() => {
              if (message.content.userAnswer === undefined) {
                setMessages(messages.map(m => m.id === message.id ? {
                  ...m,
                  content: {
                    ...m.content,
                    userAnswer: idx
                  }
                } : m));
                setStabilizedContent(prev => prev.map(m => m.id === message.id ? {
                  ...m,
                  content: {
                    ...m.content,
                    userAnswer: idx
                  }
                } : m));
              }
            }} disabled={message.content.userAnswer !== undefined}>
                  {option}
                </button>)}
            </div>
            {message.content.userAnswer !== undefined && <p className={`mt-3 text-sm ${message.content.userAnswer === message.content.correctAnswerIndex ? 'text-green-400' : 'text-red-400'}`}>
                {message.content.userAnswer === message.content.correctAnswerIndex ? 'Correct! 🎉' : `Incorrect. The correct answer is: ${message.content.options[message.content.correctAnswerIndex]}`}
              </p>}
          </div>;
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

  const displayMessages = stabilizedContent.length > 0 ? stabilizedContent : messages;
  const currentMessage = displayMessages.length > 0 ? displayMessages[displayMessages.length - 1] : null;

  return (
    <div className="flex flex-col h-full glass-card w-full">
      <div className="glass-card p-6 h-[450px] w-full overflow-hidden">
        {displayMessages.length === 0 ? (
          <div className="text-center text-gray-400 h-full flex items-center justify-center">
            <p>{initialMessage}</p>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="content-container w-full h-full max-w-[90%] flex flex-col items-center justify-center">
              {currentMessage && 
                <div 
                  className="message-wrapper w-full flex items-center justify-center"
                  style={{ height: '100%' }}
                >
                  <div 
                    className={`message-content p-3 rounded-lg ${currentMessage.isUser ? 'bg-tutor-purple/30' : 'bg-tutor-dark-gray'} text-white w-full`}
                  >
                    {renderMessage(currentMessage)}
                  </div>
                </div>
              }
            </div>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      {!hideInputField && (
        <form onSubmit={handleSubmit} className="border-t border-gray-800 p-3 flex">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500" 
          />
          <Button type="submit" size="icon" variant="ghost" className="text-tutor-purple">
            <Send size={18} />
          </Button>
        </form>
      )}
    </div>
  );
};

export default ChatBox;
