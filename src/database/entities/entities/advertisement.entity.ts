export type AdvertisementType = 'image' | 'video' | 'html';

export interface Advertisement {
  id: string;
  title: string;
  placement: string; // 'home_banner', 'wallet_sidebar', 'transaction_popup'
  content_type: AdvertisementType;
  media_url?: string;
  html_content?: string;
  click_url?: string;
  display_order: number;
  impressions: number;
  clicks: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
