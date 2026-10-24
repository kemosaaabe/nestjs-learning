# API playground

A small TypeScript frontend for the existing NestJS users, tasks, and notifications API.

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

Enter your API key in the global `X-API-Key` field and change the `x-role` field if needed, then click **Refresh data**. The role defaults to `user`. Their current values are sent in the corresponding headers with every API request, including an empty `x-role` header when no role is entered. Reloading the page clears the API key and resets the role to `user`.

The development server proxies `/api` to `http://127.0.0.1:3000`, so no backend CORS changes are needed. For another backend address, run `API_URL=http://127.0.0.1:4000 npm run dev`.

- Create and list users; inspect a user by ID.
- Create, inspect, edit, assign, and delete tasks.
- Change task status and view a user's tasks.
- Send a message from the Notifications tab using `POST /notifications` with `{ "message": "..." }`.
- See the request method, endpoint, HTTP status, and JSON response.

Responses from `/tasks` and `/tasks/:id` are unwrapped from `{ data: ... }` for the interface. The API response panel displays the full response. Users endpoints, including `/users/:id/tasks`, return their data directly.

Forms intentionally skip frontend validation and preserve entered text so you can test backend validation with empty, negative, or malformed values. An empty lookup ID requests `/tasks/` or `/users/`, which are collection routes rather than routes with an ID parameter.

Data is stored in memory by the backend and resets when it restarts. User editing and deletion are unavailable because the API does not expose those endpoints.

Run `npm run build` to type-check and build the frontend. The generated `dist` directory needs an `/api` reverse proxy if hosted outside the development server.
