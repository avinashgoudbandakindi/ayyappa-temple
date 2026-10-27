# 🏛️ Sree Ayyappa Swamy Temple Portal — Backend Architecture Roadmap
> **Scope:** Architecture specification for the future REST API, Admin Dashboard, and Payments layer. No backend code is included in this phase.

---

## 1. REST API Endpoints (`ApiRepository` Contract)

### 1.1 Public Endpoints
- `GET /v1/temple` — Returns institutional profile, address, landmark, contacts, social handles, 80G status.
- `GET /v1/deities` — Returns list of consecrated deities with descriptions and primary images.
- `GET /v1/deities/:slug` — Single deity detail.
- `GET /v1/sevas` — Active sevas catalog with filter queries (`?deityId=...&bookingEnabled=true`).
- `GET /v1/sevas/:slug` — Single seva details, prasadam information, and booking availability.
- `GET /v1/timings/today` — Dynamic endpoint resolving current open/closed status, active session, and next ritual in `Asia/Kolkata`.
- `GET /v1/timings/weekly` — Standard 7-day schedule with split sessions.
- `GET /v1/timings/special` — Calendar of date overrides and festival hours.
- `GET /v1/events` — Upcoming festivals and sacred days (`startDate`, `endDate`).
- `GET /v1/events/:slug` — Festival program and participation guidelines.
- `GET /v1/announcements` — Active, time-bounded announcement notices.
- `GET /v1/gallery` — Categorized gallery items (`?category=TEMPLE|DEITIES|POOJAS|FESTIVALS|ANNADANAM`).
- `GET /v1/faqs` — Devotee frequently asked questions.
- `POST /v1/sevas/book-request` — Submits a devotee seva request with gotra, nakshatram, date, and contact.

### 1.2 Administrative / Protected Endpoints (`/v1/admin/*`)
- `POST /v1/admin/auth/login` — Temple staff & Guruswamy authentication.
- `PUT /v1/admin/timings/override` — Create/update special date timing overrides (e.g., eclipse closure).
- `POST /v1/admin/announcements` — Publish time-bounded emergency or festival notice.
- `GET /v1/admin/bookings` — Filterable queue of devotee seva requests.
- `PATCH /v1/admin/bookings/:id/status` — Approve, reschedule, or complete seva request.
- `POST /v1/admin/revalidate` — Triggers cache revalidation on the frontend CDN/Edge.

---

## 2. Entities Implied by Data Contracts
1. **Temple**: Institution settings, legal address on Raj Bhavan Road, landmark coordinates, verified phone numbers.
2. **Deity**: Iconography, Sanskrit mantras, Agamic history, display sequence.
3. **Seva**: Pricing, deity mapping, booking notice days, seasonality, active flag.
4. **DaySchedule & Session**: Weekly session hours, recurring rituals.
5. **SpecialTimingOverride**: Specific ISO dates, reason, open status, custom session windows.
6. **FestivalEvent**: Annual festival calendar, dates (nullable), registration settings.
7. **Announcement**: Notice body, urgency level (INFO/IMPORTANT/ALERT), start & end timestamp, action link.
8. **GalleryItem**: Category, storage URL, localized captions, display order.
9. **BookingRequest**: Reference ID (`SAB-YYYY-XXXX`), devotee name, phone, gothram, nakshatram, seva ID, date, status.
10. **AdminUser**: Role-based access (SuperAdmin, Priest/Archaka, OfficeStaff).

---

## 3. Administrative Modules
- **Sanctum & Timings Manager**: Easily toggle special festival hours or emergency temple closures without developer intervention.
- **Seva & Puja Desk**: Review incoming seva requests, assign priests, print devotee sankalpa lists for morning poojas.
- **Festival & Event Scheduler**: Update tentative dates ("Date to be announced") to confirmed dates once panchangam is fixed.
- **Notice Board / Banner Controller**: Post urgent announcements with auto-expiry.
- **Media Asset Manager**: Upload verified high-resolution photographs to S3/Cloudflare R2 with automatic WebP/AVIF generation.

---

## 4. Security & Compliance Considerations
- **Data Protection**: Store devotee names, phone numbers, and addresses with AES-256 encryption at rest. Never expose phone numbers in public API responses.
- **Rate Limiting**: Protect `/v1/sevas/book-request` with IP rate limiting and turnstile/captcha to prevent automated spam.
- **Audit Logging**: Immutable audit trail for all admin actions (status changes, timing overrides).

---

## 5. Future Payment Gateway Architecture
- In the future phase, integrate verified Indian payment gateways (e.g., Razorpay / Cashfree / BillDesk) supporting UPI, RuPay, NetBanking, and Cards.
- Zero raw card storage (PCI-DSS compliance via hosted checkout).
- Automated generation of 80G compliant donation receipts with temple trust PAN and digital signature.
