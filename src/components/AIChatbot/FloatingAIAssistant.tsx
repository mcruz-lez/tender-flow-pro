import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Sparkles,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface FloatingAIAssistantProps {
  className?: string;
}

const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Welcome to TendProcure AI Assistant! 🚀 I can help you with tender management, vendor evaluation, contract creation, and much more. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Create a new tender',
        'Find qualified vendors',
        'Analyze contract risks',
        'Generate compliance reports'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
        suggestions: getAISuggestions(inputValue)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('tender') || lowerInput.includes('create')) {
      return '🎯 I can help you create a tender! I\'ll guide you through setting up requirements, evaluation criteria, budgets, and timelines. Would you like me to start the tender creation wizard or provide templates?';
    }
    if (lowerInput.includes('vendor') || lowerInput.includes('supplier')) {
      return '👥 For vendor management, I can help you find qualified vendors, review performance metrics, manage prequalification, and track vendor relationships. What specific vendor task would you like assistance with?';
    }
    if (lowerInput.includes('contract') || lowerInput.includes('agreement')) {
      return '📋 Contract management is one of my specialties! I can help draft contracts, analyze risks, track performance, manage renewals, and ensure compliance. What contract-related task can I assist you with?';
    }
    if (lowerInput.includes('analytics') || lowerInput.includes('report')) {
      return '📊 I can generate comprehensive analytics and reports including spend analysis, vendor performance, compliance tracking, and market insights. Which type of analytics would you like me to prepare?';
    }
    
    return '✨ I understand you need assistance with procurement processes. I\'m equipped to help with tender management, vendor relations, contract administration, compliance tracking, and strategic insights. Could you provide more details about what you\'re looking to accomplish?';
  };

  const getAISuggestions = (input: string): string[] => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('tender')) {
      return ['Create HVAC tender', 'Set evaluation criteria', 'Add budget requirements', 'Schedule tender timeline'];
    }
    if (lowerInput.includes('vendor')) {
      return ['Search vendor directory', 'Review vendor performance', 'Start prequalification', 'Send vendor invitations'];
    }
    if (lowerInput.includes('contract')) {
      return ['Draft new contract', 'Review contract terms', 'Track milestones', 'Schedule renewals'];
    }
    
    return ['Show dashboard overview', 'Recent tender activity', 'Pending approvals', 'Compliance alerts'];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 pulse-glow"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
        <div className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full animate-pulse">
          <span className="sr-only">New messages</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card className={`w-96 bg-card/95 backdrop-blur-lg border shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[32rem]'
      }`}>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">AI Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(32rem-4rem)]">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 py-2">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'ai' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 ml-11">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <Separator />
            
            <div className="p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about procurement..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Sparkles className="h-3 w-3 mr-1" />
                    <span className="text-xs">Smart</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <HelpCircle className="h-3 w-3 mr-1" />
                    <span className="text-xs">Help</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">AI-powered assistance</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default FloatingAIAssistant;