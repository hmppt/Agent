import { useState, FormEvent, KeyboardEvent, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-end gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-3xl shadow-xl transition-all duration-300 overflow-hidden">
            {/* Attachment Button */}
            <button
              type="button"
              className="p-3 hover:bg-white/10 rounded-2xl transition-all duration-200 group"
              title="附件（即将推出）"
            >
              <Paperclip className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>

            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="发送消息给 AI..."
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none px-2 py-4 max-h-[200px] focus:outline-none disabled:cursor-not-allowed text-base"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={disabled || !input.trim()}
              className={`p-3 rounded-2xl transition-all duration-200 m-2 ${
                disabled || !input.trim()
                  ? 'bg-white/5 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105'
              }`}
              aria-label="Send message"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-3 px-4">
            <p className="text-xs text-gray-500">
              AI 可能产生错误信息，重要内容请核实。
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
