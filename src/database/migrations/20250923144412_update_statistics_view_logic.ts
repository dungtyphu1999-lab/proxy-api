import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    -- Update Daily Statistics View to match new repository logic requirements
    -- This migration updates the statistics calculations for blogs, shops, users, and products

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
        
        -- Total blog posts count (exclude draft, prioritize approved_at over created_at)
        COALESCE(
            (SELECT 
                (SELECT COUNT(*) 
                 FROM blog_posts bp1 
                 WHERE bp1.status != 'draft'
                 AND DATE(bp1.created_at) = DATE(stats_date)
                 AND bp1.approved_at IS NULL) +
                (SELECT COUNT(*) 
                 FROM blog_posts bp2 
                 WHERE bp2.status != 'draft'
                 AND DATE(bp2.approved_at) = DATE(stats_date))
            ), 0
        ) AS total_blog_posts,
        
        -- Published blog posts count (approved) - use approved_at
        COALESCE(
            (SELECT COUNT(*) 
             FROM blog_posts bp 
             WHERE DATE(bp.approved_at) = DATE(stats_date)
             AND bp.status = 'published'), 0
        ) AS blog_posts_published,
        
        -- Pending blog posts count - use created_at, exclude those with approved_at on same date
        COALESCE(
            (SELECT COUNT(*) 
             FROM blog_posts bp 
             WHERE DATE(bp.created_at) = DATE(stats_date)
             AND bp.status = 'pending'
             AND (bp.approved_at IS NULL OR DATE(bp.approved_at) != DATE(stats_date))), 0
        ) AS blog_posts_pending,
        
        -- New users count (verified users only, exclude admin users)
        COALESCE(
            (SELECT COUNT(*) 
             FROM users u 
             LEFT JOIN user_role_map urm ON u.id = urm.user_id
             WHERE DATE(u.created_at) = DATE(stats_date)
             AND (urm.role_id IS NULL OR urm.role_id != '00000000-0000-0000-0000-000000000001')), 0
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
        
        -- Total shops count (from shop_requests table)
        COALESCE(
            (SELECT COUNT(*) 
             FROM shop_requests sr 
             WHERE DATE(sr.created_at) = DATE(stats_date)), 0
        ) AS total_shops,
        
        -- Active shops count (not suspended, all active shops regardless of date)
        COALESCE(
            (SELECT COUNT(*) 
             FROM shops s 
             WHERE s.is_suspended = false), 0
        ) AS shops_active,
        
        -- Pending shops count (from shop_requests with pending status)
        COALESCE(
            (SELECT COUNT(*) 
             FROM shop_requests sr 
             WHERE DATE(sr.created_at) = DATE(stats_date)
             AND sr.status = 'pending'), 0
        ) AS shops_pending,
        
        -- Suspended shops count (use suspension_date instead of created_at)
        COALESCE(
            (SELECT COUNT(*) 
             FROM shops s 
             WHERE DATE(s.suspension_date) = DATE(stats_date)
             AND s.is_suspended = true), 0
        ) AS shops_suspended,
        
        -- Total products count (exclude deleted products)
        COALESCE(
            (SELECT COUNT(*) 
             FROM products p 
             WHERE DATE(p.created_at) = DATE(stats_date)), 0
        ) AS total_products,
        
        -- Approved products count (live OR hidden state, exclude deleted)
        COALESCE(
            (SELECT COUNT(*) 
             FROM products p 
             WHERE DATE(p.created_at) = DATE(stats_date)
             AND p.state IN ('live', 'hidden')), 0
        ) AS products_approved,
        
        -- Pending products count (exclude deleted)
        COALESCE(
            (SELECT COUNT(*) 
             FROM products p 
             WHERE DATE(p.created_at) = DATE(stats_date)
             AND p.state = 'pending'), 0
        ) AS products_pending,
        
        -- Rejected products count (from product versions, exclude deleted)
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
    COMMENT ON VIEW daily_statistics_view IS 'Daily statistics view for dashboard reporting - updated with new logic requirements for blogs, shops, users, and products';
    COMMENT ON COLUMN daily_statistics_view.total_blog_posts IS 'Total blog posts excluding draft status, prioritizing approved_at over created_at';
    COMMENT ON COLUMN daily_statistics_view.blog_posts_published IS 'Published blog posts counted by approved_at date';
    COMMENT ON COLUMN daily_statistics_view.blog_posts_pending IS 'Pending blog posts counted by created_at, excluding those approved on same date';
    COMMENT ON COLUMN daily_statistics_view.new_users IS 'New verified users excluding admin users (role_id != 00000000-0000-0000-0000-000000000001)';
    COMMENT ON COLUMN daily_statistics_view.total_shops IS 'Total shop requests created on the date';
    COMMENT ON COLUMN daily_statistics_view.shops_active IS 'All active shops (not suspended) regardless of date';
    COMMENT ON COLUMN daily_statistics_view.shops_pending IS 'Pending shop requests created on the date';
    COMMENT ON COLUMN daily_statistics_view.shops_suspended IS 'Shops suspended on the date (by suspension_date)';
    COMMENT ON COLUMN daily_statistics_view.total_products IS 'Total products created on the date, excluding deleted products';
    COMMENT ON COLUMN daily_statistics_view.products_approved IS 'Approved products (live or hidden state) created on the date, excluding deleted';
    COMMENT ON COLUMN daily_statistics_view.products_pending IS 'Pending products created on the date, excluding deleted';
    COMMENT ON COLUMN daily_statistics_view.products_rejected IS 'Rejected products created on the date, excluding deleted';
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Revert to the previous version by re-running the previous migration logic
  return knex.raw(`
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

    -- Restore original comments
    COMMENT ON VIEW daily_statistics_view IS 'Daily statistics view for dashboard reporting - updated to use system_wallet_transactions for revenue calculation';
    COMMENT ON COLUMN daily_statistics_view.revenue_vnd IS 'Total revenue in VND from commission_collect transactions with success status';
  `);
}
