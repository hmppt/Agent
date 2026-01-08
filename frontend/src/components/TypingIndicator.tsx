import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="py-8 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Bot className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Typing Animation */}
          <div className="flex-1 flex items-center">
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s] shadow-lg shadow-violet-500/50"></span>
              <span className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s] shadow-lg shadow-violet-500/50"></span>
              <span className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce shadow-lg shadow-violet-500/50"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
