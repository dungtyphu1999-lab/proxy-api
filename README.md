# Proxy API — Standalone Service

Backend API độc lập cho **hệ thống dịch vụ proxy** (tách ra từ [nezhub-api](../gm-api)).

## Stack

- **Framework:** NestJS 11 + TypeScript
- **Database:** PostgreSQL + Knex.js
- **Cache:** Redis (ioredis)
- **Auth:** JWT (access + refresh tokens) + Passport.js
- **API Docs:** Swagger/OpenAPI tại `/docs`
- **Proxy Provider:** Webshare API v2

---

## Cài đặt

```bash
pnpm install        # hoặc npm install / yarn
cp .env.example .env
# Điền các biến môi trường vào .env
```

## Chạy Development

```bash
pnpm start:dev
```

Swagger UI: http://localhost:3002/docs

---

## API Endpoints

### Public (không cần auth) — `/api/v1/public/proxy`
| Method | Path | Mô tả |
|---|---|---|
| `GET` | `/countries` | Danh sách quốc gia |
| `GET` | `/proxy-products` | Danh mục sản phẩm proxy |
| `GET` | `/proxy-product-options` | Tùy chọn (exclusivity, quantity, bandwidth) |
| `GET` | `/proxy-locations` | Danh sách vị trí địa lý |
| `GET` | `/proxy-country-options` | Quốc gia khả dụng từ Webshare |
| `GET` | `/proxy-additional-features` | Tính năng bổ sung |
| `GET` | `/proxy-product-activation` | Trạng thái kích hoạt |
| `GET` | `/payment-methods` | Phương thức thanh toán |
| `POST` | `/calculate-price` | Tính giá realtime |

### User (JWT required) — `/api/v1/user/proxy`
| Method | Path | Mô tả |
|---|---|---|
| `GET` | `/proxies` | Danh sách proxy của user |
| `GET` | `/proxies/download` | Tải proxy dạng JSON/TXT |
| `GET` | `/proxy/country-filters` | Bộ lọc quốc gia đã lưu |
| `PUT` | `/proxy/country-filters` | Lưu bộ lọc quốc gia |
| `GET` | `/proxy/rotating-status` | Trạng thái gói rotating |
| `GET` | `/proxy/activation` | Trạng thái kích hoạt |
| `POST` | `/proxy/orders` | **Mua proxy** |
| `POST` | `/proxy/calculate-price` | Tính giá (theo account user) |
| `GET` | `/proxy/orders` | Lịch sử đơn proxy |
| `GET` | `/proxy/orders/:id/summary` | Chi tiết đơn |
| `GET` | `/proxy/orders/:id/transactions` | Giao dịch của đơn |
| `POST` | `/proxy/orders/:id/renew` | **Gia hạn proxy** |
| `GET` | `/proxy/transactions` | Lịch sử thanh toán |

### Auth — `/api/v1/user/auth`
| Method | Path | Mô tả |
|---|---|---|
| `POST` | `/signup` | Đăng ký |
| `POST` | `/signin` | Đăng nhập |
| `POST` | `/refresh` | Refresh token |
| `POST` | `/logout` | Đăng xuất |
| `POST` | `/forgot-password` | Quên mật khẩu |
| `POST` | `/reset-password` | Đặt lại mật khẩu |
| `POST` | `/google` | Google OAuth |

### Wallet — `/api/v1/user/wallet`
| Method | Path | Mô tả |
|---|---|---|
| `GET` | `/balance` | Số dư ví |
| `POST` | `/deposit` | Nạp tiền (Pay2S) |
| `POST` | `/deposit/webhook` | Pay2S webhook |
| `POST` | `/withdraw` | Rút tiền |
| `GET` | `/transactions` | Lịch sử giao dịch |

### Admin Webshare — `/api/v1/admin/webshare`
| Method | Path | Mô tả |
|---|---|---|
| `GET/PUT` | `/config` | Cấu hình Webshare pool |
| `GET` | `/dashboard` | Sức khỏe pool |
| `POST` | `/test-connection` | Test API key |
| `GET` | `/sub-users` | Tất cả managed orders |
| `POST` | `/sub-users/:id/refresh` | Refresh 1 đơn |
| `POST` | `/sub-users/:id/revoke` | Thu hồi 1 đơn |

---

## Database Migrations

```bash
pnpm knex:migrate        # Chạy tất cả migrations
pnpm knex:seed:proxy     # Seed dữ liệu proxy (products, options, locations)
```

---

## Cấu trúc Module

```
src/
├── app.module.ts          # Root module (proxy-only)
├── main.ts                # Bootstrap
├── config/                # Config (Zod validation)
├── database/              # Knex + PostgreSQL
├── redis/                 # Redis module
├── shared/                # Shared utils, guards, decorators
└── modules/
    ├── user/
    │   ├── auth/          # JWT authentication
    │   ├── proxy/         # Core proxy logic
    │   ├── wallet/        # Wallet (nạp/rút cho mua proxy)
    │   ├── telegram/      # Liên kết Telegram
    │   └── notification/  # Thông báo user
    ├── guest/
    │   └── proxy-master/  # Public proxy catalog + Webshare integration
    ├── webshare/          # Webshare config & credential pool
    └── admin/
        ├── webshare/      # Admin quản lý Webshare
        ├── notifications/ # Admin gửi thông báo
        └── users/         # Admin quản lý users
```

---

## Background Jobs

| Job | Lịch | Mục đích |
|---|---|---|
| `ProxyPendingOrdersScheduler` | Mỗi 1 phút | Retry các đơn proxy đang pending |
| `ProxyAutoRenewEnforcerScheduler` | Mỗi ngày 00:00 (GMT+7) | Tắt auto-renew Webshare |

---

## Webshare Integration

Hệ thống sử dụng **7 pool key** cho các loại proxy:

| Pool Key | Loại proxy |
|---|---|
| `proxy_server_shared` | Proxy server chia sẻ |
| `proxy_server_private` | Proxy server riêng (semi-dedicated) |
| `proxy_server_dedicated` | Proxy server chuyên dụng |
| `static_residential_shared` | Residential tĩnh chia sẻ |
| `static_residential_private` | Residential tĩnh riêng |
| `static_residential_dedicated` | Residential tĩnh chuyên dụng |
| `rotating_residential` | Residential rotating |

Cấu hình API key được lưu trong bảng `proxy_pools` và quản lý qua Admin API.
