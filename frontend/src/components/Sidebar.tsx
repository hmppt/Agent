import { X, Plus, MessageSquare, Clock } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const conversations = [
    { id: 1, title: '关于 AI 的问题', time: '2小时前' },
    { id: 2, title: 'Python 编程助手', time: '昨天' },
    { id: 3, title: '写作建议和修改', time: '3天前' },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-gray-900/95 backdrop-blur-xl
          transform transition-transform duration-300 ease-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">对话历史</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 mb-3 text-sm text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
              <Plus className="w-5 h-5" />
              <span className="font-medium">新对话</span>
            </button>

            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-gray-500">今天</div>
              {conversations.slice(0, 1).map((conv) => (
                <button
                  key={conv.id}
                  className="w-full flex items-start gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 group text-left"
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500 group-hover:text-violet-400 transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{conv.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{conv.time}</p>
                  </div>
                </button>
              ))}

              <div className="px-3 py-2 mt-4 text-xs font-medium text-gray-500">过去 7 天</div>
              {conversations.slice(1).map((conv) => (
                <button
                  key={conv.id}
                  className="w-full flex items-start gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 group text-left"
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500 group-hover:text-violet-400 transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{conv.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {conv.time}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:bg-gray-900/50 lg:border-r lg:border-white/5">
        <div className="flex-1 overflow-y-auto p-3">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 mb-4 text-sm text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
            <Plus className="w-5 h-5" />
            <span className="font-medium">新对话</span>
          </button>

          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-medium text-gray-500">今天</div>
            {conversations.slice(0, 1).map((conv) => (
              <button
                key={conv.id}
                className="w-full flex items-start gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 group text-left"
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500 group-hover:text-violet-400 transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{conv.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{conv.time}</p>
                </div>
              </button>
            ))}

            <div className="px-3 py-2 mt-4 text-xs font-medium text-gray-500">过去 7 天</div>
            {conversations.slice(1).map((conv) => (
              <button
                key={conv.id}
                className="w-full flex items-start gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 group text-left"
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-500 group-hover:text-violet-400 transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{conv.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {conv.time}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
