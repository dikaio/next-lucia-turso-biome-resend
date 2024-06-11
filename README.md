# Next.js + Lucia + Turso + Drizzle + Biome + Tailwind CSS + Typescript Starter

**IMPORTANT** This starter is incomplete and not ready for production use. It is a work in progress, please use at your own risk.

## TODO

- [x] Configure biome
- [x] Configure shadcn + geist
- [x] Configure tailwind
- [x] Configure turso
- [x] Configure resend
- [x] Configure drizzle
- [ ] Configure lucia
- [ ] Modify lucia to use uuid4() for id field
- [ ] Configure password authentication
- [ ] Configure passwordless authentication
- [ ] Configure [Artic](https://arctic.js.org/) and [Oslo](https://oslo.js.org/)
- [ ] Integrate AI
- [ ] Add Zod

## Considering

- [ ] Database migration Atlas?

### How to Use This Repository

This document assumes you have created an account at [Vercel](https://vercel.com), [Turso](https://turso.tech), and [Resend](https://resend.com). Follow these steps to get a working version of this starter.

1. `gh repo clone dikaio/next-lucia-turso-biome-resend`
2. `cd next-lucia-turso-biome-resend`
3. `cp .env.example .env.local` and add environment variables.
4. `pnpm install`
5. `pnpm run db:generate`
6. `pnpm run db:migrate`
7. `pnpm run dev`
8. Open your browser and navigate to `http://localhost:3000`
