import { Sparkles, MessageSquare, Code, PenTool, Zap, Shield, TrendingUp } from 'lucide-react';

export function WelcomeScreen() {
  const examples = [
    {
      icon: MessageSquare,
      title: '开始对话',
      description: '"帮我解释一下量子计算"',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code,
      title: '编程助手',
      description: '"写一个 Python 快速排序"',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: PenTool,
      title: '创意写作',
      description: '"帮我写一封感谢信"',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="h-full flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-4xl w-full">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12 animate-fadeIn">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/40">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="mt-8 text-3xl sm:text-4xl font-semibold text-white text-center mb-3">
            你好，我是 AI 助手
          </h1>

          <p className="text-gray-400 text-center text-sm sm:text-base max-w-md">
            基于最新的人工智能技术，随时为你提供帮助
          </p>
        </div>

        {/* Example Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {examples.map((example, index) => {
            const Icon = example.icon;
            return (
              <button
                key={index}
                className="group relative p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-3xl transition-all duration-300 text-left hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${example.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {example.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Zap,
              title: '实时响应',
              description: '毫秒级响应速度',
              color: 'text-yellow-400',
            },
            {
              icon: Shield,
              title: '隐私保护',
              description: '端到端加密',
              color: 'text-green-400',
            },
            {
              icon: TrendingUp,
              title: '持续学习',
              description: '不断优化体验',
              color: 'text-blue-400',
            },
            {
              icon: MessageSquare,
              title: '多轮对话',
              description: '记住对话历史',
              color: 'text-purple-400',
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${feature.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
