/** Message type for chat. */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

/** API request/response types. */
export interface ChatRequest {
  message: string;
  history?: Array<{ role: string; content: string }>;
}

export interface ChatResponse {
  response: string;
}
