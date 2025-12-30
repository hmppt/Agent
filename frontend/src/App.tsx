import { useChat } from './hooks/useChat';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';

import './index.css';

function App() {
  const { messages, sendMessage, clearMessages, isLoading, error } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">AI Chat Agent</h1>
        <button
          onClick={clearMessages}
          disabled={messages.length === 0}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          清空对话
        </button>
      </header>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* Chat Container */}
      <ChatContainer messages={messages} />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="bg-white border-t border-gray-200 px-6 py-2 text-sm text-gray-500">
          AI 正在思考...
        </div>
      )}

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}

export default App;
