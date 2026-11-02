# Landscaping — Next.js + Sanity CMS Starter Kit

A full-service landscaping / garden care company website built with Next.js and a Sanity Studio for managing every page. Includes a home page, services, a before/after project gallery with a drag-to-compare slider, client reviews, an about page with team and credentials, and a contact page whose messages are saved into the Studio. Everything is editable without touching code.

"Evergreen Grounds Landscaping", its team, projects, reviews, address and prices are fictional placeholders. Replace them with your own.

## What's included

- The Next.js App Router website (project root)
- `studio/` — the Sanity Studio (the CMS admin where you edit content)
- `scripts/seed.ts` — loads the demo content (with generated placeholder graphics) into your Sanity dataset
- `LICENSE.md`, `.env.example` and `studio/.env.example`

## Tech stack

- Next.js 16 (App Router) + React 19
- Sanity (site settings, home page, about page, services, gallery projects, team, testimonials, contact submissions)
- Tailwind CSS v4
- Fonts: Fraunces and Inter through `next/font`

## Prerequisites

- Node.js 20.9 or later
- A free [Sanity](https://www.sanity.io/) account. The free plan is enough for this site.

## 1. Install dependencies

```bash
npm install
cd studio && npm install && cd ..
```

## 2. Create your Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project. Note the **Project ID**. Use the dataset name `production`.
2. In the project, open **API → Tokens** and create two tokens:
   - **Viewer**: used for live content updates and draft preview.
   - **Editor**: used on the server to save contact form messages, and locally to run the seed script. Never expose it to the browser.
3. In **API → CORS origins**, add `http://localhost:3000` (and your production domain later) with credentials allowed. Also add `http://localhost:3333` for the local Studio.

## 3. Configure environment variables

Copy `.env.example` to `.env.local` in the project root and fill it in:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-viewer-token
SANITY_API_WRITE_TOKEN=your-editor-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then copy `studio/.env.example` to `studio/.env` and set the same project ID and dataset:

```
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

## 4. Load the demo content

```bash
npm run seed
```

This creates the site settings, home and about pages, 4 services, 3 before/after gallery projects, 2 team members and 4 reviews, with generated placeholder graphics instead of photos. It is safe to run again: it replaces the demo documents instead of duplicating them.

You can skip this step and enter everything by hand in the Studio.

## 5. Run the Studio

```bash
cd studio
npm run dev
```

The Studio opens at `http://localhost:3333`. From there you can edit the business name, phone, hours and address, the home page hero, the about page, services, gallery projects (with before/after photo pairs), team members and reviews, and read the messages sent through the contact form (Contact Submissions).

**Replace the placeholder graphics with your own photos** by uploading them on each document in the Studio. The kit does not include any photographs.

To give yourself or a client a permanent CMS address, deploy the Studio:

```bash
cd studio
npm run deploy
```

## 6. Run the website

```bash
npm run dev
```

Open `http://localhost:3000`.

## 7. Deploy

Deploy to [Vercel](https://vercel.com) (zero config for Next.js) or any host that runs Next.js. Add the environment variables from step 3 to your hosting project (set `NEXT_PUBLIC_SITE_URL` to your production domain) and add that domain to the Sanity CORS origins.

Environment variables only take effect after a new deployment.

## Contact form

Messages are saved as **Contact Submission** documents in your Sanity dataset. The form has a hidden spam trap field, length limits and a simple per-instance rate limit (see `src/app/contact/actions.ts`).

- The kit does not send email notifications. Add them yourself, for example with a Sanity webhook or by sending an email from the server action.
- Messages contain personal data. You are responsible for a privacy policy and for complying with the privacy laws where you operate.

## Customizing

- Colors and fonts: `src/app/globals.css` (Tailwind theme tokens) and `src/app/layout.tsx`
- Content shape: `studio/schemaTypes/`
- Page queries: `src/sanity/lib/queries.ts`

## Support

Built by Cessyrona Software Studio. Keep your license key from your receipt and reach out at [cessyrona.com/contact](https://cessyrona.com/contact).
