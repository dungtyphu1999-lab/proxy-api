import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('page_settings', (table) => {
    // Primary Key
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    // Basic Info
    table.string('site_name', 255).notNullable().defaultTo('My Website');
    table.text('site_description').nullable();
    table.text('site_keywords').nullable();

    // Logo Settings
    table.string('header_logo_url', 500).nullable();
    table.string('footer_logo_url', 500).nullable();
    table.string('favicon_url', 500).nullable();

    // Social Media Links
    table.string('facebook_url', 500).nullable();
    table.string('telegram_url', 500).nullable();
    table.string('github_url', 500).nullable();
    table.string('twitter_url', 500).nullable();
    table.string('instagram_url', 500).nullable();
    table.string('youtube_url', 500).nullable();
    table.string('linkedin_url', 500).nullable();

    // Contact Information
    table.string('contact_email', 255).nullable();
    table.string('contact_phone', 50).nullable();
    table.text('contact_address').nullable();

    // Website Configuration
    table.boolean('maintenance_mode').notNullable().defaultTo(false);
    table.text('maintenance_message').nullable();

    // SEO Settings
    table.string('meta_title', 255).nullable();
    table.text('meta_description').nullable();
    table.string('google_analytics_id', 100).nullable();
    table.string('google_tag_manager_id', 100).nullable();

    // Footer Settings
    table.text('footer_copyright').nullable();
    table.text('footer_text').nullable();

    // Feature Toggles
    table.boolean('enable_registration').notNullable().defaultTo(true);
    table.boolean('enable_user_uploads').notNullable().defaultTo(true);
    table.boolean('enable_comments').notNullable().defaultTo(true);

    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index(['updated_at'], 'idx_page_settings_updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('page_settings');
}
