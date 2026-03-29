import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('page_settings', (table) => {
    // Remove Basic Info
    table.dropColumn('site_name');
    table.dropColumn('site_description');
    table.dropColumn('site_keywords');

    // Remove favicon_url
    table.dropColumn('favicon_url');

    // Remove Social Media Links
    table.dropColumn('facebook_url');
    table.dropColumn('telegram_url');
    table.dropColumn('github_url');
    table.dropColumn('twitter_url');
    table.dropColumn('instagram_url');
    table.dropColumn('youtube_url');
    table.dropColumn('linkedin_url');

    // Remove Contact Information
    table.dropColumn('contact_email');
    table.dropColumn('contact_phone');
    table.dropColumn('contact_address');

    // Remove Website Configuration
    table.dropColumn('maintenance_mode');
    table.dropColumn('maintenance_message');

    // Remove SEO Settings
    table.dropColumn('meta_title');
    table.dropColumn('meta_description');
    table.dropColumn('google_analytics_id');
    table.dropColumn('google_tag_manager_id');

    // Remove Footer Settings
    table.dropColumn('footer_copyright');
    table.dropColumn('footer_text');

    // Remove Feature Toggles
    table.dropColumn('enable_registration');
    table.dropColumn('enable_user_uploads');
    table.dropColumn('enable_comments');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('page_settings', (table) => {
    // Restore Basic Info
    table.string('site_name', 255).notNullable().defaultTo('My Website');
    table.text('site_description').nullable();
    table.text('site_keywords').nullable();

    // Restore favicon_url
    table.string('favicon_url', 500).nullable();

    // Restore Social Media Links
    table.string('facebook_url', 500).nullable();
    table.string('telegram_url', 500).nullable();
    table.string('github_url', 500).nullable();
    table.string('twitter_url', 500).nullable();
    table.string('instagram_url', 500).nullable();
    table.string('youtube_url', 500).nullable();
    table.string('linkedin_url', 500).nullable();

    // Restore Contact Information
    table.string('contact_email', 255).nullable();
    table.string('contact_phone', 50).nullable();
    table.text('contact_address').nullable();

    // Restore Website Configuration
    table.boolean('maintenance_mode').notNullable().defaultTo(false);
    table.text('maintenance_message').nullable();

    // Restore SEO Settings
    table.string('meta_title', 255).nullable();
    table.text('meta_description').nullable();
    table.string('google_analytics_id', 100).nullable();
    table.string('google_tag_manager_id', 100).nullable();

    // Restore Footer Settings
    table.text('footer_copyright').nullable();
    table.text('footer_text').nullable();

    // Restore Feature Toggles
    table.boolean('enable_registration').notNullable().defaultTo(true);
    table.boolean('enable_user_uploads').notNullable().defaultTo(true);
    table.boolean('enable_comments').notNullable().defaultTo(true);
  });
}
