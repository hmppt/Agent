import { useChat } from './hooks/useChat';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useState } from 'react';

import './index.css';

function App() {
  const { messages, sendMessage, clearMessages, isLoading, error } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onClear={clearMessages}
          isMenuOpen={sidebarOpen}
          hasMessages={messages.length > 0}
        />

        {/* Error Display */}
        {error && (
          <div className="mx-4 mt-4 p-4 bg-red-500/10 border border-red-500/30 backdrop-blur-sm rounded-2xl text-red-400 text-sm animate-slideDown">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">错误：</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Chat Container */}
        <ChatContainer messages={messages} isLoading={isLoading} />

        {/* Input */}
        <div className="flex-shrink-0">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
