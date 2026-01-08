import { Menu, Trash2, Sparkles } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onClear: () => void;
  isMenuOpen: boolean;
  hasMessages: boolean;
}

export function Header({ onMenuClick, onClear, hasMessages }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-6 border-b border-white/5 bg-white/5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-white">AI Chat</h1>
            <p className="text-xs text-gray-400 hidden sm:block">智能对话助手</p>
          </div>
        </div>
      </div>

      {hasMessages && (
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
        >
          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">清空对话</span>
        </button>
      )}
    </header>
  );
}
