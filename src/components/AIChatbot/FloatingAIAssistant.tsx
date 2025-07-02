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
  HelpCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Brain,
  TrendingUp,
  Users,
  LifeBuoy,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// AI Personas Configuration
const AI_PERSONAS = {
  support_companion: {
    name: "Support Companion",
    icon: LifeBuoy,
    avatar: "🤝",
    color: "bg-blue-500",
    description: "Friendly assistant for navigation, FAQs, and troubleshooting"
  },
  personalized_coach: {
    name: "Personalized Coach", 
    icon: Brain,
    avatar: "🎯",
    color: "bg-green-500",
    description: "Learning guide for procurement mastery"
  },
  insights_expert: {
    name: "Insights Expert",
    icon: TrendingUp,
    avatar: "📊", 
    color: "bg-purple-500",
    description: "Market analysis and data-driven insights"
  },
  community_facilitator: {
    name: "Community Facilitator",
    icon: Users,
    avatar: "🌐",
    color: "bg-orange-500", 
    description: "Connection builder and community engagement"
  }
};

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  persona?: string;
  learningRecommendations?: any;
  contextualInsights?: any;
  userProgress?: any;
}

interface VoiceRecording {
  isRecording: boolean;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
}

interface FloatingAIAssistantProps {
  className?: string;
}

interface FloatingAIAssistantProps {
  className?: string;
}

const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentPersona, setCurrentPersona] = useState('support_companion');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceRecording, setVoiceRecording] = useState<VoiceRecording>({
    isRecording: false,
    mediaRecorder: null,
    audioChunks: []
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Welcome to TendProcure Super AI Assistant! 🚀 I'm your ${AI_PERSONAS.support_companion.name}, and I'm here to revolutionize your procurement experience. I can help with:\n\n✨ **Multi-Modal Support**: Voice & text interaction\n🎯 **Personalized Learning**: Adaptive guidance tailored to you\n📊 **Smart Insights**: Real-time analytics and market intelligence\n🌐 **Community**: Connect with experts and peers\n\nChoose an AI persona above or ask me anything to get started!`,
      timestamp: new Date(),
      persona: 'support_companion',
      suggestions: [
        'Switch to Personalized Coach',
        'Show my learning progress', 
        'Generate analytics insights',
        'Enable voice interaction'
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

  // Voice Recording Functions
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const audioChunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        await processVoiceInput(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setVoiceRecording({
        isRecording: true,
        mediaRecorder,
        audioChunks
      });
      setIsListening(true);
      
    } catch (error) {
      console.error('Error starting voice recording:', error);
      toast.error('Could not access microphone. Please check permissions.');
    }
  };

  const stopVoiceRecording = () => {
    if (voiceRecording.mediaRecorder && voiceRecording.isRecording) {
      voiceRecording.mediaRecorder.stop();
      setVoiceRecording({
        isRecording: false,
        mediaRecorder: null,
        audioChunks: []
      });
      setIsListening(false);
    }
  };

  const processVoiceInput = async (audioBlob: Blob) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const response = await supabase.functions.invoke('voice-assistant', {
          body: {
            action: 'speech_to_text',
            data: { audio: base64Audio }
          }
        });
        
        if (response.error) throw response.error;
        
        const { text } = response.data;
        if (text && text.trim()) {
          setInputValue(text);
          // Auto-send if voice is enabled
          if (voiceEnabled) {
            handleSendMessage(text);
          }
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Voice processing error:', error);
      toast.error('Could not process voice input. Please try again.');
    }
  };

  const speakResponse = async (text: string) => {
    if (!voiceEnabled || !text) return;
    
    try {
      const response = await supabase.functions.invoke('voice-assistant', {
        body: {
          action: 'text_to_speech',
          data: { 
            text: text.replace(/[🚀✨🎯📊🌐🤝]/g, ''), // Remove emojis for speech
            voice: 'alloy',
            speed: 1.0
          }
        }
      });
      
      if (response.error) throw response.error;
      
      const { audioContent } = response.data;
      const audioBlob = new Blob([
        Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))
      ], { type: 'audio/mp3' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => URL.revokeObjectURL(audioUrl);
      audio.play().catch(console.error);
      
    } catch (error) {
      console.error('Text-to-speech error:', error);
    }
  };

  const handleSendMessage = async (customMessage?: string) => {
    const messageText = customMessage || inputValue;
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    if (!customMessage) setInputValue('');
    setIsTyping(true);

    try {
      // Call Super AI Assistant with enhanced context
      const response = await supabase.functions.invoke('super-ai-assistant', {
        body: {
          messages: [{ role: 'user', content: messageText }],
          persona: currentPersona,
          context: 'tender_management',
          userId: user?.id,
          userProfile: user,
          sessionData: { previousMessages: messages.slice(-5) }
        }
      });

      if (response.error) throw response.error;

      const { 
        response: aiResponse, 
        persona, 
        suggestions, 
        learningRecommendations,
        contextualInsights,
        userProgress 
      } = response.data;
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse || 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date(),
        persona: persona?.name || currentPersona,
        suggestions: suggestions || [],
        learningRecommendations,
        contextualInsights,
        userProgress
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Speak response if voice is enabled
      if (voiceEnabled) {
        await speakResponse(aiResponse);
      }
      
    } catch (error) {
      console.error('AI Assistant error:', error);
      // Fallback to basic response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(messageText),
        timestamp: new Date(),
        suggestions: getAISuggestions(messageText)
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
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

  const handlePersonaSwitch = (personaKey: string) => {
    setCurrentPersona(personaKey);
    const persona = AI_PERSONAS[personaKey];
    
    const switchMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: `${persona.avatar} Switched to **${persona.name}**!\n\n${persona.description}\n\nHow can I assist you in this capacity?`,
      timestamp: new Date(),
      persona: personaKey,
      suggestions: getPersonaSuggestions(personaKey)
    };
    
    setMessages(prev => [...prev, switchMessage]);
  };

  const getPersonaSuggestions = (personaKey: string): string[] => {
    const suggestions = {
      support_companion: ['Platform tutorial', 'Help with features', 'Troubleshoot issue', 'FAQ'],
      personalized_coach: ['Learning path', 'Skill assessment', 'Progress review', 'Set goals'],
      insights_expert: ['Market analysis', 'Performance metrics', 'Cost insights', 'Trend forecast'],
      community_facilitator: ['Find mentors', 'Join discussions', 'Network events', 'Collaborate']
    };
    return suggestions[personaKey] || suggestions.support_companion;
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-16 w-16 rounded-full gradient-primary hover:scale-110 shadow-luxury transition-all duration-300 pulse-glow"
        >
          <MessageCircle className="h-7 w-7 text-white" />
          <span className="sr-only">Open Super AI Assistant</span>
        </Button>
        <div className="absolute -top-1 -right-1 flex">
          <div className="h-4 w-4 bg-red-500 rounded-full animate-pulse">
            <span className="sr-only">AI Ready</span>
          </div>
          <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse ml-1">
            <span className="sr-only">Voice Ready</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card className={`w-[28rem] glass-ultra border-0 shadow-luxury transition-all duration-500 ${
        isMinimized ? 'h-20' : 'h-[36rem]'
      }`}>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full ${AI_PERSONAS[currentPersona].color} flex items-center justify-center shadow-glass`}>
                {React.createElement(AI_PERSONAS[currentPersona].icon, { className: "h-5 w-5 text-white" })}
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-gradient-luxury">
                  {AI_PERSONAS[currentPersona].name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {AI_PERSONAS[currentPersona].description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`h-8 w-8 p-0 ${voiceEnabled ? 'text-green-500' : 'text-muted-foreground'}`}
                title={voiceEnabled ? 'Voice enabled' : 'Voice disabled'}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
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
          
          {!isMinimized && (
            <div className="mt-3">
              <Select value={currentPersona} onValueChange={handlePersonaSwitch}>
                <SelectTrigger className="w-full h-9 glass-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-premium">
                  {Object.entries(AI_PERSONAS).map(([key, persona]) => (
                    <SelectItem key={key} value={key} className="hover:glass-button">
                      <div className="flex items-center gap-2">
                        <span>{persona.avatar}</span>
                        <span className="font-medium">{persona.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(36rem-8rem)]">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 py-2">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'ai' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={`${AI_PERSONAS[message.persona || currentPersona]?.color || 'bg-primary'} text-white text-xs`}>
                            {React.createElement(AI_PERSONAS[message.persona || currentPersona]?.icon || Bot, { className: "h-4 w-4" })}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user' 
                          ? 'gradient-primary text-white ml-auto shadow-glass' 
                          : 'glass-card'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="glass-card text-foreground text-xs">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    
                    {/* Enhanced Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 ml-11">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer glass-button hover:gradient-primary hover:text-white transition-all text-xs hover-lift"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Learning Recommendations */}
                    {message.learningRecommendations && (
                      <div className="ml-11 p-3 glass-card rounded-lg">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                          <Brain className="h-4 w-4" />
                          Learning Recommendations
                        </h4>
                        {message.learningRecommendations.immediate?.map((rec: any, idx: number) => (
                          <div key={idx} className="text-xs p-2 bg-primary/10 rounded mb-1">
                            <strong>{rec.title}</strong> - {rec.estimatedTime}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Contextual Insights */}
                    {message.contextualInsights && (
                      <div className="ml-11 p-3 glass-card rounded-lg">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          Smart Insights
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-green-500/10 rounded">
                            <div className="font-bold">{message.contextualInsights.metrics?.activeTenders}</div>
                            <div>Active Tenders</div>
                          </div>
                          <div className="text-center p-2 bg-blue-500/10 rounded">
                            <div className="font-bold">{message.contextualInsights.metrics?.pendingContracts}</div>
                            <div>Pending</div>
                          </div>
                          <div className="text-center p-2 bg-purple-500/10 rounded">
                            <div className="font-bold">{message.contextualInsights.metrics?.vendorScore}%</div>
                            <div>Vendor Score</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* User Progress */}
                    {message.userProgress && (
                      <div className="ml-11 p-3 glass-card rounded-lg">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          Your Progress
                        </h4>
                        <div className="text-xs space-y-1">
                          <div>Level: <strong>{message.userProgress.level}</strong></div>
                          <div>Streak: <strong>{message.userProgress.currentStreak} days</strong></div>
                          <div className="flex gap-1">
                            {message.userProgress.badges?.slice(0, 3).map((badge: string, idx: number) => (
                              <span key={idx} className="bg-primary/20 px-2 py-1 rounded text-xs">{badge}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={`${AI_PERSONAS[currentPersona].color} text-white text-xs`}>
                        {React.createElement(AI_PERSONAS[currentPersona].icon, { className: "h-4 w-4" })}
                      </AvatarFallback>
                    </Avatar>
                    <div className="glass-card p-3 rounded-2xl">
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
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={voiceEnabled ? "Speak or type your message..." : "Ask me anything about procurement..."}
                    className="pr-12 glass-card border-border focus:border-primary"
                    disabled={isTyping || isListening}
                  />
                  {voiceEnabled && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className={`absolute right-1 top-1 h-8 w-8 p-0 ${isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`}
                      onMouseDown={startVoiceRecording}
                      onMouseUp={stopVoiceRecording}
                      onMouseLeave={stopVoiceRecording}
                      disabled={isTyping}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping || isListening}
                  size="sm"
                  className="px-3 gradient-primary text-white hover-lift"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 glass-button"
                    onClick={() => handlePersonaSwitch('insights_expert')}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span className="text-xs">Insights</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 glass-button"
                    onClick={() => handlePersonaSwitch('personalized_coach')}
                  >
                    <Brain className="h-3 w-3 mr-1" />
                    <span className="text-xs">Coach</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {voiceEnabled ? '🎤 Voice enabled' : '💬 Text mode'}
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default FloatingAIAssistant;