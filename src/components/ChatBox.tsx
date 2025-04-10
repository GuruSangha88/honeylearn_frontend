
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentType } from '@/types';

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
}

const ChatBox = ({ initialMessage = "Say something to start the conversation", contentItems = [], hideInputField = false }: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add content items as messages
    if (contentItems.length > 0) {
      const contentMessages = contentItems.map(item => ({
        id: item.id,
        type: (item.type === 'text' ? 'text' : 
              item.type === 'image' || item.type === 'video' ? 'media' :
              item.type) as 'text' | 'media' | 'quiz' | 'question',
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      
      // Simulate a response (in a real app, this would call an API)
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

  const renderMessage = (message: ChatMessage) => {
    switch (message.type) {
      case 'text':
        return <p>{message.content}</p>;
      
      case 'media':
        if (message.content.type === 'image') {
          return (
            <img 
              src={message.content.url} 
              alt={message.content.alt || 'Lesson image'} 
              className="rounded-lg max-h-72 w-auto"
            />
          );
        } else if (message.content.type === 'video') {
          return (
            <video 
              src={message.content.url} 
              controls
              className="rounded-lg max-h-60 w-full"
            />
          );
        }
        return null;
      
      case 'quiz':
        return (
          <div className="bg-tutor-dark-gray p-4 rounded-lg">
            <h4 className="text-md font-medium mb-2">{message.content.question}</h4>
            <div className="flex flex-col gap-2">
              {message.content.options.map((option: string, idx: number) => (
                <button
                  key={idx}
                  className={`text-left p-2 rounded-md text-sm ${
                    message.content.userAnswer === idx
                      ? message.content.correctAnswerIndex === idx
                        ? 'bg-green-600/30 border border-green-600'
                        : 'bg-red-600/30 border border-red-600'
                      : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-700'
                  }`}
                  onClick={() => {
                    if (message.content.userAnswer === undefined) {
                      setMessages(
                        messages.map(m =>
                          m.id === message.id
                            ? {
                                ...m,
                                content: {
                                  ...m.content,
                                  userAnswer: idx
                                }
                              }
                            : m
                        )
                      );
                    }
                  }}
                  disabled={message.content.userAnswer !== undefined}
                >
                  {option}
                </button>
              ))}
            </div>
            {message.content.userAnswer !== undefined && (
              <p className={`mt-3 text-sm ${
                message.content.userAnswer === message.content.correctAnswerIndex
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}>
                {message.content.userAnswer === message.content.correctAnswerIndex
                  ? 'Correct! 🎉'
                  : `Incorrect. The correct answer is: ${
                      message.content.options[message.content.correctAnswerIndex]
                    }`}
              </p>
            )}
          </div>
        );
      
      case 'question':
        return (
          <div className="bg-tutor-dark-gray p-4 rounded-lg">
            <h4 className="text-md font-medium mb-2">{message.content.question}</h4>
            <div className="mt-2">
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-sm"
                placeholder="Type your answer..."
              />
              <Button size="sm" className="mt-2 bg-tutor-purple hover:bg-tutor-dark-purple">
                Submit
              </Button>
            </div>
          </div>
        );
      
      default:
        return <p>{JSON.stringify(message.content)}</p>;
    }
  };

  return (
    <div className="flex flex-col h-full glass-card">
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 h-full flex items-center justify-center">
            <p>{initialMessage}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-tutor-purple/30 text-white'
                      : 'bg-tutor-dark-gray text-white'
                  }`}
                >
                  {renderMessage(message)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      {!hideInputField && (
        <form onSubmit={handleSubmit} className="border-t border-gray-800 p-3 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
