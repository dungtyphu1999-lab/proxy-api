import { customAlphabet } from 'nanoid';
import slugify from 'slugify';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

export function generateSlugWithId(name: string): string {
  const baseSlug = slugify(name, { lower: true, strict: true });
  return `${baseSlug}-${nanoid()}`;
}
