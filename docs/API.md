# API Reference — Copy Trading Admin Panel 🚀

> This document describes the backend endpoints referenced by the frontend, how they are used in the app (pages / buttons), request payloads, and example responses. It also includes recommended backend endpoints for actions currently simulated on the frontend (invite/send email).

---

## Table of Contents

- [Authentication](#authentication)
- [Users](#users)
  - [GET /users](#get-users)
  - [GET /users/:id](#get-usersid)
  - [POST /users](#post-users)
  - [PUT /users/:id](#put-usersid)
  - [DELETE /users/:id](#delete-usersid)
- [KYC Management (Admin)](#kyc-management-admin)
  - [GET /admin/kyc/submissions](#get-adminkycsubmissions)
  - [POST /admin/kyc/submissions/:userId/review](#post-adminkycsubmissionsuseridreview)
- [Team / Invitations](#team--invitations)
  - [GET /team](#get-team)
  - [POST /team/invite](#post-teaminvite)
- [API Client & Behavior](#api-client--behavior)
- [Frontend mappings (pages & buttons) — quick reference](#frontend-mappings-pages--buttons)
- [Notes & Implementation Guidance](#notes--implementation-guidance)

---

## Authentication 🔐

- POST `/auth/login`
  - Description: Login with credentials
  - Body: `{ email, password }`
  - Used by: `src/services/auth.service.js` -> `login(credentials)`

- POST `/auth/logout`
  - Description: Logout (clears client storage)
  - Used by: `auth.service.js` -> `logout()`

- POST `/auth/refresh`
  - Description: Refresh JWT/ session token
  - Used by: `auth.service.js` -> `refreshToken()`

- GET `/auth/me`
  - Description: Get current user profile
  - Used by: `auth.service.js` -> `getCurrentUser()`

---

## Users 👥

The app uses two sets of endpoints for users:

- `ENDPOINTS.USERS.*` (frontend): `/users` and `/users/:id`
- `ENDPOINTS.ADMIN.*` (admin KYC routes): `/admin/...`

### GET /users

- Description: List users (supports query filters)
- Query params: `role`, `all`, `page`, `limit`, plus other filters
- Frontend function: `getUsers(params)` in `src/services/user.service.js`
- Example: `GET /users?role=TRADER&page=1&limit=20`
- Response: An object or API-format with user list (frontend expects `response.data` or `response` depending on backend)

### GET /users/:id

- Description: Get user details
- Frontend function: `getUserById(id)` in `src/services/user.service.js`
- Example: `GET /users/5f8f8f8f8f8f8f8f8f` 
- Notes: Frontend maps fields like `username`, `email`, `kycStatus`, `isFrozen`, etc.

### POST /users

- Description: Create a new user (not heavily used by current UI)
- Body: user payload (name, email, role, etc.)
- Frontend: `ENDPOINTS.USERS.CREATE` placeholder exists — implement server-side as required

### PUT /users/:id

- Description: Update user information or status
- Frontend function: `updateUserStatus(id, status)` in `src/services/user.service.js`
- Behavior for status mapping (frontend logic):
  - `Delete` -> `{ isFrozen: true }` (soft-freeze)
  - `Deactivate` -> `{ kycStatus: 'PENDING', isFrozen: false }`
  - `Active` -> `{ kycStatus: 'APPROVED', isFrozen: false }`
- Example: `PUT /users/:id` with body `{ kycStatus: 'APPROVED', isFrozen: false }`
- Notes: Buttons in `TraderProfile.jsx`, `InvestorProfile.jsx`, and `Users.jsx` call `updateUserStatus` to change activation/kyc/freeze states.

### DELETE /users/:id

- Description: (Optional) full delete if implemented on backend. Currently frontend uses `Delete` status to freeze account via PUT.

---

## KYC Management (Admin) 📝

### GET /admin/kyc/submissions

- Description: List KYC submissions with paging and filter
- Query params: `status`, `page`, `limit`, plus other filters
- Frontend function: `getKycSubmissions(params)` in `src/services/user.service.js`
- Example: `GET /admin/kyc/submissions?status=PENDING&page=1&limit=10`

### POST /admin/kyc/submissions/:userId/review

- Description: Submit a KYC review for a user
- Payload:
  - `{ status: 'APPROVED'|'REJECTED'|'PENDING', adminNotes?: string }`
- Frontend function: `submitKycReview(userId, reviewData)` in `src/services/user.service.js`
- Example: `POST /admin/kyc/submissions/5f.../review` with `{ status: 'APPROVED', adminNotes: 'Verified docs' }`

---

## Team / Invitations ✉️

### GET /team

- Description: Get list of team members (frontend uses `GET /team` via `getTeamMembers`)
- Frontend function: `getTeamMembers(params)` in `src/services/team.service.js`
- Example: `GET /team?page=1&limit=20`

### POST /team/invite (recommended backend endpoint)

- Purpose: Send invitation email to a new team member using server-side email provider (Resend or similar).
- Example backend route in project: `backend-team-invite.js` and `src/api/team-invite-endpoint.js` include a complete Express.js example.

- Request body (JSON):
  - `{ email: string (required), role: string (INVESTOR|TRADER|ADMIN), firstName?: string, lastName?: string }`

- Success response (200):
  - `{ success: true, message: 'Invitation sent successfully', data: { id, email, sent: true } }

- Client-side implementation: `inviteTeamMember(inviteData)` in `src/services/team.service.js` currently *simulates* sending and returns a mock success response.
  - `Header.jsx` -> `handleInviteSubmit` calls `inviteTeamMember` with `{ email, role, firstName, lastName }`.

- Recommendation: Implement a server-side endpoint `POST /api/team/invite` that uses a secure email API key (e.g., Resend) to send the invitation email. The sample code is in `backend-team-invite.js` and `src/api/team-invite-endpoint.js`.

---

## API Client & Behavior ⚙️

- Base URL (frontend axios): `https://backend.greentrutle.com/admin` (set in `src/api/axios.js`)
- axios instance logs requests/responses and injects `Authorization: Bearer <token>` if `localStorage.token` exists
- Response handling: `apiClient` returns `response.data` (or `response` if no data). It maps 401/403/500 to friendly errors.

---

## Frontend mappings — pages & actions 🔁

- Users list and filters:
  - `src/pages/Users.jsx` uses `getUsers()` and `updateUserStatus()` to list, filter, activate/deactivate/freeze users.
  - Buttons: Send Email (simulated), Deactivate, Freeze

- Traders list and profile:
  - `src/pages/Traders.jsx` -> `getUsers({ role: 'TRADER' })` to fetch traders
  - `src/pages/TraderProfile.jsx` -> `getUserById`, `updateUserStatus`, `handleSendEmail` (simulated), `submitKycReview` (not always used directly; sometimes uses `updateUserStatus` to set KYC flags)

- Investors list and profile:
  - `src/pages/Investors.jsx` -> `getUsers({ role: 'INVESTOR' })`
  - `src/pages/InvestorProfile.jsx` -> `getUserById`, `updateUserStatus`, `handleSendEmail` (simulated), `handleFreeze`

- KYC management:
  - `src/services/user.service.js` -> `getKycSubmissions()` and `submitKycReview(userId, reviewData)`
  - `src/pages/Traders.jsx` shows the KYC approval dialog which calls `submitKycReview` when approving KYC

- Team invite:
  - `src/components/Header.jsx` -> `handleInviteSubmit()` uses `inviteTeamMember(inviteData)` (currently simulated) to send invitations

## Trader & Investor Profile Actions (Profile Buttons) 🎯

This section documents the backend endpoints related to the action buttons on Trader and Investor profile pages: **Activate / Deactivate / Freeze / Delete / Edit / Send Email**.

- PUT `/admin/users/:id` (primary)
  - Purpose: Update user information or status (activate, deactivate, freeze, edit profile fields).
  - Body examples:
    - Activate: `{ "kycStatus": "APPROVED", "isFrozen": false }`
    - Deactivate: `{ "kycStatus": "PENDING", "isFrozen": false }`
    - Freeze (soft-delete): `{ "isFrozen": true, "kycStatus": "PENDING" }`
    - Edit profile: `{ "name": "New Name", "email": "a@b.com", "phone": "12345", "role": "TRADER", ... }`
  - Frontend usage:
    - Status changes: `updateUserStatus(id, status)` in `src/services/user.service.js` (called by `TraderProfile.jsx`, `InvestorProfile.jsx`, `Users.jsx`).
    - Profile edit: `handleEditSubmit()` in `TraderProfile.jsx` and `InvestorProfile.jsx` should send a `PUT /admin/users/:id` with updated fields.
  - Response: updated user object (HTTP 200)

- DELETE `/admin/users/:id` (optional / permanent)
  - Purpose: Permanently delete a user (if you choose to support it). Current UI uses a soft-delete/freeze via PUT with `Delete` status.
  - Frontend mapping: `confirmDelete()` in `TraderProfile.jsx` currently calls `updateUserStatus(user.id, 'Delete')` which the backend should map to `isFrozen: true` (soft delete) unless you implement a true DELETE endpoint.

- POST `/api/users/:id/send-email` (recommended)
  - Purpose: Send ad-hoc email to a user (admin action triggered by 'Send Email' button)
  - Body: `{ "subject": "string", "body": "string", "templateId"?: "string", "data"?: {} }`
  - Frontend usage: replace simulated `handleSendEmail()` in `TraderProfile.jsx` and `InvestorProfile.jsx` with a call to this endpoint.
  - Response: `{ success: true, message: 'Email sent', data: { messageId, to } }`

Frontend button mapping (location -> button):
- `src/pages/TraderProfile.jsx`:
  - Send Email -> `handleSendEmail()` -> should call `POST /api/users/:id/send-email`
  - Deactivate/Activate -> `handleDeactivate()` -> `PUT /admin/users/:id` with mapped status
  - Freeze/Unfreeze -> `handleFreeze()` -> `PUT /admin/users/:id` with `isFrozen` toggle
  - Delete (soft) -> `confirmDelete()` -> `PUT /admin/users/:id` with `isFrozen: true` or `Delete` status
  - Edit -> `handleEditSubmit()` -> `PUT /admin/users/:id` with updated profile fields

- `src/pages/InvestorProfile.jsx`: same mappings as above (send email, deactivate, freeze, delete, edit)

Security & notes:
- Ensure admin-only operations are protected (role-based checks server-side).
- Validate fields (email format, required name) on server.
- For `send-email`, use a server-side email provider (Resend/SendGrid) and do not expose API keys to frontend.

## Example requests & cURL snippets 💡

- Get traders (page 1, limit 20):

```bash
curl -X GET "https://backend.greentrutle.com/admin/users?role=TRADER&page=1&limit=20" \
  -H "Authorization: Bearer <token>"
```

- Approve KYC (admin):

```bash
curl -X POST "https://backend.greentrutle.com/admin/kyc/submissions/:userId/review" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{"status":"APPROVED","adminNotes":"Verified documents"}'
```

- Update user status (activate):

```bash
curl -X PUT "https://backend.greentrutle.com/admin/users/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"kycStatus":"APPROVED","isFrozen":false}'
```

- Invite team member (recommended server endpoint):

```bash
curl -X POST "https://backend.greentrutle.com/api/team/invite" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","role":"TRADER","firstName":"Jane","lastName":"Doe"}'
```

---

## Notes & Implementation Guidance 🔧

- Email sending from frontend is simulated in several places. For production, implement server-side endpoints that hold API keys (Resend, Sendgrid, etc.) and call them from the frontend.
- The project includes sample server code for `/team/invite` in `backend-team-invite.js` and `src/api/team-invite-endpoint.js`. Copy that code into your backend and secure the `RESEND_API_KEY` as an env var.
- Status semantics (frontend expectations):
  - `kycStatus` values: `APPROVED`, `PENDING`, `REJECTED`
  - `isFrozen`: boolean (used to represent soft-delete/freeze)
  - `status` in UI is derived from `kycStatus` and `isFrozen` (see `TraderProfile.jsx` transformations)

---

## Quick checklist to finish backend integrations ✅

- [ ] Implement `POST /api/team/invite` on backend (use provided sample code)
- [ ] Add a dedicated endpoint for sending ad-hoc user emails if needed (e.g., `POST /users/:id/send-email`)
- [ ] Confirm `PUT /users/:id` semantics on backend for `isFrozen` and `kycStatus`
- [ ] Ensure admin routes are secured (`/admin/*`) with proper role checks

---

If you want, I can:
- Add example request/response payloads for each endpoint with real field names from the API responses, or
- Generate Postman collection or OpenAPI (Swagger) draft from these mappings.

---

_Last updated: 2025-12-26_
