
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User, Sparkles, Clipboard, Check, Code, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import type { User as FirebaseUser } from 'firebase/auth';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
 text: string;
  createdAt?: any;
}

const promptSuggestions = [
    { icon: Briefcase, text: "Can you give me a summary of your professional experience?" },
    { icon: Code, text: "Tell me about a challenging project you have worked on." },
    { icon: Lightbulb, text: "What technologies are you most skilled in?" },
    { icon: GraduationCap, text: "What is your educational background?" },
];

const CopilotAILogo = () => (
    <motion.div
      className="w-20 h-20 rounded-full flex items-center justify-center bg-background border-2 border-accent/30 shadow-lg shadow-accent/10"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
        <Sparkles className="w-10 h-10 text-accent animate-pulse-glow" />
    </motion.div>
);

const AssistantMessage = ({ text }: { text: string; }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isImage = text.startsWith('Image generated successfully.');
  const imageUrl = isImage ? text.replace('Image generated successfully. ', '') : '';
  const isVideo = text.startsWith('Video generated successfully.');
  const videoUrl = isVideo ? text.replace('Video generated successfully. ', '') : '';

  if (isImage) {
      return (
          <div className="p-2 bg-muted/50 rounded-lg inline-block">
              <Image src={imageUrl} alt="Generated image" width={256} height={256} className="rounded-md border-2 border-accent/30" />
          </div>
      );
  }

  if (isVideo) {
      return (
          <div className="p-2 bg-muted/50 rounded-lg inline-block">
              <video src={videoUrl} width="256" height="256" controls className="rounded-md border-2 border-accent/30" />
          </div>
      );
  }

  return (
    <div className="flex items-start gap-2 group/message">
      <div className="prose prose-sm prose-invert max-w-none text-foreground/90 break-words">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
       <div className="flex flex-col gap-1 opacity-0 group-hover/message:opacity-100 transition-opacity self-end">
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 text-muted-foreground hover:text-accent"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

export function ChatbotSection({ user, temperature, topP, task }: { user: FirebaseUser | null, temperature: number, topP: number, task: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || !user) return;

    const userMessage: Message = { 
        role: 'user', 
        text: messageText,
        createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ "role": "user", "content": messageText }],
                temperature: temperature,
                top_p: topP,
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        const assistantMessage: Message = { 
            role: 'assistant', 
            text: data.choices[0].message.content,
            createdAt: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { 
          role: 'assistant', 
          text: "Sorry, I'm having a little trouble connecting. Please try again in a moment.",
          createdAt: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);

    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-transparent">
        <ScrollArea className="flex-grow w-full" viewportRef={scrollViewportRef}>
            <div className="px-4 md:px-6 w-full max-w-screen-lg mx-auto">
                <AnimatePresence>
                {messages.length === 0 && !isLoading && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-center items-center text-center h-full pt-20"
                    >
                    <CopilotAILogo />
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-6 mb-2">
                        How can I help you today?
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 w-full max-w-2xl mt-8">
                        {promptSuggestions.map((prompt, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                        >
                            <Card
                            onClick={() => handleSendMessage(prompt.text)}
                            className="p-4 bg-card/60 hover:bg-card/90 cursor-pointer transition-all duration-300 h-full backdrop-blur-sm flex items-center text-left"
                            >
                            <prompt.icon className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                            <p className="text-sm font-medium text-foreground">{prompt.text}</p>
                            </Card>
                        </motion.div>
                        ))}
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>

                <motion.div
                    className="space-y-4 py-4 pr-2 sm:pr-4"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <AnimatePresence>
                    {messages.map((message, index) => {
                        const messageId = message.createdAt?.toString() || `${index}-${message.role}`;
                        const isUser = message.role === 'user';
                        return (
                        <motion.div
                            key={messageId}
                            className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}
                            variants={messageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            layout
                        >
                            {!isUser && (
                              <Avatar className="w-8 h-8 flex-shrink-0 self-start">
                                  <AvatarImage src="https://placehold.co/100x100.png" alt="Hari Krishna" data-ai-hint="logo abstract" />
                                  <AvatarFallback>
                                    <Sparkles />
                                  </AvatarFallback>
                              </Avatar>
                            )}
                            <div className={cn(
                                "max-w-[85%] sm:max-w-md md:max-w-2xl p-3 rounded-2xl shadow-md",
                                isUser 
                                    ? "bg-primary text-primary-foreground rounded-br-none" 
                                    : "bg-card text-card-foreground rounded-bl-none border border-accent/20"
                            )}>
                                {isUser ? (
                                   <p className="text-base leading-relaxed break-words">{message.text}</p>
                                ) : (
                                    <AssistantMessage text={message.text} />
                                )}
                            </div>
                            {isUser && (
                               <Avatar className="w-8 h-8 flex-shrink-0">
                                   <AvatarImage src={user?.photoURL ?? "https://placehold.co/100x100.png"} alt={user?.displayName ?? "User"} data-ai-hint="avatar" />
                                   <AvatarFallback><User /></AvatarFallback>
                               </Avatar>
                            )}
                        </motion.div>
                        );
                    })}
                    </AnimatePresence>
                    {isLoading && (
                    <motion.div
                        className="flex items-end gap-2 justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        layout
                    >
                        <Avatar className="w-8 h-8 flex-shrink-0 self-start">
                          <AvatarImage src="https://placehold.co/100x100.png" alt="AI Avatar" data-ai-hint="logo abstract" />
                          <AvatarFallback>
                            <Sparkles />
                          </AvatarFallback>
                        </Avatar>
                        <div className="max-w-md md:max-w-2xl p-3 rounded-2xl shadow-md bg-card text-card-foreground rounded-bl-none border border-accent/20">
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: '0s' }} />
                               <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: '0.2s' }} />
                               <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot" style={{ animationDelay: '0.4s' }} />
                            </div>
                        </div>
                    </motion.div>
                    )}
                </motion.div>
            </div>
        </ScrollArea>
        
        <div className="flex-shrink-0 p-4 sm:p-6 w-full max-w-screen-lg mx-auto">
          <form onSubmit={handleFormSubmit} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message HariVerse AI..."
              className="relative bg-card/80 backdrop-blur-sm border-border h-12 pl-4 pr-14 rounded-full text-base focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-accent hover:bg-accent/80 text-accent-foreground">
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          <p className="text-xs text-center text-muted-foreground mt-3">
            HariVerse AI can make mistakes. Consider checking important information.
          </p>
        </div>
    </div>
  );
}
