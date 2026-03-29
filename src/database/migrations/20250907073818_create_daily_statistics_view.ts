import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    -- Daily Statistics View Migration
    -- This view provides daily statistics for dashboard reporting
    -- Based on dashboard-statistics CSV structure excluding difference columns

    CREATE OR REPLACE VIEW daily_statistics_view AS
    SELECT 
        DATE(stats_date) AS date,
        
        -- Revenue calculation (VND) from paid payments
        COALESCE(
            (SELECT SUM(p.amount) 
             FROM payments p 
             WHERE p.status = 'paid' 
             AND DATE(p.paid_at) = DATE(stats_date)
             AND p.reference_type = 'order'), 0
        ) AS revenue_vnd,
        
        -- Total orders count (pending and completed)
        COALESCE(
            (SELECT COUNT(*) 
             FROM orders o 
             WHERE DATE(o.created_at) = DATE(stats_date)
             AND o.status IN ('pending', 'completed')), 0
        ) AS total_orders,
        
        -- Total blog posts count
        COALESCE(
            (SELECT COUNT(*) 
             FROM blog_posts bp 
             WHERE DATE(bp.created_at) = DATE(stats_date)), 0
        ) AS total_blog_posts,
        
        -- Published blog posts count (approved)
        COALESCE(
            (SELECT COUNT(*) 
             FROM blog_posts bp 
             WHERE DATE(bp.created_at) = DATE(stats_date)
             AND bp.status = 'published'), 0
        ) AS blog_posts_published,
        
        -- Pending blog posts count
        COALESCE(
            (SELECT COUNT(*) 
             FROM blog_posts bp 
             WHERE DATE(bp.created_at) = DATE(stats_date)
             AND bp.status = 'pending'), 0
        ) AS blog_posts_pending,
        
        -- New users count (verified users only)
        COALESCE(
            (SELECT COUNT(*) 
             FROM users u 
             WHERE DATE(u.created_at) = DATE(stats_date)
             AND u.is_verified = true), 0
        ) AS new_users,
        
        -- Total complaints count
        COALESCE(
            (SELECT COUNT(*) 
             FROM order_complaints oc 
             WHERE DATE(oc.created_at) = DATE(stats_date)), 0
        ) AS total_complaints,
        
        -- Resolved complaints count
        COALESCE(
            (SELECT COUNT(*) 
             FROM order_complaints oc 
             WHERE DATE(oc.created_at) = DATE(stats_date)
             AND oc.status = 'resolved'), 0
        ) AS complaints_resolved,
        
        -- Processing complaints count (investigating status)
        COALESCE(
            (SELECT COUNT(*) 
             FROM order_complaints oc 
             WHERE DATE(oc.created_at) = DATE(stats_date)
             AND oc.status = 'investigating'), 0
        ) AS complaints_processing,
        
        -- Rejected/Dismissed complaints count
        COALESCE(
            (SELECT COUNT(*) 
             FROM order_complaints oc 
             WHERE DATE(oc.created_at) = DATE(stats_date)
             AND oc.status = 'dismissed'), 0
        ) AS complaints_rejected,
        
        -- Total shops count
        COALESCE(
            (SELECT COUNT(*) 
             FROM shops s 
             WHERE DATE(s.created_at) = DATE(stats_date)), 0
        ) AS total_shops,
        
        -- Active shops count (not suspended)
        COALESCE(
            (SELECT COUNT(*) 
             FROM shops s 
             WHERE DATE(s.created_at) = DATE(stats_date)
             AND s.is_suspended = false), 0
        ) AS shops_active,
        
        -- Pending shops count (from shop_requests)
        COALESCE(
            (SELECT COUNT(*) 
             FROM shop_requests sr 
             WHERE DATE(sr.created_at) = DATE(stats_date)
             AND sr.status = 'pending'), 0
        ) AS shops_pending,
        
        -- Suspended shops count
        COALESCE(
            (SELECT COUNT(*) 
             FROM shops s 
             WHERE DATE(s.created_at) = DATE(stats_date)
             AND s.is_suspended = true), 0
        ) AS shops_suspended,
        
        -- Total products count
        COALESCE(
            (SELECT COUNT(*) 
             FROM products p 
             WHERE DATE(p.created_at) = DATE(stats_date)), 0
        ) AS total_products,
        
        -- Approved products count (live state)
        COALESCE(
            (SELECT COUNT(*) 
             FROM products p 
             WHERE DATE(p.created_at) = DATE(stats_date)
             AND p.state = 'live'), 0
        ) AS products_approved,
        
        -- Pending products count
        COALESCE(
            (SELECT COUNT(*) 
             FROM products p 
             WHERE DATE(p.created_at) = DATE(stats_date)
             AND p.state = 'pending'), 0
        ) AS products_pending,
        
        -- Rejected products count (from product versions)
        COALESCE(
            (SELECT COUNT(*) 
             FROM products p 
             JOIN product_versions pv ON p.pending_version_id = pv.id
             WHERE DATE(p.created_at) = DATE(stats_date)
             AND pv.status = 'rejected'), 0
        ) AS products_rejected

    FROM (
        -- Generate date series for the statistics
        -- This ensures we have a row for each date even if no data exists
        SELECT 
            DATE(generate_series(
                (SELECT MIN(created_at)::date FROM users), 
                CURRENT_DATE, 
                interval '1 day'
            )) AS stats_date
    ) AS date_series

    ORDER BY date DESC;

    -- Comments for documentation
    COMMENT ON VIEW daily_statistics_view IS 'Daily statistics view for dashboard reporting - excludes difference columns and report metadata from original CSV';
    COMMENT ON COLUMN daily_statistics_view.date IS 'Statistics date (YYYY-MM-DD format)';
    COMMENT ON COLUMN daily_statistics_view.revenue_vnd IS 'Total revenue in VND from completed payments';
    COMMENT ON COLUMN daily_statistics_view.total_orders IS 'Total orders (pending + completed)';
    COMMENT ON COLUMN daily_statistics_view.total_blog_posts IS 'Total blog posts created on this date';
    COMMENT ON COLUMN daily_statistics_view.blog_posts_published IS 'Blog posts with published status';
    COMMENT ON COLUMN daily_statistics_view.blog_posts_pending IS 'Blog posts with pending status';
    COMMENT ON COLUMN daily_statistics_view.new_users IS 'New verified users registered on this date';
    COMMENT ON COLUMN daily_statistics_view.total_complaints IS 'Total complaints created on this date';
    COMMENT ON COLUMN daily_statistics_view.complaints_resolved IS 'Complaints with resolved status';
    COMMENT ON COLUMN daily_statistics_view.complaints_processing IS 'Complaints with investigating status';
    COMMENT ON COLUMN daily_statistics_view.complaints_rejected IS 'Complaints with dismissed status';
    COMMENT ON COLUMN daily_statistics_view.total_shops IS 'Total shops created on this date';
    COMMENT ON COLUMN daily_statistics_view.shops_active IS 'Active shops (not suspended)';
    COMMENT ON COLUMN daily_statistics_view.shops_pending IS 'Shop requests with pending status';
    COMMENT ON COLUMN daily_statistics_view.shops_suspended IS 'Suspended shops';
    COMMENT ON COLUMN daily_statistics_view.total_products IS 'Total products created on this date';
    COMMENT ON COLUMN daily_statistics_view.products_approved IS 'Products with live state';
    COMMENT ON COLUMN daily_statistics_view.products_pending IS 'Products with pending state';
    COMMENT ON COLUMN daily_statistics_view.products_rejected IS 'Products with rejected product versions';
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`DROP VIEW IF EXISTS daily_statistics_view;`);
}
