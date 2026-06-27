# BuySawa Web Frontend — Backend Integration & Review Guide

**Audience:** Web frontend developers, QA, and AI coding agents (Cursor, Antigravity, etc.)  
**Backend repo:** BuySawa Laravel API  
**Last updated:** 2026-06-26  
**API version:** `/api/v1` (Sanctum bearer tokens)

---

## Purpose of this document

This guide explains **what the backend delivers today**, how to **verify your web app against the official Postman collection**, and which **flows must change** after the marketplace → single-store refactor. Use it as the contract between backend and frontend, and as instructions for AI agents implementing or reviewing the web client.

**Companion docs:**

| Document | Use when |
|----------|----------|
| `postman/BuySawa_API.postman_collection.json` | Source of truth for request/response examples (EN + AR) |
| `docs/product-share-frontend-integration.md` | Share & Earn feature in depth |
| `docs/refactor/05-breaking-api-changes.md` | Migration from old `/api/client/*` API |
| `docs/flutter-mobile-integration-guide.md` | Same backend, mobile-specific notes |

---

## 1. What the backend has completed

The backend was refactored from a **multi-vendor marketplace** into a **single-store e-commerce platform** (BuySawa sells all products via admin dashboard).

### Architecture summary

```
Web SPA (React/Vue/Next/etc.)
    │  HTTPS
    │  Headers: X-Market, Accept-Language, Authorization (when logged in)
    ▼
{APP_URL}/api/v1/*
    │  Laravel Sanctum (Bearer token, not JWT)
    │  Market context middleware (resolve.market)
    ▼
Single Store → Products → Flat Cart → Single Order Checkout
```

### Delivered capabilities

| Area | Status | Notes |
|------|--------|-------|
| Unified API `/api/v1` | ✅ Done | Old `/api/client/*` and `/api/seller/*` removed |
| Single store model | ✅ Done | `GET /store` replaces seller browsing |
| Auth (phone + OTP + password) | ✅ Done | Register → verify OTP → token |
| Firebase social login | ✅ Done | `POST /auth/firebase-login` |
| Password recovery (OTP) | ✅ Done | 4-step forgot flow |
| Product catalog + filters | ✅ Done | Search, facets, compare, variants |
| Categories & brands | ✅ Done | Public, localized (en/ar) |
| Cart (flat, no seller groups) | ✅ Done | One cart per user |
| Coupons | ✅ Done | Single store coupon, no `seller_id` |
| Checkout (single order) | ✅ Done | COD, online (Fawaterk), wallet |
| Orders list/detail/cancel | ✅ Done | Owner-only access |
| Wallet + transactions | ✅ Done | Read-only for clients |
| Favorites (wishlist) | ✅ Done | |
| Product reviews | ✅ Done | Purchase eligibility enforced |
| Product Share (Share & Earn) | ✅ Done | Referral links + wallet rewards |
| Group Buys | ✅ Done | Invite codes, tier cashback |
| CMS content | ✅ Done | Settings, about, FAQ, banners, welcome screens |
| Locations (address picker) | ✅ Done | Country → governorate → city |
| Notifications (in-app) | ✅ Done | Poll-based REST |
| FCM push hooks | ✅ Done | Send `fcm_token` on login/register |
| Payment webhooks | ✅ Done | Server-to-server only |
| Bilingual API (en/ar) | ✅ Done | `Accept-Language` header |
| Postman collection v1 | ✅ Done | 18 folders, EN/AR examples, auto-saves token |
| Feature test suite | ✅ Done | Cart, checkout, coupons, wallet, group buy, etc. |

### Explicitly NOT in the client API

- **No seller app or seller endpoints** — remove all seller UI and API calls
- **No WebSockets** — use REST polling + FCM for push
- **No subscriptions / recurring billing** — one-time checkout only
- **No general file upload API** — only optional profile image at registration
- **No multi-order checkout** — one order per `POST /checkout`

---

## 2. API contract (every web request)

### Base URL

```
{APP_URL}/api/v1
```

Example local: `http://localhost/api/v1`

### Required headers

| Header | Value | Required |
|--------|-------|----------|
| `X-Market` | Market code, e.g. `ae` | Always (except you are not calling webhooks) |
| `Accept` | `application/json` | Always |
| `Accept-Language` | `en` or `ar` | Always (drives messages + translated fields) |
| `Authorization` | `Bearer {sanctum_token}` | Protected routes only |
| `Content-Type` | `application/json` | JSON bodies |

Fallback if header missing: `?market=ae` query param (prefer header in production).

### Response envelope

```json
{
  "code": 200,
  "message": "Localized human-readable message",
  "data": {},
  "pagination": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 72
  }
}
```

- `pagination` is **top-level** (not nested inside `data`)
- HTTP status matches `code` for most responses
- **Do not** expect `"success": true` — that format is outdated in `docs/api-v1.md`

### Error envelope

```json
{
  "code": 422,
  "message": "First validation error or summary",
  "data": {
    "phone": ["The phone field is required."]
  }
}
```

Common codes: `401` unauthorized, `403` forbidden, `404` not found, `422` validation, `429` rate limit.

### Rate limits

| Route group | Limit |
|-------------|-------|
| `/auth/*` | 5 requests/min per IP + phone |
| `/coupons/validate` | 10 requests/min per IP + user |

---

## 3. Postman collection — review checklist

Import these before reviewing the web app:

```
postman/BuySawa_API.postman_collection.json
postman/BuySawa_Local.postman_environment.json   (or Staging/Production)
postman/BuySawa_Local_EN.postman_environment.json
postman/BuySawa_Local_AR.postman_environment.json
```

**Seeded test credentials (Local environment):**

| Variable | Value |
|----------|-------|
| `user_phone` | `+971501234567` |
| `user_password` | `password` |
| `market_code` | `ae` |
| `coupon_code` | `SAVE10` |

The collection auto-saves `auth_token`, `cart_item_id`, and `order_id` after successful calls.

### Folder-by-folder review map

Use this table to verify each web screen against the backend. For each row: run the Postman request, compare JSON to your app's models and UI, mark ✅ or fix.

| # | Postman folder | Web screens to verify | Auth | Critical checks |
|---|----------------|----------------------|------|-----------------|
| 01 | Setup & Health | App bootstrap, market selector | Public | Call `GET /markets/current` on load for currency, payment methods, min order, tax mode, product_share config |
| 01 | Setup & Health | Store header/footer | Public | `GET /store` — single store info (replaces seller list) |
| 02 | Authentication | Register, OTP verify, login | Guest / token | Register returns `{ phone }` only — **no token until verify-otp** |
| 02 | Authentication | Profile, logout | Token | Profile uses `UserResource` — no seller fields |
| 02 | Authentication | Firebase login | Guest | Send `id_token` from Firebase Auth SDK |
| 03 | Password Recovery | Forgot password flow | Guest | 4 steps: forgot → verify OTP → resend → reset |
| 04 | Products | Product listing, search, filters | Public | Query params: `search`, `category_id`, `brand_id`, `min_price`, `max_price`, `on_offer`, `in_stock`, `attributes[]`, `per_page` |
| 04 | Products | Product detail | Optional token | Slug-based URL; `review_eligible` when authenticated |
| 04 | Products | Compare products | Public | `GET /products/compare?ids=1,2,3` (2–4 IDs) |
| 04 | Products | Category facets | Public | `GET /products/facets?category_id=` for filter UI |
| 05 | Categories & Brands | Category nav, brand filter | Public | Categories/brands are **public** (not auth-gated) |
| 06 | Locations | Address form cascades | Public | Country → governorate → city chained selects |
| 07 | Content (CMS) | Static pages, home banners | Public | Paths under `/content/*` (not legacy `/api/settings`) |
| 07 | Content (CMS) | Contact form | Optional token | Guest must send `name`, `email`, `phone` |
| 08 | Cart | Cart page | Token | **Flat `items[]`** — remove any seller grouping UI |
| 08 | Cart | Add/update/remove | Token | Variant required when product has variants; optional `share_code` |
| 08b | Product Share | Share button, deep links | Mixed | See `docs/product-share-frontend-integration.md` |
| 09 | Coupons | Coupon field at checkout | Token | Body: `{ "code": "SAVE10" }` only — **no `seller_id`** |
| 10 | Checkout & Orders | Checkout | Token | Single order response; redirect to `payment_url` for online |
| 10 | Checkout & Orders | Order history/detail | Token | No seller block in order; filter by status |
| 10 | Checkout & Orders | Cancel order | Token | Only `pending` + unpaid orders |
| 11 | Favorites | Wishlist | Token | Standard CRUD |
| 12 | Wallet | Wallet balance + history | Token | Read-only; credits from share rewards, group buy, admin |
| 13 | Group Buys | Create/join/group checkout | Token | `group_buy_code` at checkout; mutually exclusive with coupon/share |
| 14 | Product Reviews | Reviews list + submit | Token | Requires purchase eligibility |
| 15 | Notifications | Notification center | Token | Poll `GET /notifications`; no WebSocket |
| 16 | Payment Webhooks | — | N/A | **Backend/QA only** — web app does not call these |
| 17 | Workflows | End-to-end smoke tests | Mixed | Run full purchase flows EN + AR |
| 18 | Workflow: Share & Earn | Referral journey | Mixed | Full share → cart → checkout → wallet credit path |

---

## 4. Breaking changes — web app must update

If the web app was built against the old marketplace API, apply these changes:

| Old | New | Web impact |
|-----|-----|------------|
| `/api/client/*` | `/api/v1/*` | Update API base path in env/config |
| `/api/settings`, `/api/about-us`, etc. | `/api/v1/content/*` | Remap CMS endpoints |
| `/api/countries` | `/api/v1/locations/countries` | Remap location endpoints |
| Seller browse + ratings | `GET /store` | Remove seller listing/rating pages |
| Cart `seller_groups[]` | Flat `items[]` | Simplify cart UI — one list, one subtotal |
| Checkout returns `orders[]` | Single `order` object | One confirmation screen, one payment redirect |
| `coupons: [{ seller_id, code }]` | `coupon_code: "SAVE10"` | Single coupon input |
| Coupon validate `{ seller_id, code }` | `{ code }` | Remove seller picker from coupon UI |
| Product `seller` object | Product `store` object | Update product detail components |
| Order `seller` block | Removed | Update order history cards |

Full migration list: `docs/refactor/05-breaking-api-changes.md`

---

## 5. Web-specific integration patterns

### App bootstrap (do this first)

On app load (before routing):

1. `GET /markets/current` — cache currency symbol, payment methods, min order, tax mode, phone regex, product_share settings
2. `GET /content/settings` — app name, social links, support info
3. If token in storage → `GET /auth/profile` to validate session

Store market code in app state and send `X-Market` on every request.

### Authentication flow

```
Register (POST /auth/register)
    → OTP screen (POST /auth/verify-otp) → save token
Login (POST /auth/login)
    → if HTTP 415: redirect to OTP verification (unverified account)
    → else save token + user
Optional: Firebase (POST /auth/firebase-login) with Google/Apple SDK id_token
Logout (POST /auth/logout) → clear token
```

Store Sanctum token in `localStorage` or `sessionStorage` (or httpOnly cookie if using SPA cookie mode — default is Bearer header).

### Product URLs and deep links

- Product detail: `/products/{slug}` (slug, not numeric ID)
- Share deep link: product URL + `?share={shareCode}` — read query param, pass as `share_code` when adding to cart
- Group buy invite: handle `/group-buys/invite/{inviteCode}` landing → join flow

### Checkout and online payment

```javascript
// After POST /checkout with payment_method: "online"
const paymentUrl = response.data.payment_url;
window.location.href = paymentUrl; // redirect to Fawaterk
// On return URL (configured in gateway), poll GET /orders/{id} for payment_status
```

Payment methods available for the market come from `markets/current → checkout.payment_methods`.

### Promotion exclusivity (business rule)

Only **one** promotion type per order:

| Promotion | Request field |
|-----------|---------------|
| Coupon | `coupon_code` |
| Product share | `share_code` on cart items (not checkout body) |
| Group buy | `group_buy_code` |

If user applies a coupon and cart has share discounts, backend rejects checkout — show clear UI messaging.

### Localization

- Set `Accept-Language: ar` when user selects Arabic
- Product/category names in responses are already translated — do not maintain separate translation files for catalog data
- API `message` field is localized — display it in toast/snackbar

### Images

All image fields return **full URLs** (`https://...`). Use directly in `<img src>` — no base URL concatenation needed.

### CORS

Ensure your web origin is allowed in production. Laravel default CORS applies; coordinate with backend deploy if preflight fails.

---

## 6. Key response shapes (reference)

### Cart (`GET /cart`)

```json
{
  "data": {
    "id": 1,
    "items": [
      {
        "id": 1,
        "quantity": 2,
        "subtotal": 180.0,
        "has_share_discount": true,
        "share_code": "ABC123",
        "product": { "id": 1, "name": "...", "final_price": 90.0, "main_image": "..." },
        "variant": { "id": 2, "size": "M", "color_name": "Red" }
      }
    ],
    "total_quantity": 2,
    "total_price": 180.0,
    "currency": "AED",
    "currency_symbol": "د.إ"
  }
}
```

### Order (`POST /checkout` response)

Key fields: `order_number`, `status`, `payment_method`, `payment_status`, `payment_url` (online only), `subtotal`, `discount_amount`, `shipping_fee`, `tax_amount`, `total`, `items[]`, `location{}`.

Statuses: `pending`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`.

Payment methods: `cash_on_delivery`, `online`, `wallet`.

### Product (list/detail)

Key fields: `slug`, `name`, `price`, `final_price`, `has_offer`, `main_image`, `store{}`, `category{}`, `brand{}`, `variants[]`, `in_stock`, `requires_variant_selection`, `review_eligible` (detail only, when authed).

---

## 7. Screen-by-screen review worksheet

Copy this checklist into your PR or QA ticket:

- [ ] **Env config** — `VITE_API_URL` / `NEXT_PUBLIC_API_URL` points to `/api/v1`
- [ ] **HTTP client** — sends `X-Market`, `Accept-Language`, `Authorization` interceptors
- [ ] **Response parser** — reads `code`, `message`, `data`, `pagination` (not `success`)
- [ ] **Home** — banners + welcome screens from `/content/*`
- [ ] **Catalog** — filters match Postman folder 04 query params
- [ ] **Product detail** — variant selection before add-to-cart; share query param handling
- [ ] **Cart** — no seller groups; shows share discount badges on lines
- [ ] **Checkout** — location cascades; payment method from market config; single order result
- [ ] **Orders** — list filters; cancel button only when eligible
- [ ] **Auth** — OTP flow; 415 on unverified login
- [ ] **Profile** — no seller-specific fields
- [ ] **Wallet** — balance + transaction list
- [ ] **Favorites** — toggle without seller context
- [ ] **Notifications** — poll on interval or on focus; mark read endpoints
- [ ] **Share & Earn** — full workflow per folder 18
- [ ] **Group buy** — invite landing + checkout code
- [ ] **Arabic** — switch language header; verify AR Postman examples match UI
- [ ] **Removed** — no seller pages, no multi-order checkout, no seller_id anywhere

---

## 8. Instructions for AI agents (Cursor / Antigravity)

When implementing or reviewing the BuySawa web frontend:

1. **Read this document first**, then import the Postman collection and run folder 17 (Workflows).
2. **Never call** `/api/client/*`, `/api/seller/*`, or legacy CMS paths — they are removed.
3. **Always** include `X-Market` and `Accept-Language` in the HTTP client layer.
4. **Parse** `{ code, message, data, pagination? }` — not `{ success, data }`.
5. **Cart and checkout** are single-store: flat items, one order, one coupon code.
6. **Product Share** — follow `docs/product-share-frontend-integration.md` for deep links and exclusivity rules.
7. **Compare** your TypeScript interfaces against Postman example responses (EN folder first, then AR).
8. **Do not invent** endpoints or fields — if missing, check `routes/api_v1.php` and `app/Http/Resources/`.
9. **Payment** — redirect to `payment_url`; do not embed payment gateway SDK unless product spec requires it.
10. **Tests** — for each feature area, the backend has Feature tests in `tests/Feature/Api/`; behavior matches those tests.

### Suggested agent prompt (paste into Cursor/Antigravity)

```
You are integrating the BuySawa web frontend with the Laravel backend.

Rules:
- Base URL: {APP_URL}/api/v1
- Headers on every request: X-Market, Accept: application/json, Accept-Language
- Auth: Bearer Sanctum token from login or verify-otp
- Response shape: { code, message, data, pagination? }
- Single-store model: no seller_id, no seller_groups, single order checkout
- Read docs/web-frontend-integration-guide.md and validate against postman/BuySawa_API.postman_collection.json

Task: [describe screen or feature to implement/review]
```

---

## 9. Backend file map (for agents)

| Concern | Location |
|---------|----------|
| Routes | `routes/api_v1.php` |
| Response helper | `app/Helpers/ApiResponse.php` |
| API resources | `app/Http/Resources/` |
| Validation | `app/Http/Requests/Api/` |
| Enums | `app/Enums/` |
| Feature tests | `tests/Feature/Api/` |
| Translations | `lang/en/front.php`, `lang/ar/front.php` |

---

## 10. Support & escalation

| Issue | Action |
|-------|--------|
| Response differs from Postman | Postman is authoritative; report discrepancy with request ID |
| 422 on checkout | Check promotion exclusivity, min order, stock, location IDs for market |
| 401 after login | Token not sent or expired; re-login |
| CORS in staging | Coordinate allowed origins with backend deploy |
| New endpoint needed | Open backend ticket — do not mock undocumented APIs |

---

*This document reflects the backend state as of the single-store refactor completion (2026-06) plus Product Share, Group Buy, and Wallet features. When in doubt, trust the Postman collection over older markdown in `docs/api-v1.md`.*
