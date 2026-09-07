# 1Fi Marketplace

A full-stack web application built for the **1Fi SDE1 Assignment** — a marketplace where users browse products (phones, laptops), select a variant, view EMI plans backed by mutual funds, and proceed with a selected plan. Built to match 1Fi's existing app design language (purple gradient theme, rounded cards, mobile-first layout).

**Live demo:** https://1fi-marketplace-bice.vercel.app/
**Backend API:** https://onefi-marketplace-backend-t9sb.onrender.com

> Note: the backend runs on Render's free tier, which spins down after inactivity. The first request after idle time may take 30–50 seconds to respond — this is expected, not a bug.

---

## Features

- Product listing (`1Fi Marketplace`) with 3 products, each with 2 variants
- Product detail page with variant selection (updates price, MRP, and image)
- EMI plan selection per variant — tenure, interest rate, monthly amount, and cashback
- "Proceed" flow with a plan confirmation screen
- Fully responsive — mobile bottom nav / desktop top nav, tested down to 320px width
- Loading, error (with retry), not-found, and 404 states throughout
- All product/EMI data served from PostgreSQL via a REST API — nothing hardcoded in the frontend

---

## Tech Stack

**Frontend:** React (Vite) + Tailwind CSS + React Router
**Backend:** Node.js + Express
**Database:** PostgreSQL + Prisma ORM
**Deployment:** Vercel (frontend), Render (backend + PostgreSQL)

---

## Architecture

```
1fi-marketplace/
  frontend/     React + Vite + Tailwind CSS app
  backend/      Express API + Prisma
```

Frontend and backend are independently deployable services communicating over a REST API. The frontend never talks to the database directly — everything goes through the backend.

---

## Database Schema

```
Product
 - id            (uuid, PK)
 - slug          (unique, e.g. "iphone-17-pro")
 - name
 - brand
 - description
 - createdAt / updatedAt

Variant
 - id            (uuid, PK)
 - productId     (FK -> Product)
 - label         (e.g. "256GB · Natural Titanium")
 - mrp
 - price
 - imageUrl
 - createdAt / updatedAt

EMIPlan
 - id             (uuid, PK)
 - variantId      (FK -> Variant)
 - tenureMonths
 - monthlyAmount
 - interestRate
 - cashback        (nullable)
 - totalPayable
 - processingFee   (nullable)
 - createdAt
```

**Relationships:** `Product 1—* Variant`, `Variant 1—* EMIPlan`.

EMI plans are scoped to the **variant**, not the product, since price (and therefore EMI math) differs by variant — e.g. 256GB and 512GB configurations of the same phone have different prices and different EMI amounts.

Schema is defined in `backend/prisma/schema.prisma` and synced to the database with `prisma db push` (see note under [Development Notes](#development-notes)).

---

## API Endpoints

### `GET /api/products`
Returns a lightweight list of all products for the marketplace grid.

**Example response:**
```json
[
  {
    "id": "b4617a65-...",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "minPrice": 125900,
    "thumbnailImage": "https://..."
  }
]
```

### `GET /api/products/:slug`
Returns the full product with nested variants and EMI plans.

**Example response:**
```json
{
  "id": "b4617a65-...",
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "brand": "Apple",
  "description": "...",
  "variants": [
    {
      "id": "...",
      "label": "256GB · Natural Titanium",
      "mrp": 134900,
      "price": 125900,
      "imageUrl": "https://...",
      "emiPlans": [
        {
          "id": "...",
          "tenureMonths": 3,
          "monthlyAmount": 41967,
          "interestRate": 0,
          "cashback": 7500,
          "totalPayable": 125900
        }
      ]
    }
  ]
}
```

**Status codes:** `200` success · `404` unknown slug · `500` server error (all with JSON error bodies, no stack traces).

---

## Setup & Run Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (local instance or a hosted one)

### 1. Clone and install
```bash
git clone https://github.com/raj-singh1802/1fi-marketplace.git
cd 1fi-marketplace
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `backend/.env` (see `.env.example`):
```
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace_db?schema=public"
FRONTEND_URL="http://localhost:5173"
```

Sync the schema and seed the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

Run the backend:
```bash
npm run dev
```
Backend runs at `http://localhost:4000`.

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env` (see `.env.example`):
```
VITE_API_BASE_URL=http://localhost:4000
```

Run the frontend:
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

## Environment Variables

| Location | Variable | Description |
|---|---|---|
| `backend/.env` | `PORT` | Port the Express server listens on (defaults to 4000) |
| `backend/.env` | `DATABASE_URL` | PostgreSQL connection string |
| `backend/.env` | `FRONTEND_URL` | Allowed CORS origin for the deployed frontend |
| `frontend/.env` | `VITE_API_BASE_URL` | Base URL the frontend uses for API calls |

---

## Deployment

- **Frontend:** Vercel — root directory `frontend`, framework preset Vite, env var `VITE_API_BASE_URL` pointing at the Render backend. A `vercel.json` rewrite rule serves `index.html` for all paths so client-side routing survives page refreshes on deep links (e.g. `/products/iphone-17-pro`).
- **Backend:** Render Web Service — root directory `backend`, build command `npm install && npx prisma generate`, start command `npx prisma generate && npx prisma db push && npm start`.
- **Database:** Render PostgreSQL (free tier).

---

## Development Notes

- The schema is synced with `prisma db push` rather than tracked migrations (`prisma migrate dev`/`deploy`). This was a deliberate trade-off for a project of this size and short iteration cycle — `db push` kept schema changes fast during development. For a longer-lived or team project, tracked migrations (with rollback history) would be the better choice.
- `minPrice` on the product list is computed at read-time from variant prices rather than stored, to avoid it going stale if a variant's price changes.
- Top Brands and Nearby Stores are intentionally left as blank placeholder routes per the assignment's scope (only the 1Fi Marketplace section needed full implementation).

---

## Future Improvements

- Real payment/checkout integration (out of scope for this assignment)
- Product search and filtering
- Pagination for a larger product catalog
- Automated end-to-end tests
- Image optimization / CDN-hosted product images

---

## Images

![alt text](image.png) 
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)