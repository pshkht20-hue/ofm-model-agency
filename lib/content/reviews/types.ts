export type AgencyReply = {
  text: string;
  dateLabel: string;
};

export type ModelReview = {
  id: string;
  name: string;
  meta: string;
  dateLabel: string;
  text: string;
  rating: number;
  resultNote?: string;
  initials: string;
  avatarHue: number;
  tags?: string[];
  helpfulCount?: number;
  agencyReply?: AgencyReply;
  featured?: boolean;
};
