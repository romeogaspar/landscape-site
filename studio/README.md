# Landscaping Studio

The Sanity Studio (CMS admin) for the landscaping website. See the README in the project root for the full setup guide.

1. `npm install`
2. Copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID` (and `SANITY_STUDIO_DATASET` if it is not `production`).
3. `npm run dev` opens the Studio at http://localhost:3333.
4. `npm run deploy` publishes it to your own `<name>.sanity.studio` address.
