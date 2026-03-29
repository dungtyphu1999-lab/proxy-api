import { registerAs } from '@nestjs/config';

export default registerAs('blogView', () => ({
  uniqueMinutes: Number(process.env.BLOG_VIEW_UNIQUE_MINUTES) || 5,
}));
