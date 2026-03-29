import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    -- Update Daily Statistics View to use system_wallet_transactions for revenue calculation
    -- This migration updates the revenue_vnd calculation to use commission_collect transactions

    CREATE OR REPLACE VIEW daily_statistics_view AS
    SELECT 
        DATE(stats_date) AS date,
        
        -- Revenue calculation (VND) from system_wallet_transactions with commission_collect
        COALESCE(
            (SELECT SUM(swt.amount) 
             FROM system_wallet_transactions swt 
             WHERE swt.transaction_type = 'commission_collect'
             AND swt.status = 'success'
             AND DATE(swt.created_at) = DATE(stats_date)), 0
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

    -- Update comments for documentation
    COMMENT ON VIEW daily_statistics_view IS 'Daily statistics view for dashboard reporting - updated to use system_wallet_transactions for revenue calculation';
    COMMENT ON COLUMN daily_statistics_view.revenue_vnd IS 'Total revenue in VND from commission_collect transactions with success status';
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    -- Rollback to previous revenue calculation using payments table
    CREATE OR REPLACE VIEW daily_statistics_view AS
    SELECT 
        DATE(stats_date) AS date,
        
        -- Revenue calculation (VND) from paid payments (rollback)
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

    -- Restore original comments
    COMMENT ON VIEW daily_statistics_view IS 'Daily statistics view for dashboard reporting - excludes difference columns and report metadata from original CSV';
    COMMENT ON COLUMN daily_statistics_view.revenue_vnd IS 'Total revenue in VND from completed payments';
  `);
}
