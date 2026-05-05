import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Bot, Play, Loader2, Send, Trophy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { INTERVIEW_API_END_POINT } from '../../utils/constant';

const InterviewChatbot = ({ open, setOpen, job }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleStart = async () => {
    if (!job?._id) return;
    
    setIsStarting(true);
    try {
      const response = await axios.post(
        `${INTERVIEW_API_END_POINT}/start`,
        { jobId: job._id },
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessages([
          { role: 'interviewer', text: response.data.message, timestamp: new Date() }
        ]);
        setQuestionNumber(1);
        setConversationHistory([
          { role: 'interviewer', message: response.data.message }
        ]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to start interview. Try again.");
    } finally {
      setIsStarting(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    setMessages(prev => [
      ...prev,
      { role: 'candidate', text: userMessage, timestamp: new Date() }
    ]);
    
    const newHistory = [
      ...conversationHistory,
      { role: 'candidate', message: userMessage }
    ];
    setConversationHistory(newHistory);
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        `${INTERVIEW_API_END_POINT}/message`,
        { 
          jobId: job._id, 
          userAnswer: userMessage,
          conversationHistory: newHistory,
          questionNumber
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        const aiMessage = response.data.message;
        setMessages(prev => [
          ...prev,
          { role: 'interviewer', text: aiMessage, timestamp: new Date() }
        ]);
        
        setConversationHistory(prev => [
          ...prev,
          { role: 'interviewer', message: aiMessage }
        ]);
        
        setQuestionNumber(response.data.questionNumber);
        
        if (response.data.isCompleted) {
          setIsCompleted(true);
          setScore(response.data.score);
          setMessages(prev => [
            ...prev,
            { role: 'system', text: '— Interview Complete —', timestamp: new Date() }
          ]);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send message. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInputValue("");
    setIsLoading(false);
    setIsStarting(false);
    setQuestionNumber(0);
    setIsCompleted(false);
    setScore(null);
    setConversationHistory([]);
  };

  const handleClose = (isOpen) => {
    if (!isOpen) {
      handleReset();
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-full bg-white dark:bg-slate-900 border-none shadow-2xl p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
              <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Interview Preparation
              </DialogTitle>
              <p className="text-sm text-slate-500">
                {job?.title} at {job?.company?.name || "our company"}
              </p>
            </div>
          </div>
          {!isCompleted && questionNumber > 0 && (
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium px-3 py-1 rounded-full">
              Question {questionNumber}/5
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 p-6 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
          <div className="h-[400px] overflow-y-auto flex flex-col gap-4 pr-2 custom-scrollbar">
            {messages.length === 0 && !isStarting && (
              <div className="m-auto text-center space-y-4 max-w-sm">
                <div className="bg-purple-100 dark:bg-purple-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Bot className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Ready to Practice?
                </h3>
                <p className="text-slate-500 text-sm">
                  AI will interview you for the {job?.title} role based on your profile and the job requirements.
                </p>
                <Button 
                  onClick={handleStart}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 w-full mt-4 font-medium transition-all shadow-md shadow-purple-500/20"
                >
                  <Play className="mr-2 h-4 w-4" fill="currentColor" />
                  Start Interview
                </Button>
              </div>
            )}

            {isStarting && (
              <div className="m-auto text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto" />
                <p className="text-slate-500 font-medium">Preparing your interview...</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'candidate' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}>
                {msg.role === 'system' ? (
                  <span className="text-xs font-medium text-slate-400 bg-slate-200/50 dark:bg-slate-800 rounded-full px-4 py-1.5 my-2">
                    {msg.text}
                  </span>
                ) : (
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'candidate' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 shadow-sm ${msg.role === 'candidate' ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600' : 'bg-purple-600 text-white'}`}>
                      {msg.role === 'candidate' ? (
                        <div className="w-4 h-4 bg-purple-600 dark:bg-purple-400 rounded-full opacity-50" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                      msg.role === 'candidate' 
                        ? 'bg-purple-600 text-white rounded-2xl rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%] flex-row">
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 shadow-sm bg-purple-600 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm min-h-[44px]">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            {isCompleted && score !== null && (
              <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-slate-800 border border-purple-100 dark:border-purple-800/30 rounded-2xl p-6 my-4 text-center shadow-lg shadow-purple-500/5 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white dark:bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-purple-50 dark:border-purple-800/20">
                  <Trophy className="text-purple-500 h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2">Interview Complete!</h3>
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 my-4">
                  {score}<span className="text-2xl text-slate-400 font-bold">/10</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-medium mb-6">
                  {score >= 8 ? "Excellent performance! 🎉" : 
                   score >= 6 ? "Good job! Keep practicing 👍" : 
                   score >= 4 ? "Fair attempt. More practice needed 📚" : 
                   "Keep practicing, you'll improve! 💪"}
                </p>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="bg-white dark:bg-slate-800 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-800 rounded-xl px-6 h-11"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Practice Again
                </Button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!isCompleted && questionNumber > 0 && (
            <div className="mt-4 flex gap-2 items-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <textarea
                placeholder="Type your answer here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm p-3 min-h-[48px] max-h-32 transition-all disabled:opacity-50"
                rows={1}
                style={{ height: 'auto' }}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                size="icon"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 w-12 shrink-0 transition-all disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewChatbot;
