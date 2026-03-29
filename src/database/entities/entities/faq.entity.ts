export interface Faq {
  id: string;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}
