import React, { useState, useCallback } from 'react';
import ChatView from './components/ChatView';
import { Message, MessageRole } from './types';
import { getMockResponse } from './services/mockGeminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 새 대화 시작 (화면만 리셋)
  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
  };

  // V2: history 전체를 백엔드로 보내는 버전 그대로 유지
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: MessageRole.USER,
      content: inputValue.trim(),
    };

    const newHistory = [...messages, userMessage];

    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await getMockResponse(newHistory);
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

  return (
    <div className="flex flex-col h-screen font-sans text-white bg-gem-bg">
      {/* 상단 헤더 (사이드바 대신) */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="text-sm text-gem-text-secondary">
          Unreal · Unity · AR/VR 개발 챗봇
        </div>
        <button
          type="button"
          onClick={handleNewChat}
          className="px-3 py-1 text-sm rounded-full bg-gem-surface-hover hover:bg-gem-surface transition-colors"
        >
          New Chat
        </button>
      </header>

      {/* 메인 채팅 영역 */}
      <div className="flex-1">
        <ChatView
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default App;
