import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const ChatMode = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: '你好！我是AI助手，请问有什么可以帮助您的吗？',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `这是对"${userMessage.content}"的智能回复。我理解了您的问题，这里是详细的回答...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
      {/* 对话展示区 */}
      <div className="flex-1 bg-card/50 rounded-xl border border-border/30 backdrop-blur-sm overflow-hidden">
        <ScrollArea className="h-full p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-fade-in ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-accent text-accent-foreground'
                }`}>
                  {message.type === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`flex-1 max-w-2xl ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-4 rounded-2xl text-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}>
                    {message.content}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-4 bg-muted rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* 输入区 */}
      <div className="mt-6 flex gap-4">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入您的问题..."
          className="text-lg h-14 bg-input/50 border-border/50"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping}
          className="h-14 px-8 text-lg"
        >
          <Send size={20} />
        </Button>
      </div>
      
      {/* 风格选择器 */}
      <div className="mt-4 flex gap-3">
        <Badge variant="secondary" className="text-sm py-2 px-4">专业模式</Badge>
        <Badge variant="outline" className="text-sm py-2 px-4">创意模式</Badge>
        <Badge variant="outline" className="text-sm py-2 px-4">简洁模式</Badge>
      </div>
    </div>
  );
};