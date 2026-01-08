import type { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`py-8 ${isUser ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shadow-lg ${
              isUser
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/30'
                : 'bg-gradient-to-br from-violet-500 to-purple-500 shadow-purple-500/30'
            }`}>
              {isUser ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <div className="text-white text-base sm:text-lg leading-relaxed">
              {isUser ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <div className="group relative my-4">
                          <div className="absolute -top-3 right-3 px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {match[1]}
                          </div>
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              margin: '0',
                              borderRadius: '1rem',
                              fontSize: '0.875rem',
                              background: 'rgba(0, 0, 0, 0.3)',
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          className="px-2 py-1 bg-white/10 rounded-lg text-sm font-mono border border-white/10"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    p({ children }: any) {
                      return <p className="mb-4 last:mb-0">{children}</p>;
                    },
                    ul({ children }: any) {
                      return <ul className="space-y-2 mb-4 list-none">{children}</ul>;
                    },
                    ol({ children }: any) {
                      return <ol className="space-y-2 mb-4 list-decimal list-inside">{children}</ol>;
                    },
                    li({ children }: any) {
                      return <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-1">•</span>
                        <span>{children}</span>
                      </li>;
                    },
                    h1({ children }: any) {
                      return <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>;
                    },
                    h2({ children }: any) {
                      return <h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>;
                    },
                    h3({ children }: any) {
                      return <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>;
                    },
                    blockquote({ children }: any) {
                      return (
                        <blockquote className="border-l-4 border-violet-500/30 pl-4 italic my-4 text-gray-300">
                          {children}
                        </blockquote>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
