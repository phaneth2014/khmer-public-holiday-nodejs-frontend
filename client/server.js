import express from 'express';
import crypto  from 'crypto';

const app = express;

app.use((req, res, next) => {
  // 1. Generate a random 16-byte base64 string
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;

  // 2. Set the CSP header using that nonce
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' 'nonce-${nonce}';`
  );
  next();
});

// 3. Inject the nonce into your HTML template
app.get('*', (req, res) => {
  res.send(`
    <html>
      <head>
        <script nonce="${res.locals.nonce}">
          console.log("This script is allowed because it has the correct nonce!");
        </script>
      </head>
      <body>...</body>
    </html>
  `);
});