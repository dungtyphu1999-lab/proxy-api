"use strict";
/**
 * Notification templates for consistent messaging across the application
 * This ensures title and message are synchronized between database records and emitted events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_COMPLAINT_NOTIFICATION_TEMPLATES = exports.ADMIN_NOTIFICATION_TEMPLATES = exports.BLOG_USER_NOTIFICATION_TEMPLATES = exports.PRODUCT_NOTIFICATION_TEMPLATES = exports.WALLET_NOTIFICATION_TEMPLATES = exports.SHOP_REQUEST_NOTIFICATION_TEMPLATES = exports.BLOG_NOTIFICATION_TEMPLATES = exports.LINK_URL_TEMPLATES = void 0;
var currency_1 = require("../helpers/currency");
/**
 * Link URL templates for admin notifications
 */
exports.LINK_URL_TEMPLATES = {
    BLOG_POSTS: '/management/moderation?tab=blog_posts',
    SHOPS: '/management/moderation?tab=shops',
    PRODUCTS: '/management/moderation?tab=products',
    WITHDRAWAL_REQUESTS: '/management/moderation?tab=withdrawal_requests',
    SUPPORT_EMAIL: '/supports/email',
};
/**
 * Blog notification templates
 */
exports.BLOG_NOTIFICATION_TEMPLATES = {
    STATUS_CHANGED: function (data) {
        var isApproved = data.status === 'duyệt và xuất bản';
        var isRejected = data.status === 'từ chối';
        if (isApproved) {
            return {
                title: 'Bài viết của bạn đã được duyệt',
                message: "B\u00E0i vi\u1EBFt ".concat(data.blogTitle, " \u0111\u00E3 \u0111\u01B0\u1EE3c duy\u1EC7t v\u00E0 hi\u1EC3n th\u1ECB tr\u00EAn h\u1EC7 th\u1ED1ng."),
            };
        }
        else if (isRejected) {
            return {
                title: 'Bài viết của bạn chưa được duyệt',
                message: "R\u1EA5t ti\u1EBFc, b\u00E0i vi\u1EBFt ".concat(data.blogTitle, " ch\u01B0a \u0111\u01B0\u1EE3c duy\u1EC7t. L\u00FD do: ").concat(data.approvalNotes || 'Không có lý do cụ thể'),
            };
        }
        else {
            return {
                title: 'Trạng thái bài viết đã thay đổi',
                message: "B\u00E0i vi\u1EBFt ".concat(data.blogTitle, " \u0111\u00E3 \u0111\u01B0\u1EE3c ").concat(data.status),
            };
        }
    },
};
/**
 * Shop request notification templates
 */
exports.SHOP_REQUEST_NOTIFICATION_TEMPLATES = {
    STATUS_CHANGED: function (data) {
        var isApproved = data.status === 'duyệt';
        var isRejected = data.status === 'từ chối';
        if (isApproved) {
            return {
                title: 'Cửa hàng của bạn đã được duyệt',
                message: "Ch\u00FAc m\u1EEBng! C\u1EEDa h\u00E0ng ".concat(data.storeName, " \u0111\u00E3 \u0111\u01B0\u1EE3c duy\u1EC7t v\u00E0 ch\u00EDnh th\u1EE9c ho\u1EA1t \u0111\u1ED9ng"),
            };
        }
        else if (isRejected) {
            return {
                title: 'Cửa hàng của bạn chưa được duyệt',
                message: "R\u1EA5t ti\u1EBFc, c\u1EEDa h\u00E0ng ".concat(data.storeName, " c\u1EE7a b\u1EA1n ch\u01B0a \u0111\u01B0\u1EE3c duy\u1EC7t. L\u00FD do: ").concat((data === null || data === void 0 ? void 0 : data.note) || ''),
            };
        }
        else {
            return {
                title: 'Trạng thái yêu cầu shop đã thay đổi',
                message: "Y\u00EAu c\u1EA7u t\u1EA1o shop c\u1EE7a b\u1EA1n \u0111\u00E3 \u0111\u01B0\u1EE3c ".concat(data.status),
            };
        }
    },
};
/**
 * Wallet transaction notification templates
 */
exports.WALLET_NOTIFICATION_TEMPLATES = {
    STATUS_CHANGED: function (data) {
        var isApproved = data.status === 'success';
        var isRejected = data.status === 'failed';
        if (isApproved) {
            return {
                title: 'Yêu cầu rút tiền của bạn đã được duyệt',
                message: "B\u1EA1n \u0111\u00E3 r\u00FAt th\u00E0nh c\u00F4ng ".concat((0, currency_1.formatCurrency)(String(data.amount)), " v\u1EC1 t\u00E0i kho\u1EA3n ").concat(data.bankName, " - ").concat(data.bankNumber, "."),
                link_url: "/wallet/history",
            };
        }
        else if (isRejected) {
            return {
                title: 'Yêu cầu rút tiền của bạn chưa được duyệt',
                message: "Y\u00EAu c\u1EA7u r\u00FAt ti\u1EC1n ".concat((0, currency_1.formatCurrency)(String(data.amount)), " \u0111\u00E3 b\u1ECB t\u1EEB ch\u1ED1i. L\u00FD do: ").concat(data.reason || ''),
                link_url: "/wallet/history",
            };
        }
        else {
            return {
                title: 'Trạng thái yêu cầu rút tiền đã thay đổi',
                message: "Y\u00EAu c\u1EA7u r\u00FAt ti\u1EC1n ".concat((0, currency_1.formatCurrency)(String(data.amount)), " c\u1EE7a b\u1EA1n \u0111\u00E3 \u0111\u01B0\u1EE3c ").concat(data.status),
                link_url: "/wallet/history",
            };
        }
    },
};
/**
 * Product notification templates
 */
exports.PRODUCT_NOTIFICATION_TEMPLATES = {
    STATUS_CHANGED: function (data) {
        var isApproved = data.action === 'approved';
        var isRejected = data.action === 'rejected';
        if (isApproved) {
            return {
                title: 'Sản phẩm của bạn đã được duyệt',
                message: "S\u1EA3n ph\u1EA9m ".concat(data.productName, " \u0111\u00E3 \u0111\u01B0\u1EE3c duy\u1EC7t v\u00E0 s\u1EB5n s\u00E0ng \u0111\u1EC3 b\u00E1n."),
                link_url: '/my-shop/products/live',
            };
        }
        else if (isRejected) {
            return {
                title: 'Sản phẩm của bạn chưa được duyệt',
                message: "S\u1EA3n ph\u1EA9m ".concat(data.productName, " ch\u01B0a \u0111\u01B0\u1EE3c duy\u1EC7t. L\u00FD do: ").concat(data.reason || 'Không có lý do cụ thể'),
                link_url: '/my-shop/products/rejected',
            };
        }
        else {
            return {
                title: 'Trạng thái sản phẩm đã thay đổi',
                message: "S\u1EA3n ph\u1EA9m ".concat(data.productName, " \u0111\u00E3 \u0111\u01B0\u1EE3c ").concat(data.action),
                link_url: '/my-shop/products/live',
            };
        }
    },
};
/**
 * Blog user notification templates (for blog authors)
 */
exports.BLOG_USER_NOTIFICATION_TEMPLATES = {
    BLOG_LIKED: function (blogTitle, userName) { return ({
        title: 'Có một yêu thích vào bài viết của bạn',
        message: "B\u00E0i vi\u1EBFt ".concat(blogTitle, " v\u1EEBa nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t y\u00EAu th\u00EDch t\u1EEB ").concat(userName),
        link_url: undefined,
    }); },
    BLOG_COMMENTED: function (blogTitle, userName) { return ({
        title: 'Có một bình luận vào bài viết của bạn',
        message: "B\u00E0i vi\u1EBFt ".concat(blogTitle, " v\u1EEBa nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t b\u00ECnh lu\u1EADn t\u1EEB ").concat(userName),
        link_url: undefined,
    }); },
    BLOG_COMMENT_REPLIED: function (blogTitle, userName) { return ({
        title: 'Có một phản hồi cho bình luận của bạn',
        message: "B\u00E0i vi\u1EBFt ".concat(blogTitle, " v\u1EEBa nh\u1EADn \u0111\u01B0\u1EE3c m\u1ED9t ph\u1EA3n h\u1ED3i t\u1EEB ").concat(userName),
        link_url: undefined,
    }); },
};
/**
 * Admin notification templates (for admin users)
 */
exports.ADMIN_NOTIFICATION_TEMPLATES = {
    BLOG_CREATED: function (blogTitle, userName) { return ({
        title: 'Có một yêu cầu tạo bài viết',
        message: "Ng\u01B0\u1EDDi d\u00F9ng ".concat(userName, " \u0111\u00E3 g\u1EEDi y\u00EAu c\u1EA7u \u0111\u0103ng b\u00E0i vi\u1EBFt: ").concat(blogTitle, "."),
        link_url: exports.LINK_URL_TEMPLATES.BLOG_POSTS,
    }); },
    BLOG_UPDATED: function (blogTitle, userName) { return ({
        title: 'Có một yêu cầu cập nhật bài viết',
        message: "Ng\u01B0\u1EDDi d\u00F9ng ".concat(userName, " \u0111\u00E3 g\u1EEDi y\u00EAu c\u1EA7u c\u1EADp nh\u1EADt l\u1EA1i b\u00E0i vi\u1EBFt: ").concat(blogTitle, "."),
        link_url: exports.LINK_URL_TEMPLATES.BLOG_POSTS,
    }); },
    SHOP_REQUEST_CREATED: function (userName) { return ({
        title: 'Có một yêu cầu tạo cửa hàng mới',
        message: "Ng\u01B0\u1EDDi d\u00F9ng ".concat(userName, " \u0111\u00E3 g\u1EEDi y\u00EAu c\u1EA7u t\u1EA1o c\u1EEDa h\u00E0ng m\u1EDBi."),
        link_url: exports.LINK_URL_TEMPLATES.SHOPS,
    }); },
    WITHDRAW_REQUEST_CREATED: function (userName, amount, bankName, bankNumber) { return ({
        title: 'Có một yêu cầu rút tiền mới',
        message: "Ng\u01B0\u1EDDi d\u00F9ng ".concat(userName, " \u0111\u00E3 g\u1EEDi y\u00EAu c\u1EA7u r\u00FAt ti\u1EC1n ").concat(amount.toLocaleString('vi-VN'), " VN\u0110 t\u00E0i kho\u1EA3n ").concat(bankName, " - ").concat(bankNumber, "."),
        link_url: exports.LINK_URL_TEMPLATES.WITHDRAWAL_REQUESTS,
    }); },
    PRODUCT_CREATED: function (userName, productName) { return ({
        title: 'Có một yêu cầu tạo sản phẩm',
        message: "Ng\u01B0\u1EDDi d\u00F9ng ".concat(userName, " \u0111\u00E3 g\u1EEDi y\u00EAu c\u1EA7u t\u1EA1o s\u1EA3n ph\u1EA9m: ").concat(productName, "."),
        link_url: exports.LINK_URL_TEMPLATES.PRODUCTS,
    }); },
    PRODUCT_UPDATED: function (userName, productName) { return ({
        title: 'Có một yêu cầu cập nhật sản phẩm',
        message: "Ng\u01B0\u1EDDi d\u00F9ng ".concat(userName, " \u0111\u00E3 g\u1EEDi y\u00EAu c\u1EA7u c\u1EADp nh\u1EADt l\u1EA1i s\u1EA3n ph\u1EA9m: ").concat(productName, "."),
        link_url: exports.LINK_URL_TEMPLATES.PRODUCTS,
    }); },
    SUPPORT_CONTACT_CREATED: function (userName) { return ({
        title: 'Có một yêu cầu hỗ trợ mới',
        message: "Ng\u01B0\u1EDDi d\u00F9ng ".concat(userName, " \u0111\u00E3 g\u1EEDi m\u1ED9t y\u00EAu c\u1EA7u h\u1ED7 tr\u1EE3. Vui l\u00F2ng ki\u1EC3m tra v\u00E0 ph\u1EA3n h\u1ED3i."),
        link_url: exports.LINK_URL_TEMPLATES.SUPPORT_EMAIL,
    }); },
    PRODUCT_REVIEW_CREATED: function (itemName, rating, userName, productSlug, categorySlug) { return ({
        title: 'Có một đánh giá mới cho sản phẩm của bạn',
        message: "S\u1EA3n ph\u1EA9m ".concat(itemName, " v\u1EEBa nh\u1EADn \u0111\u01B0\u1EE3c \u0111\u00E1nh gi\u00E1 ").concat(rating, "\u2605 t\u1EEB ").concat(userName, "."),
        link_url: "/product/".concat(categorySlug, "/").concat(productSlug),
    }); },
};
/**
 * Order complaint notification templates
 */
exports.ORDER_COMPLAINT_NOTIFICATION_TEMPLATES = {
    COMPLAINT_CREATED_FOR_SHOP: function (orderNumber) { return ({
        title: 'Bạn có khiếu nại mới',
        message: "\u0110\u01A1n h\u00E0ng #".concat(orderNumber, " c\u00F3 khi\u1EBFu n\u1EA1i m\u1EDBi t\u1EEB kh\u00E1ch h\u00E0ng. Vui l\u00F2ng ki\u1EC3m tra v\u00E0 ph\u1EA3n h\u1ED3i."),
        link_url: undefined, // Will be set dynamically
    }); },
    SHOP_RESPONDED_TO_USER: function (orderNumber) { return ({
        title: 'Cửa hàng đã phản hồi khiếu nại của bạn',
        message: "C\u1EEDa h\u00E0ng \u0111\u00E3 ph\u1EA3n h\u1ED3i khi\u1EBFu n\u1EA1i cho \u0111\u01A1n h\u00E0ng #".concat(orderNumber, ". Vui l\u00F2ng ki\u1EC3m tra ph\u1EA3n h\u1ED3i."),
        link_url: undefined, // Will be set dynamically
    }); },
};
