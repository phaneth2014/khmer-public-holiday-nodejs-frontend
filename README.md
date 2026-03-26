# khmer-public-holiday-nodejs-frontend

### install dependencies

```bash
npm init -y
npm install express serverless-http cors axios dotenv pg
```
## install neon driver portgreSQL
```bash
npm install @neondatabase/serverless
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