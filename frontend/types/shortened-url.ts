export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  title?: string;
  createdAt: Date;
  clicks: number;
}