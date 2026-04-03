# Headbanger Vapes Pro

A production-grade starter for a **lawful reusable vape / accessories** store built with **Next.js + Supabase**.

## What this version fixes

This rebuild replaces the old demo-style JSON/localStorage setup with:

- Supabase database
- Supabase auth for admin access
- real product CRUD
- real category CRUD
- persistent cloud data
- optional image upload to Supabase Storage
- editable store settings
- domain-ready deployment on Vercel

## Important legal note

This starter is for a **lawful UK reusable vape/accessories store**.
It is **not** set up for THC/cannabis carts or for single-use/disposable vapes.

## Stack

- Next.js App Router
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Vercel-ready frontend

## Quick start

1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql`.
3. Create a public bucket named `product-images` in Supabase Storage.
4. Set the env vars from `.env.example`.
5. Install and run:

```bash
npm install
npm run dev
```

6. Open `/admin/login`
7. Create your first admin user in Supabase Auth, then sign in.

## Vercel deployment

1. Push this project to GitHub.
2. Import it into Vercel.
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.
5. Connect your domain in Vercel.

## Notes

- Admin access depends on users being listed in the `admin_users` table.
- Product image uploads go to the `product-images` bucket.
- This starter intentionally keeps checkout simple and non-payment-gateway-based.
  You can expand it with compliant payment options later.

## Suggested next upgrades

- real order creation flow
- customer accounts
- inventory tracking
- analytics
- invoice emails
- image optimization pipeline
