# API playground

A small TypeScript frontend for the existing NestJS users and tasks API.

Start the backend in one terminal:

```sh
cd backend
npm install
npm run start:dev
```

Start the frontend in another terminal:

```sh
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173.

Enter your API key and role in the global `X-API-Key` and `x-role` fields, then click **Refresh data**. Their current values are sent in the corresponding headers with every users and tasks API request, including an empty `x-role` header when no role is entered. Both fields are cleared when you reload the page.

The development server proxies `/api` to `http://127.0.0.1:3000`, so no backend CORS changes are needed. For another backend address, run `API_URL=http://127.0.0.1:4000 npm run dev`.

- Create and list users; inspect a user by ID.
- Create, inspect, edit, assign, and delete tasks.
- Change task status and view a user's tasks.
- See the request method, endpoint, HTTP status, and JSON response.

Forms intentionally skip frontend validation and preserve entered text so you can test backend validation with empty, negative, or malformed values. An empty lookup ID requests `/tasks/` or `/users/`, which are collection routes rather than routes with an ID parameter.

Data is stored in memory by the backend and resets when it restarts. User editing and deletion are unavailable because the API does not expose those endpoints.

Run `npm run build` to type-check and build the frontend. The generated `dist` directory needs an `/api` reverse proxy if hosted outside the development server.
