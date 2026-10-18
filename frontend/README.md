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

The development server proxies `/api` to `http://127.0.0.1:3000`, so no backend CORS changes are needed. For another backend address, run `API_URL=http://127.0.0.1:4000 npm run dev`.

- Create and list users; inspect a user by ID.
- Create, inspect, edit, assign, and delete tasks.
- Change task status and view a user's tasks.
- See the request method, endpoint, HTTP status, and JSON response.

Data is stored in memory by the backend and resets when it restarts. User editing and deletion are unavailable because the API does not expose those endpoints.

Run `npm run build` to type-check and build the frontend. The generated `dist` directory needs an `/api` reverse proxy if hosted outside the development server.
