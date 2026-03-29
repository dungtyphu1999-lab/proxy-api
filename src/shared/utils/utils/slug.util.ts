/**
 * SEO-optimized slug generation utility
 * Converts text to URL-friendly slugs with proper SEO practices
 */

import { BadRequestException } from '@nestjs/common';

export class SlugUtil {
  /**
   * Generate SEO-friendly slug from text
   * - Converts to lowercase
   * - Removes Vietnamese diacritics
   * - Replaces spaces and special chars with hyphens
   * - Removes consecutive hyphens
   * - Trims leading/trailing hyphens
   * - Limits length for SEO optimization
   */
  static generate(text: string, maxLength = 100): string {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return (
      text
        .toLowerCase()
        .trim()
        // Remove Vietnamese diacritics for better URL compatibility
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Replace common special characters with SEO-friendly alternatives
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
        .replace(/[ìíịỉĩ]/g, 'i')
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
        .replace(/[ùúụủũưừứựửữ]/g, 'u')
        .replace(/[ỳýỵỷỹ]/g, 'y')
        .replace(/đ/g, 'd')
        // Replace spaces and underscores with hyphens
        .replace(/[\s_]+/g, '-')
        // Remove special characters except hyphens and alphanumeric
        .replace(/[^a-z0-9-]/g, '')
        // Remove consecutive hyphens
        .replace(/-+/g, '-')
        // Remove leading and trailing hyphens
        .replace(/^-+|-+$/g, '')
        // Limit length for SEO (Google typically shows ~60 chars in URLs)
        .substring(0, maxLength)
        // Final cleanup - remove trailing hyphen if created by substring
        .replace(/-+$/, '')
    );
  }

  /**
   * Generate unique slug with counter suffix if needed
   * @param baseSlug - The base slug to make unique
   * @param checkExists - Function that returns true if slug exists
   */
  static async makeUnique(
    baseSlug: string,
    checkExists: (slug: string) => Promise<boolean>,
  ): Promise<string> {
    if (!baseSlug) {
      throw new BadRequestException('Base slug cannot be empty');
    }

    let slug = baseSlug;
    let counter = 1;

    while (await checkExists(slug)) {
      // Add counter with hyphen for readability
      slug = `${baseSlug}-${counter}`;
      counter++;

      // Prevent infinite loop with reasonable limit
      if (counter > 1000) {
        throw new BadRequestException(
          'Unable to generate unique slug after 1000 attempts',
        );
      }
    }

    return slug;
  }

  /**
   * Validate if a slug meets SEO best practices
   */
  static validate(slug: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!slug) {
      errors.push('Slug cannot be empty');
    }

    if (slug !== slug.toLowerCase()) {
      errors.push('Slug should be lowercase');
    }

    if (slug.includes(' ')) {
      errors.push('Slug should not contain spaces');
    }

    if (slug.startsWith('-') || slug.endsWith('-')) {
      errors.push('Slug should not start or end with hyphens');
    }

    if (slug.includes('--')) {
      errors.push('Slug should not contain consecutive hyphens');
    }

    if (slug.length > 100) {
      errors.push('Slug should be under 100 characters for optimal SEO');
    }

    if (!/^[a-z0-9-]*$/.test(slug)) {
      errors.push(
        'Slug should only contain lowercase letters, numbers, and hyphens',
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
