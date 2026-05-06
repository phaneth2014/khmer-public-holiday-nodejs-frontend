import { Context } from "@netlify/edge-functions";

export default async (request, context) => {
  const response = await context.next();
  
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.startsWith("text/html")) {
    return response;
  }

  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
  let html = await response.text();

  // Inject nonce into script tags
  html = html.replace(/<script/gi, `<script nonce="${nonce}"`);

  // Build your CSP string using your previous requirements
  const cspDirectives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net`,
    `img-src 'self' data:`,
    `connect-src 'self' https://khmer-calendar.netlify.app`
  ];

  const cspHeader = cspDirectives.join("; ");

  return new Response(html, {
    headers: {
      ...Object.fromEntries(response.headers),
      "Content-Security-Policy": cspHeader,
      "Content-Type": "text/html",
    },
  });
};

export const config = {
  path: "/*",
  excludedPath: ["/*.js", "/*.css", "/*.png", "/*.jpg", "/static/*"],
};