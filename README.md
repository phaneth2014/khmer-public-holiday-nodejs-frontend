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
  publish = "public"
  functions = "netlify/functions"
```

### test locally
```bash
npm install -g netlify-cli@latest
npm install -g netlify-cli@22.2.0

netlify dev
netlify dev --port 8888

netlify dev --debug

```

### Deploy to Netlify
```bash
netlify login
netlify init
netlify deploy --prod
```