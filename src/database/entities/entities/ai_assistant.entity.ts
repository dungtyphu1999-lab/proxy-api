export interface AIAssistant {
  id: string;
  provider: 'gemini' | 'openai' | 'claude';
  model: string;
  api_key: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
