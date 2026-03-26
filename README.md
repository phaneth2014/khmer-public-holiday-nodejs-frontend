# khmer-public-holiday-nodejs-frontend

### project-root structure
```bash
project-root/
│
├── src/
│   ├── config/
│   │   └── db.js              # Database connection (pg Pool/Client)
│   │
│   ├── migrations/            # Migration files (SQL or JS with node-pg-migrate/Knex)
│   │   ├── 001-create-users.sql
│   │   └── 002-create-posts.sql
│   │
│   ├── models/                # Database models (plain classes or query wrappers)
│   │   ├── user.js
│   │   └── post.js
│   │
│   ├── routes/                # Express route handlers
│   │   ├── users.js
│   │   └── posts.js
│   │
│   ├── controllers/           # Business logic (separate from routes)
│   │   ├── userController.js
│   │   └── postController.js
│   │
│   ├── services/              # Reusable service functions (auth, email, etc.)
│   │   └── authService.js
│   │
│   ├── utils/                 # Helper functions (validation, error handling)
│   │   └── logger.js
│   │
│   ├── app.js                 # Express app setup
│   └── server.js              # Entry point (starts server)
│
├── .env                       # Environment variables (DB_URL, secrets)
├── package.json
└── README.md

```
### install dependencies

```bash
npm init -y
npm install express serverless-http cors axios dotenv pg

npm install node-pg-migrate pg

```
## install neon driver portgreSQL
```bash
npm install @neondatabase/serverless
```

## update scripts package.jon
```bash
"scripts": {
  "migrate": "node-pg-migrate"
}

npx node-pg-migrate create create-users-table

```
### list express routes
```bash
npm install express-list-endpoints

import listEndpoints from "express-list-endpoints";

console.log(listEndpoints(app));

```
### netlify.toml
```bash
[build]
  command = "npm install && npm --prefix client install && npm --prefix client run build"
  publish = "client/dist"
  functions = "netlify/functions"

# backend
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

# fallback for SPA (React/Vue)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  
[dev]
  command = "npm run dev"
  port = 4000
```

### test locally
```bash
npm install -D concurrently

```

### Deploy to Netlify
```bash
netlify login
netlify init
netlify deploy --prod
```