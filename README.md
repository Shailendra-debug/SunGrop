# Sungroups proposal app

The Express API and the existing frontend run together from this folder. The server connects to MongoDB before it starts listening and serves the pages from the sibling `frontend` folder.

## Run locally

1. Use Node.js 18 or newer.
2. Set `MONGO_URI` in `.env` to the MongoDB connection string for the `sungroups` database. `.env.example` shows the expected format.
3. From this folder, run:

   ```sh
   npm install
   npm start
   ```

4. Open [http://localhost:5000](http://localhost:5000). The API health endpoint is [http://localhost:5000/api/health](http://localhost:5000/api/health).

For automatic server restarts during development, use `npm run dev`.

## API

- `GET /api/proposals` — list proposals; optional `?email=` performs a case-insensitive partial email search.
- `GET /api/proposals?id=<id>` — fetch one proposal for the quotation page.
- `POST /api/proposals` — create a proposal.
- `POST /api/proposals/selected` — submit existing proposals with `{ "ids": ["<proposal-id>"] }`.
- `GET /api/rates` — list pricing tiers.
- `POST /api/rates` — create a pricing tier.
- `PUT /api/rates/:id` — update a pricing tier.
- `DELETE /api/rates/:id` — delete a pricing tier.
- `POST /api/enquiries` — save an enquiry form submission.
- `GET /api/enquiries` — list saved enquiries; optional `?email=` filters by email.
- `GET /api/enquiries/:id` — fetch one saved enquiry.

The browser pages use `http://localhost:5000/api` as their API base URL.
