import { useState, useCallback, useRef } from 'react';
import type { Message } from '../types';
import { sendChatMessage } from '../services/api';

// 生成唯一的用户 ID（持久化到 localStorage）
const getOrCreateUserId = (): string => {
  let userId = localStorage.getItem('chat_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('chat_user_id', userId);
  }
  return userId;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取或创建用户 ID
  const userId = useRef(getOrCreateUserId());

  const messagesRef = useRef(messages);

  // Update ref when messages change
  const updateMessages = (newMessages: Message[]) => {
    messagesRef.current = newMessages;
    setMessages(newMessages);
  };

  const sendMessage = useCallback(
    async (content: string) => {
      setError(null);
      setIsLoading(true);

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      const newMessages = [...messagesRef.current, userMessage];
      updateMessages(newMessages);

      // Create assistant message placeholder
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      updateMessages([...newMessages, assistantMessage]);

      // Convert messages to API format
      const history = newMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      try {
        let fullResponse = '';

        await sendChatMessage(
          {
            message: content,
            user_id: userId.current,  // 添加用户 ID
            history,
          },
          {
            onChunk: (chunk: string) => {
              fullResponse += chunk;
              updateMessages(
                messagesRef.current.map((msg) =>
                  msg.id === assistantMessage.id
                    ? { ...msg, content: fullResponse }
                    : msg,
                ),
              );
            },
            onComplete: () => {
              setIsLoading(false);
            },
            onError: (err: Error) => {
              setError(err.message);
              setIsLoading(false);
            },
          },
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    },
    [messages],
  );

  const clearMessages = useCallback(() => {
    updateMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    error,
  };
}
