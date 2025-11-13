# Book of Truth — Next.js bundle

This is a ready-to-upload Next.js project containing:
- `content/messages/*.md` — Markdown files generated from the original TXT.
- `data/messages.json` — manifest listing messages.
- API endpoints under `pages/api/` to list, fetch, search, and get stats.
- A minimal frontend (`pages/index.js`, `pages/messages/[slug].js`) that calls the API.
- `public/book-of-truth-md.zip` — the original Markdown+JSON zip for direct download.

## How to deploy (mobile-friendly)
1. On GitHub:
   - Create a new repository.
   - Upload the files and folders in this project (use GitHub web or mobile app).
   - Commit to `main`.

2. On Vercel:
   - Go to https://vercel.com and import the GitHub repository.
   - Vercel will detect Next.js and deploy automatically.
   - After deploy, open your site (e.g. `https://your-repo.vercel.app`).

## API endpoints

All endpoints are relative to your site root. If deployed to `https://example.vercel.app` then use `https://example.vercel.app/api/...`.

### GET /api/messages
List messages (paginated).

Query parameters:
- `q` — optional text to search in title/excerpt
- `page` — page number (default 1)
- `limit` — page size (default 20, max 200)
- `sort` — `date` (default) or `title`

Example:
```
curl "https://<your-site>/api/messages?page=1&limit=20"
```

### GET /api/messages/[slug]
Fetch full message by slug (or id).

Example:
```
curl "https://<your-site>/api/messages/amen"
```

Response JSON:
{
  "id":"1",
  "title":"...",
  "date":"YYYY-MM-DD",
  "slug":"amen",
  "excerpt":"...",
  "body":"Full markdown body as a string"
}

### GET /api/search?q=term
Server-side full-text search across bodies.

Example:
```
curl "https://<your-site>/api/search?q=mercy&limit=10"
```

### GET /api/stats
Get simple stats:
```
curl "https://<your-site>/api/stats"
```

## Notes about completeness
- After deployment you can confirm completeness:
  - `GET /api/stats` — check `total` equals the number you expect.
  - `GET /api/messages?limit=500` — list all entries.

If anything looks missing or fields need tuning, reply here and I will adjust the conversion heuristics and update the bundle.
